import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';
export const runtime = 'nodejs';
const SALT = 10;

export async function PATCH(req) {
  const user = await requireUser(req);
  const { old_password, new_password } = await req.json();

  if (!old_password || !new_password)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const row = await db('users').where({ user_id: user.user_id }).first();
  if (!row || !(await bcrypt.compare(old_password, row.pw_hash)))
    return NextResponse.json({ error: 'Old password wrong' }, { status: 403 });

  const hash = await bcrypt.hash(new_password, SALT);
  await db('users').where({ user_id: user.user_id }).update({ pw_hash: hash });
  return NextResponse.json({ success: true });
}
