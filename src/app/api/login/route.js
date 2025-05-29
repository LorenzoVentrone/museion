import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateToken } from '@/lib/jwt';
import bcrypt from 'bcrypt';
export const runtime = 'nodejs';

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const user = await db('users').where({ email }).first();
  if (!user || !(await bcrypt.compare(password, user.pw_hash)))
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = generateToken(user);
  return NextResponse.json({ token, user: { user_id: user.user_id, email } }, { status: 201 });
}
