import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PUT(req) {
  try {
    const user = await requireUser(req);
    const body = await req.json();

    // Only allow updating specific fields
    const allowedFields = ['first_name', 'last_name', 'email'];
    const updateData = {};
    for (const field of allowedFields) {
      if (body[field]) updateData[field] = body[field];
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    await db('users').where({ user_id: user.user_id }).update(updateData);

    // Return the updated user (optional)
    const updatedUser = await db('users')
      .where({ user_id: user.user_id })
      .select('user_id', 'first_name', 'last_name', 'email')
      .first();

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.toString() }, { status: 500 });
  }
}