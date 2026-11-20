import { NextResponse } from 'next/server';
import { auth, bad, unauthorized } from '@/lib/api';
import { Student } from '@/models/Student';
import { ymd } from '@/lib/format';
import { studentSchema, toStudentDTO } from '@/lib/dto';
import { endOfMonth, generateSessions } from '@/lib/sessions';

export async function GET(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const q = new URL(req.url).searchParams.get('q')?.trim();
  const filter: Record<string, unknown> = { userId, active: true };
  if (q) filter.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
  const list = await Student.find(filter).sort({ name: 1 }).lean();
  return NextResponse.json({ students: list.map(toStudentDTO) });
}

export async function POST(req: Request) {
  const userId = await auth(); if (!userId) return unauthorized();
  const p = studentSchema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos');
  const s = await Student.create({ ...p.data, userId });
  const now = new Date();
  await generateSessions(userId, s.id, p.data.schedule, ymd(now), endOfMonth(now));
  return NextResponse.json({ student: toStudentDTO(s.toObject()) }, { status: 201 });
}
