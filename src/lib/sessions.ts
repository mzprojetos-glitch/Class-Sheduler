import { ClassSession } from '@/models/ClassSession';
import { addDays, parseYmd, ymd } from './format';
import type { ScheduleSlot } from '@/types';

/** Gera aulas "agendadas" conforme os horários semanais do aluno, no intervalo [from, to]. */
export async function generateSessions(userId: string, studentId: string, schedule: ScheduleSlot[], from: string, to: string) {
  const docs = [];
  for (let d = parseYmd(from); ymd(d) <= to; d = addDays(d, 1)) {
    for (const s of schedule.filter((x) => x.weekday === d.getDay()))
      docs.push({ userId, studentId, date: ymd(d), start: s.start, end: s.end, status: 'agendada' });
  }
  if (docs.length) await ClassSession.insertMany(docs);
}
export const endOfMonth = (d: Date) => ymd(new Date(d.getFullYear(), d.getMonth() + 1, 0));
