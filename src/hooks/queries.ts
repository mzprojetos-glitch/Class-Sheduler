'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FinanceRow, ScheduleSlot, SessionDTO, Status, StudentDTO } from '@/types';

export async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } });
  if (!r.ok) throw new Error(((await r.json().catch(() => ({}))) as { error?: string }).error || 'Erro');
  return r.json();
}
const send = (method: string, body?: unknown) => ({ method, body: body ? JSON.stringify(body) : undefined });

export const useStudents = (q = '') => useQuery({ queryKey: ['students', q], queryFn: () => api<{ students: StudentDTO[] }>(`/api/students?q=${encodeURIComponent(q)}`) });
export const useStudent = (id?: string) => useQuery({
  queryKey: ['student', id], enabled: !!id,
  queryFn: () => api<{ student: StudentDTO; taught: number; absences: number; paid: boolean }>(`/api/students/${id}`),
});
export const useSessions = (from: string, to: string) => useQuery({ queryKey: ['sessions', from, to], queryFn: () => api<{ sessions: SessionDTO[] }>(`/api/sessions?from=${from}&to=${to}`) });
export const useFinances = (month: string) => useQuery({
  queryKey: ['finances', month],
  queryFn: () => api<{ rows: FinanceRow[]; total: number; received: number; pending: number }>(`/api/payments?month=${month}`),
});

/** Toda mutação invalida o cache do React Query para manter as telas sincronizadas. */
function useMut<V>(fn: (v: V) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({ mutationFn: fn, onSuccess: () => qc.invalidateQueries() });
}
type StudentInput = { name: string; plan: 2 | 4; schedule: ScheduleSlot[] };
export const useCreateStudent = () => useMut((v: StudentInput) => api('/api/students', send('POST', v)));
export const useUpdateStudent = () => useMut((v: StudentInput & { id: string }) => api(`/api/students/${v.id}`, send('PATCH', { name: v.name, plan: v.plan, schedule: v.schedule })));
export const useCreateSession = () => useMut((v: { studentId: string; date: string; start: string; end: string; notes?: string }) => api('/api/sessions', send('POST', v)));
export const useUpdateSession = () => useMut((v: { id: string; status: Status }) => api(`/api/sessions/${v.id}`, send('PATCH', { status: v.status })));
export const useSetPaid = () => useMut((v: { studentId: string; month: string; paid: boolean }) => api('/api/payments', send('POST', v)));
export const useUpdateName = () => useMut((name: string) => api('/api/account', send('PATCH', { name })));
