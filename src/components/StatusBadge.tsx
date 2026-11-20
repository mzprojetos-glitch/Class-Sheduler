'use client';
import { useT } from '@/lib/i18n';
import type { Status } from '@/types';

export const STATUS_COLOR: Record<Status, string> = { ministrada: '#3BA55D', falta: '#E05A5A', agendada: '#F4B431', remarcada: '#64748B' };
const ICON: Record<Status, string> = { ministrada: '✓', falta: '✗', agendada: '●', remarcada: '↻' };

/** Status nunca depende só de cor: ícone + texto + borda colorida (WCAG AA). */
export default function StatusBadge({ status }: { status: Status }) {
  const t = useT();
  return (
    <span className="inline-flex items-center gap-1 rounded-full border-2 px-2 py-0.5 text-xs font-semibold" style={{ borderColor: STATUS_COLOR[status] }}>
      <span aria-hidden>{ICON[status]}</span>{t(status)}
    </span>
  );
}
