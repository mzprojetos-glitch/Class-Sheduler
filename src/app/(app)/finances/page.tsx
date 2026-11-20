'use client';
import { useState } from 'react';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { useFinances, useSetPaid } from '@/hooks/queries';
import { brl, fmtDate, monthKey } from '@/lib/format';

export default function Finances() {
  const t = useT();
  const lang = useUI((s) => s.lang);
  const [ref, setRef] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const month = monthKey(ref);
  const { data, isLoading, isError } = useFinances(month);
  const pay = useSetPaid();
  const shift = (n: number) => setRef(new Date(ref.getFullYear(), ref.getMonth() + n, 1));
  return (
    <>
      <h1 className="text-xl font-bold">{t('finances')}</h1>
      <div className="flex items-center justify-between">
        <button className="btn-sec" aria-label={t('prevMonth')} onClick={() => shift(-1)}>‹</button>
        <p className="font-semibold capitalize">{fmtDate(ref, lang, { month: 'long', year: 'numeric' })}</p>
        <button className="btn-sec" aria-label={t('nextMonth')} onClick={() => shift(1)}>›</button>
      </div>
      {isLoading && <p role="status" className="text-muted">{t('loading')}</p>}
      {isError && <p role="alert" className="err">{t('error')}</p>}
      {data && (
        <>
          <section className="card text-center"><p className="text-sm text-muted">{t('totalToReceive')}</p><p className="text-3xl font-bold">{brl(data.total)}</p></section>
          <section className="grid grid-cols-2 gap-3">
            <div className="card text-center"><p className="text-sm text-muted">{t('received')}</p><p className="text-lg font-bold">{brl(data.received)}</p></div>
            <div className="card text-center"><p className="text-sm text-muted">{t('pendingLbl')}</p><p className="text-lg font-bold">{brl(data.pending)}</p></div>
          </section>
          <p className="text-center text-sm text-muted">{t('planLegend')}</p>
          <ul className="space-y-3">
            {data.rows.map((r) => (
              <li key={r.studentId} className="card flex items-center justify-between gap-2">
                <div><p className="font-semibold">{r.name}</p><p className="text-sm text-muted">{t('plan')} {r.plan} · {brl(r.amount)}</p></div>
                <button className="btn-sec" aria-pressed={r.paid} disabled={pay.isPending} onClick={() => pay.mutate({ studentId: r.studentId, month, paid: !r.paid })}>
                  {r.paid ? `✓ ${t('paid')}` : `● ${t('pending')}`}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
