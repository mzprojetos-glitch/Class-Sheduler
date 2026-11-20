import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { auth, bad, unauthorized } from '@/lib/api';
import { User } from '@/models/User';
import { Student } from '@/models/Student';
import { ClassSession } from '@/models/ClassSession';
import { Payment } from '@/models/Payment';

const schema = z.union([
  z.object({ name: z.string().trim().min(2).max(100) }),
  z.object({ currentPassword: z.string(), newPassword: z.string().min(8).max(100) }),
]);

export async function PATCH(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos (senha com 8+ caracteres)');
  if ('name' in p.data) { await User.updateOne({ _id: userId }, { name: p.data.name }); return NextResponse.json({ ok: true }); }
  const u = await User.findById(userId).select('+password');
  if (!u?.password || !(await bcrypt.compare(p.data.currentPassword, u.password))) return bad('Senha atual incorreta', 403);
  u.password = await bcrypt.hash(p.data.newPassword, 12);
  await u.save();
  return NextResponse.json({ ok: true });
}

/** Direito de eliminação (LGPD): apaga conta e todos os dados do usuário. */
export async function DELETE() {
  const userId = await auth(); if (!userId) return unauthorized();
  await Promise.all([Payment.deleteMany({ userId }), ClassSession.deleteMany({ userId }), Student.deleteMany({ userId }), User.deleteOne({ _id: userId })]);
  return NextResponse.json({ ok: true });
}
