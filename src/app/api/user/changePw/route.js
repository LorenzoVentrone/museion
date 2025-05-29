import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { requireUser } from '@/lib/auth';

export const runtime = 'nodejs';

export async function PATCH(req) {
  try {
    const userID = await requireUser(req);
    const { old_password, new_password } = await req.json();

    // Get current password hash from DB
    const user = await db('users').where({ user_id: userID.user_id }).first();
    if (!old_password || !new_password)
    return new Response(JSON.stringify({ error: 'Missing fields' },{status: 400}));

    // Find user by ID and check old password
    if (!user || !(await bcrypt.compare(old_password, user.pw_hash))) {
      return new Response(JSON.stringify({  error: 'Old password is incorrect' },{status: 403}));
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