import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth, bad, unauthorized } from '@/lib/api';
import { Student } from '@/models/Student';
import { Payment } from '@/models/Payment';
import { PLAN_PRICE } from '@/lib/format';

export async function GET(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const month = new URL(req.url).searchParams.get('month');
  if (!month || !/^\d{4}-\d{2}$/.test(month)) return bad('month inválido');
  const students = await Student.find({ userId, active: true }).sort({ name: 1 }).lean();
  const pays = await Payment.find({ userId, month }).lean();
  const rows = students.map((s) => ({
    studentId: s._id.toString(), name: s.name, plan: s.plan, amount: PLAN_PRICE[s.plan],
    paid: !!pays.find((p) => p.studentId.equals(s._id))?.paid,
  }));
  const total = rows.reduce((a, r) => a + r.amount, 0);
  const received = rows.filter((r) => r.paid).reduce((a, r) => a + r.amount, 0);
  return NextResponse.json({ month, rows, total, received, pending: total - received });
}

const schema = z.object({ studentId: z.string(), month: z.string().regex(/^\d{4}-\d{2}$/), paid: z.boolean() });

export async function POST(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos');
  const s = await Student.findOne({ _id: p.data.studentId, userId });
  if (!s) return bad('Aluno não encontrado', 404);
  await Payment.updateOne(
    { studentId: s._id, month: p.data.month },
    { $set: { userId, amount: PLAN_PRICE[s.plan], paid: p.data.paid, paidAt: p.data.paid ? new Date() : null } },
    { upsert: true },
  );
  return NextResponse.json({ ok: true });
}
