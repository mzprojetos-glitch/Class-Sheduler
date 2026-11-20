import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './auth';
import { connectDB } from './db';

/** Proteção no backend: toda Route Handler privada passa por aqui. */
export const unauthorized = () => NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
export const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function auth() {
  const s = await getServerSession(authOptions);
  if (!s?.user?.id) return null;
  await connectDB();
  return s.user.id;
}
