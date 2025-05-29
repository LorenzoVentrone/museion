import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
export const runtime = 'nodejs';

/* GET /api/orders — lista ordini utente */
export async function GET(request) {
  try {
    const user = await requireUser(request);

    const orders = await db('orders as o')
      .join('items as i', 'o.item_id', 'i.item_id')
      .where({ 'o.user_id': user.user_id })
      .select(
        'o.order_id',
        'i.item_id',
        'i.type',
        'i.category',
        'o.quantity',
        'o.order_date',
        'i.price',
        'o.date',
        'o.color',
        'o.logo'
      );

    const info = await db('users')
      .where({ user_id: user.user_id })
      .first();

    return NextResponse.json({ orders, infoUser: info });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

/* POST /api/orders — crea ordine */
export async function POST(request) {
  const user = await requireUser(request);
  const { items } = await request.json();

  if (!Array.isArray(items) || items.length === 0)
    return NextResponse.json({ error: 'Empty order' }, { status: 400 });

  const trx = await db.transaction();
  try {
    // validazioni + disponibilità (come nel controller originale)
    for (const item of items) {
      const { item_id, date, quantity, type } = item;
      const isMerch = type === 'hat' || type === 'shirt';

      if (!item_id || !quantity || quantity <= 0 || (!isMerch && !date)) {
        await trx.rollback();
        return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
      }

      const itemExists = await trx('items').where({ item_id }).first();
      if (!itemExists) {
        await trx.rollback();
        return NextResponse.json({ error: `Item ${item_id} not found` }, { status: 404 });
      }

      if (!isMerch) {
        const avail = await trx('availability')
          .where({ item_id, date })
          .first();
        if (!avail || avail.availability < quantity) {
          await trx.rollback();
          return NextResponse.json({ error: 'Insufficient availability' }, { status: 400 });
        }
      }
    }

    const [orderRow] = await trx('orders')
      .insert({
        user_id: user.user_id,
        ...items[0],
      })
      .returning(['order_id']);

    const order_id = orderRow.order_id;

    if (items.length > 1) {
      const extras = items.slice(1).map(it => ({ ...it, user_id: user.user_id, order_id }));
      await trx('orders').insert(extras);
    }

    await trx.commit();
    return NextResponse.json({ order_id }, { status: 201 });

  } catch (err) {
    await trx.rollback();
    console.error(err);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
