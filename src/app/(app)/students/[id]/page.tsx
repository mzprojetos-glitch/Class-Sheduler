'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { useSetPaid, useStudent } from '@/hooks/queries';
import { brl, monthKey } from '@/lib/format';

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const t = useT();
  const { lang, openModal } = useUI();
  const { data, isLoading, isError } = useStudent(id);
  const pay = useSetPaid();
  if (isLoading) return <p role="status" className="text-muted">{t('loading')}</p>;
  if (isError || !data) return <p role="alert" className="err">{t('error')}</p>;
  const { student: s, taught, absences, paid } = data;
  const wd = (n: number) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'pt-BR', { weekday: 'short' }).format(new Date(2024, 0, n));
  return (
    <>
      <Link href="/students" className="text-sm underline">← {t('students')}</Link>
      <header><h1 className="text-xl font-bold">{s.name}</h1><p className="text-muted">{t('plan')} {s.plan} {t('lessonsWord')} · {brl(s.price)}{t('perMonth')}</p></header>
      <section className="grid grid-cols-2 gap-3">
        <div className="card text-center"><p className="text-2xl font-bold">{taught}</p><p className="text-xs text-muted">{t('taught')}</p></div>
        <div className="card text-center"><p className="text-2xl font-bold">{absences}</p><p className="text-xs text-muted">{t('absences')}</p></div>
      </section>
      <section className="card flex items-center justify-between">
        <span className="font-medium">{t('monthlyFee')}</span>
        <span className="rounded-full border-2 px-2 py-0.5 text-xs font-semibold" style={{ borderColor: paid ? '#3BA55D' : '#F4B431' }}>{paid ? `✓ ${t('paid')}` : `● ${t('pending')}`}</span>
      </section>
      <section className="card"><h2 className="mb-1 font-semibold">{t('nextLessons')}</h2>
        <p className="capitalize text-muted">{s.schedule.map((x) => `${wd(x.weekday)} ${x.start}`).join(', ') || '—'}</p></section>
      <button className="btn w-full" disabled={pay.isPending} onClick={() => pay.mutate({ studentId: s.id, month: monthKey(new Date()), paid: !paid })}>{paid ? t('undoPayment') : t('registerPayment')}</button>
      <button className="btn-sec w-full" onClick={() => openModal({ type: 'editStudent', id: s.id })}>{t('editPlan')}</button>
    </>
  );
}
