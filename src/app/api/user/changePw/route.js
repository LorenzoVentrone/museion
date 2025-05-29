import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { requireUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PATCH(req) {
  try {
    const user = await requireUser(req);
    const { old_password, new_password } = await req.json();

    // Get current password hash from DB
    const [dbUser] = await db('users').where({ user_id: user.user_id }).select('pw_hash');
    if (!dbUser) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Check old password
    const valid = await bcrypt.compare(old_password, dbUser.pw_hash);
    if (!valid) {
      return new Response(JSON.stringify({ error: 'Old password incorrect' }), { status: 400 });
    }

    // Hash new password and update
    const newHash = await bcrypt.hash(new_password, 10);
    await db('users').where({ user_id: user.user_id }).update({ pw_hash: newHash });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.toString() }), { status: 500 });
  }
}