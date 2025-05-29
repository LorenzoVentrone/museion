import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  if (!date)
    return NextResponse.json({ message: 'Missing date' }, { status: 400 });

  try {
    const rows = await db('availability as a')
      .join('items as i', 'a.item_id', 'i.item_id')
      .select(
        'a.item_id',
        'i.category',
        'i.type',
        'i.logo',
        'i.color',
        'i.price',
        'a.availability',
        'a.date'
      )
      .where('a.date', date);

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
