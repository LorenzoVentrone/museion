import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
export const runtime = 'nodejs';

const SALT = 10;

export async function POST(req) {
  const { email, password, first_name, last_name } = await req.json();
  if (!email || !password || !first_name || !last_name)
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });

  try {
    const hash = await bcrypt.hash(password, SALT);
    const [user] = await db('users')
      .insert({ email, pw_hash: hash, first_name, last_name })
      .returning(['user_id', 'email', 'first_name', 'last_name']);

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error(err);
    if (err.code === '23505')
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    return NextResponse.json({ error: 'Signup error' }, { status: 500 });
  }
}
