import { verifyToken } from '@/lib/jwt';

export async function requireUser(request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.split(' ')[1]; // "Bearer abc"
  if (!token) throw new Error('Unauthenticated');
  return verifyToken(token);        // { user_id, email, iat, exp }
}
