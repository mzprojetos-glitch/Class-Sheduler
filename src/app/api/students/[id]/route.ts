import { NextResponse } from 'next/server';
import { isValidObjectId, Types } from 'mongoose';
import { auth, bad, unauthorized } from '@/lib/api';
import { Student } from '@/models/Student';
import { ClassSession } from '@/models/ClassSession';
import { Payment } from '@/models/Payment';
import { monthKey, ymd } from '@/lib/format';
import { endOfMonth, generateSessions } from '@/lib/sessions';
import { studentSchema, toStudentDTO } from '@/lib/dto';

type Ctx = { params: { id: string } };

export async function GET(_: Request, { params }: Ctx) {
  const userId = await auth(); if (!userId) return unauthorized();
  if (!isValidObjectId(params.id)) return bad('ID inválido', 404);
  const s = await Student.findOne({ _id: params.id, userId }).lean();
  if (!s) return bad('Aluno não encontrado', 404);
  const counts = await ClassSession.aggregate([
    { $match: { userId: new Types.ObjectId(userId), studentId: s._id } },
    { $group: { _id: '$status', n: { $sum: 1 } } },
  ]);
  const n = (st: string) => counts.find((c) => c._id === st)?.n ?? 0;
  const pay = await Payment.findOne({ studentId: s._id, month: monthKey(new Date()) }).lean();
  return NextResponse.json({ student: toStudentDTO(s), taught: n('ministrada'), absences: n('falta'), paid: !!pay?.paid });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const userId = await auth(); if (!userId) return unauthorized();
  if (!isValidObjectId(params.id)) return bad('ID inválido', 404);
  const p = studentSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos');
  const s = await Student.findOneAndUpdate({ _id: params.id, userId }, p.data, { new: true });
  if (!s) return bad('Aluno não encontrado', 404);
  // Regenera aulas futuras ainda "agendadas" com os novos horários.
  const now = new Date();
  await ClassSession.deleteMany({ userId, studentId: s._id, status: 'agendada', date: { $gte: ymd(now) } });
  await generateSessions(userId, s.id, p.data.schedule, ymd(now), endOfMonth(now));
  return NextResponse.json({ student: toStudentDTO(s.toObject()) });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const userId = await auth(); if (!userId) return unauthorized();
  if (!isValidObjectId(params.id)) return bad('ID inválido', 404);
  const s = await Student.findOneAndUpdate({ _id: params.id, userId }, { active: false });
  if (!s) return bad('Aluno não encontrado', 404);
  await ClassSession.deleteMany({ userId, studentId: s._id, status: 'agendada' });
  return NextResponse.json({ ok: true });
}
