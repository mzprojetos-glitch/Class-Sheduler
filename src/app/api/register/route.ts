import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { bad } from '@/lib/api';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(100),
  accepted: z.literal(true),
});

export async function POST(req: Request) {
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return bad('Dados inválidos. Use senha com 8+ caracteres e aceite os termos.');
  await connectDB();
  if (await User.exists({ email: p.data.email })) return bad('Email já cadastrado', 409);
  const password = await bcrypt.hash(p.data.password, 12);
  await User.create({ name: p.data.name, email: p.data.email, password, acceptedTermsAt: new Date() });
  return NextResponse.json({ ok: true }, { status: 201 });
}
