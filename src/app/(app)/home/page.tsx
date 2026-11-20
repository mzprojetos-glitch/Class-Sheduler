'use client';
import { useSession } from 'next-auth/react';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { useSessions } from '@/hooks/queries';
import { fmtDate, initials, ymd } from '@/lib/format';
import SessionCard from '@/components/SessionCard';

export default function Home() {
  const t = useT();
  const lang = useUI((s) => s.lang);
  const { data: sess } = useSession();
  const today = ymd(new Date());
  const { data, isLoading, isError } = useSessions(today, today);
  const list = data?.sessions ?? [];
  const count = (s: string) => list.filter((x) => x.status === s).length;
  const name = sess?.user?.name ?? '';
  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm capitalize text-muted">{fmtDate(new Date(), lang, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="text-xl font-bold">{t('hello')} {name.split(' ')[0]}</h1>
        </div>
        <div aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-primary-fg">{initials(name)}</div>
      </header>
      <section aria-label="Resumo" className="grid grid-cols-3 gap-3">
        {[['taught', count('ministrada')], ['remaining', count('agendada')], ['absences', count('falta')]].map(([k, n]) => (
          <div key={k as string} className="card text-center"><p className="text-2xl font-bold">{n}</p><p className="text-xs text-muted">{t(k as 'taught')}</p></div>
        ))}
      </section>
      <section>
        <h2 className="mb-2 font-semibold">{t('todayLessons')}</h2>
        {isLoading && <p role="status" className="text-muted">{t('loading')}</p>}
        {isError && <p role="alert" className="err">{t('error')}</p>}
        {!isLoading && !list.length && <p className="text-muted">{t('noLessons')}</p>}
        <ul className="space-y-3">{list.map((s) => <SessionCard key={s.id} s={s} actions />)}</ul>
      </section>
    </>
  );
}
