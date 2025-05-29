import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // knex instance
import { requireUser } from '@/lib/auth';

export const runtime = 'nodejs';

// POST /api/orders — crea un nuovo ordine
export async function POST(request) {
  const user = await requireUser(request);
  const body = await request.json();
  const { items } = body;

  if (!user) return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Empty order' }, { status: 400 });
  }

  const trx = await db.transaction();

  try {
    // Validazione e controllo disponibilità
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
        return NextResponse.json({ error: `Item ID ${item_id} not found` }, { status: 404 });
      }

      if (!isMerch) {
        const availability = await trx('availability').where({ item_id, date }).first();
        if (!availability || availability.availability < quantity) {
          await trx.rollback();
          return NextResponse.json({
            error: `Insufficient availability for item ${item_id} on date ${date}`,
          }, { status: 400 });
        }
      }
    }

    // Inserimento primo item come ordine principale
    const [orderRow] = await trx('orders')
      .insert({
        user_id: user.user_id,
        item_id: items[0].item_id,
        quantity: items[0].quantity,
        date: items[0].date,
        color: items[0].color || null,
        logo: items[0].logo || null,
        type: items[0].type || null,
      })
      .returning(['order_id', 'order_date']);

    const { order_id } = orderRow;

    // Inserimento eventuali item aggiuntivi
    const additionalItems = items.slice(1).map(item => ({
      order_id,
      user_id: user.user_id,
      item_id: item.item_id,
      quantity: item.quantity,
      date: item.date,
      color: item.color || null,
      logo: item.logo || null,
      type: item.type || null,
    }));

    if (additionalItems.length > 0) {
      await trx('orders').insert(additionalItems);
    }

    await trx.commit();
    return NextResponse.json({ order_id }, { status: 201 });
  } catch (err) {
    await trx.rollback();
    console.error('Error creating order:', err);
    return NextResponse.json({ error: 'Error creating order', details: err.message }, { status: 500 });
  }
}

// GET /api/orders — recupera tutti gli ordini dell'utente autenticato
export async function GET(request) {
  const user = await requireUser(request);

  if (!user) return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });

  try {
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

    const infoUser = await db('users')
      .select('*')
      .where({ user_id: user.user_id })
      .first();

    return NextResponse.json({ orders, infoUser }, { status: 200 });
  } catch (err) {
    console.error('Error retrieving orders:', err);
    return NextResponse.json({ error: 'Error retrieving orders', details: err.message }, { status: 500 });
  }
}
