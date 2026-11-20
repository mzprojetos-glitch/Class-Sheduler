'use client';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { useSessions } from '@/hooks/queries';
import { addDays, fmtDate, parseYmd, startOfWeek, ymd } from '@/lib/format';
import SessionCard from '@/components/SessionCard';

export default function Schedule() {
  const t = useT();
  const { lang, selectedDay, set, openModal } = useUI();
  const monday = startOfWeek(parseYmd(selectedDay));
  const days = Array.from({ length: 6 }, (_, i) => addDays(monday, i));
  const { data, isLoading, isError } = useSessions(ymd(days[0]), ymd(days[5]));
  const list = (data?.sessions ?? []).filter((s) => s.date === selectedDay);
  const short = { day: 'numeric', month: 'short' } as const;
  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('schedule')}</h1>
        <button className="btn" aria-label={t('newLesson')} onClick={() => openModal({ type: 'session' })}>+</button>
      </header>
      <div className="flex items-center justify-between">
        <button className="btn-sec" aria-label={t('prevWeek')} onClick={() => set({ selectedDay: ymd(addDays(monday, -7)) })}>‹</button>
        <p className="font-semibold">{fmtDate(days[0], lang, short)} – {fmtDate(days[5], lang, short)}</p>
        <button className="btn-sec" aria-label={t('nextWeek')} onClick={() => set({ selectedDay: ymd(addDays(monday, 7)) })}>›</button>
      </div>
      <div role="group" aria-label={t('day')} className="grid grid-cols-6 gap-1">
        {days.map((d) => {
          const on = ymd(d) === selectedDay;
          return (
            <button key={ymd(d)} aria-pressed={on} onClick={() => set({ selectedDay: ymd(d) })}
              className={`flex min-h-[56px] flex-col items-center justify-center rounded-lg border text-xs font-semibold ${on ? 'border-primary bg-primary text-primary-fg' : 'border-line bg-card'}`}>
              <span className="capitalize">{fmtDate(d, lang, { weekday: 'short' })}</span><span className="text-base">{d.getDate()}</span>
            </button>
          );
        })}
      </div>
      {isLoading && <p role="status" className="text-muted">{t('loading')}</p>}
      {isError && <p role="alert" className="err">{t('error')}</p>}
      {!isLoading && !list.length && <p className="text-muted">{t('noLessons')}</p>}
      <ul className="space-y-3">{list.map((s) => <SessionCard key={s.id} s={s} actions />)}</ul>
    </>
  );
}
