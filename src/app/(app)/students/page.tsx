'use client';
import Link from 'next/link';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { useStudents } from '@/hooks/queries';
import { brl, initials } from '@/lib/format';

export default function Students() {
  const t = useT();
  const { studentSearch, set, openModal } = useUI();
  const { data, isLoading, isError } = useStudents(studentSearch);
  const list = data?.students ?? [];
  return (
    <>
      <header className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold">{t('students')}</h1><p className="text-sm text-muted">{list.length} {t('activeStudents')}</p></div>
        <button className="btn" aria-label={t('newStudent')} onClick={() => openModal({ type: 'student' })}>+</button>
      </header>
      <div role="search"><label className="sr-only" htmlFor="q">{t('search')}</label>
        <input id="q" type="search" className="input" placeholder={t('search')} value={studentSearch} onChange={(e) => set({ studentSearch: e.target.value })} /></div>
      {isLoading && <p role="status" className="text-muted">{t('loading')}</p>}
      {isError && <p role="alert" className="err">{t('error')}</p>}
      {!isLoading && !list.length && <p className="text-muted">{t('noStudents')}</p>}
      <ul className="space-y-3">
        {list.map((s) => (
          <li key={s.id}>
            <Link href={`/students/${s.id}`} className="card flex items-center gap-3">
              <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary font-bold">{initials(s.name)}</span>
              <span><span className="block font-semibold">{s.name}</span><span className="text-sm text-muted">{t('plan')} {s.plan} {t('lessonsWord')} · {brl(s.price)}{t('perMonth')}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
