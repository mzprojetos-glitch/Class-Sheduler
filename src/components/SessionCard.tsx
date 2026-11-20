'use client';
import { useT } from '@/lib/i18n';
import { useUpdateSession } from '@/hooks/queries';
import type { SessionDTO } from '@/types';
import StatusBadge, { STATUS_COLOR } from './StatusBadge';

export default function SessionCard({ s, actions = false }: { s: SessionDTO; actions?: boolean }) {
  const t = useT();
  const m = useUpdateSession();
  return (
    <li className="card flex flex-col gap-2 border-l-8" style={{ borderLeftColor: STATUS_COLOR[s.status] }}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-muted">{s.start} – {s.end}</p>
          <p className="font-semibold">{s.studentName}</p>
          <p className="text-sm text-muted">{t('lessonType')}</p>
          {s.notes && <p className="mt-1 text-sm">{s.notes}</p>}
        </div>
        <StatusBadge status={s.status} />
      </div>
      {actions && s.status === 'agendada' && (
        <div className="flex flex-wrap gap-2">
          <button className="btn-sec" disabled={m.isPending} onClick={() => m.mutate({ id: s.id, status: 'ministrada' })}>✓ {t('markTaught')}</button>
          <button className="btn-sec" disabled={m.isPending} onClick={() => m.mutate({ id: s.id, status: 'falta' })}>✗ {t('markAbsent')}</button>
          <button className="btn-sec" disabled={m.isPending} onClick={() => m.mutate({ id: s.id, status: 'remarcada' })}>↻ {t('reschedule')}</button>
        </div>
      )}
    </li>
  );
}
