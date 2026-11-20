export type Status = 'agendada' | 'ministrada' | 'falta' | 'remarcada';
export type Plan = 2 | 4;
export interface ScheduleSlot { weekday: number; start: string; end: string } // weekday: 1=Seg ... 6=Sáb
export interface StudentDTO { id: string; name: string; plan: Plan; price: number; schedule: ScheduleSlot[]; active: boolean }
export interface SessionDTO { id: string; date: string; start: string; end: string; status: Status; notes?: string; studentId: string; studentName: string }
export interface FinanceRow { studentId: string; name: string; plan: Plan; amount: number; paid: boolean }
