'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useT } from '@/lib/i18n';
import { initials } from '@/lib/format';
import { useUpdateName } from '@/hooks/queries';

export default function Profile() {
  const t = useT();
  const { data: sess, update } = useSession();
  const upd = useUpdateName();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const cur = sess?.user?.name ?? '';
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    upd.mutate(name, { onSuccess: async () => { await update({ name }); setEditing(false); }, onError: (er) => setErr(er.message) });
  };
  return (
    <>
      <header className="flex flex-col items-center gap-1 text-center">
        <div aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-fg">{initials(cur)}</div>
        <h1 className="text-xl font-bold">{cur}</h1><p className="text-muted">{t('instructor')}</p>
      </header>
      <section className="card space-y-1"><h2 className="font-semibold">{t('account')}</h2>
        <p><span className="text-muted">{t('fullName')}: </span>{cur}</p>
        <p><span className="text-muted">{t('email')}: </span>{sess?.user?.email}</p>
        <p><span className="text-muted">{t('accountType')}: </span>{t('instructor').split(' ')[0]}</p></section>
      {editing ? (
        <form onSubmit={save} className="card space-y-3">
          <div><label className="label" htmlFor="pname">{t('fullName')}</label><input id="pname" required minLength={2} className="input" defaultValue={cur} onChange={(e) => setName(e.target.value)} onFocus={() => !name && setName(cur)} /></div>
          {err && <p role="alert" className="err">{err}</p>}
          <div className="flex gap-2"><button className="btn flex-1">{t('save')}</button><button type="button" className="btn-sec flex-1" onClick={() => setEditing(false)}>{t('cancel')}</button></div>
        </form>
      ) : <button className="btn-sec w-full" onClick={() => { setName(cur); setEditing(true); }}>{t('editProfile')}</button>}
      <Link href="/settings" className="btn-sec w-full">⚙ {t('settings')}</Link>
      <button className="btn w-full" onClick={() => signOut({ callbackUrl: '/login' })}>{t('logout')}</button>
    </>
  );
}
