import { z } from 'zod';
import { PLAN_PRICE } from './format';

export const studentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  plan: z.union([z.literal(2), z.literal(4)]),
  schedule: z.array(z.object({ weekday: z.number().int().min(1).max(6), start: z.string().regex(/^\d{2}:\d{2}$/), end: z.string().regex(/^\d{2}:\d{2}$/) })).max(7),
});

export const toStudentDTO = (s: any) => ({
  id: s._id.toString(), name: s.name, plan: s.plan, price: PLAN_PRICE[s.plan], schedule: s.schedule ?? [], active: s.active,
});

export const toSessionDTO = (s: any) => ({
  id: s._id.toString(), date: s.date, start: s.start, end: s.end, status: s.status, notes: s.notes,
  studentId: (s.studentId?._id ?? s.studentId).toString(), studentName: s.studentId?.name ?? '',
});
