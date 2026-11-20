import { NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';
import { z } from 'zod';
import { auth, bad, unauthorized } from '@/lib/api';
import { ClassSession } from '@/models/ClassSession';

const schema = z.object({
  status: z.enum(['agendada', 'ministrada', 'falta', 'remarcada']).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  start: z.string().regex(/^\d{2}:\d{2}$/).optional(), end: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  notes: z.string().max(500).optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const userId = await auth(); if (!userId) return unauthorized();
  if (!isValidObjectId(params.id)) return bad('ID inválido', 404);
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos');
  const s = await ClassSession.findOneAndUpdate({ _id: params.id, userId }, p.data, { new: true });
  if (!s) return bad('Aula não encontrada', 404);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const userId = await auth(); if (!userId) return unauthorized();
  if (!isValidObjectId(params.id)) return bad('ID inválido', 404);
  await ClassSession.deleteOne({ _id: params.id, userId });
  return NextResponse.json({ ok: true });
}
