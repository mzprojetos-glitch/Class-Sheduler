import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth, bad, unauthorized } from '@/lib/api';
import { ClassSession } from '@/models/ClassSession';
import { Student } from '@/models/Student';
import { toSessionDTO } from '@/lib/dto';

export async function GET(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const sp = new URL(req.url).searchParams;
  const from = sp.get('from'), to = sp.get('to');
  if (!from || !to) return bad('from/to obrigatórios');
  const list = await ClassSession.find({ userId, date: { $gte: from, $lte: to } }).sort({ date: 1, start: 1 }).populate('studentId', 'name').lean();
  return NextResponse.json({ sessions: list.map(toSessionDTO) });
}

const schema = z.object({
  studentId: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  start: z.string().regex(/^\d{2}:\d{2}$/), end: z.string().regex(/^\d{2}:\d{2}$/), notes: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success || p.data.end <= p.data.start) return bad('Dados inválidos (verifique os horários)');
  if (!(await Student.exists({ _id: p.data.studentId, userId }))) return bad('Aluno não encontrado', 404);
  const s = await ClassSession.create({ ...p.data, userId });
  return NextResponse.json({ id: s.id }, { status: 201 });
}
