import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await requireUser(req);
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
