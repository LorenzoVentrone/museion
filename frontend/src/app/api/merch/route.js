import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const merch = await db('items').where({ category: 'merch' });
    return NextResponse.json(merch);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error retrieving merch' }, { status: 500 });
  }
}
