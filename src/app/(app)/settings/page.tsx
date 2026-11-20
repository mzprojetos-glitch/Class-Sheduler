'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import { api } from '@/hooks/queries';

const Sel = ({ id, label, value, onChange, opts }: { id: string; label: string; value: string; onChange: (v: string) => void; opts: [string, string][] }) => (
  <div><label className="label" htmlFor={id}>{label}</label>
    <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
);

export default function Settings() {
  const t = useT();
  const { theme, lang, remindersOn, changesOn, set } = useUI();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function changePwd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    try {
      await api('/api/account', { method: 'PATCH', body: JSON.stringify({ currentPassword: f.get('cur'), newPassword: f.get('new') }) });
      setMsg({ ok: true, text: t('saved') }); form.reset();
    } catch (er) { setMsg({ ok: false, text: (er as Error).message }); }
  }
  async function del() {
    if (!confirm(t('deleteConfirm'))) return;
    await api('/api/account', { method: 'DELETE' });
    signOut({ callbackUrl: '/login' });
  }
  return (
    <>
      <Link href="/profile" className="text-sm underline">← {t('profile')}</Link>
      <h1 className="text-xl font-bold">{t('settings')}</h1>
      <section className="card space-y-3">
        <Sel id="theme" label={t('appearance')} value={theme} onChange={(v) => set({ theme: v as 'light' | 'dark' })} opts={[['light', t('light')], ['dark', t('dark')]]} />
        <Sel id="lang" label={t('language')} value={lang} onChange={(v) => set({ lang: v as 'pt' | 'en' })} opts={[['pt', t('portuguese')], ['en', t('english')]]} />
      </section>
      <fieldset className="card space-y-2"><legend className="px-1 font-semibold">{t('notifications')}</legend>
        <label className="flex items-center gap-2"><input type="checkbox" className="h-5 w-5" checked={remindersOn} onChange={(e) => set({ remindersOn: e.target.checked })} />{t('reminders')}</label>
        <label className="flex items-center gap-2"><input type="checkbox" className="h-5 w-5" checked={changesOn} onChange={(e) => set({ changesOn: e.target.checked })} />{t('scheduleChanges')}</label>
      </fieldset>
      <form onSubmit={changePwd} className="card space-y-3"><h2 className="font-semibold">{t('changePassword')}</h2>
        <div><label className="label" htmlFor="cur">{t('currentPassword')}</label><input id="cur" name="cur" type="password" required autoComplete="current-password" className="input" /></div>
        <div><label className="label" htmlFor="new">{t('newPassword')}</label><input id="new" name="new" type="password" required minLength={8} autoComplete="new-password" className="input" /></div>
        <div aria-live="polite">{msg && <p role={msg.ok ? 'status' : 'alert'} className={msg.ok ? 'text-sm font-medium' : 'err'}>{msg.text}</p>}</div>
        <button className="btn w-full">{t('save')}</button>
      </form>
      <nav aria-label="Links" className="card flex flex-col gap-2 underline">
        <Link href="/help">{t('help')}</Link><Link href="/privacy">{t('privacy')}</Link><Link href="/terms">{t('terms')}</Link>
      </nav>
      <button className="btn-sec w-full text-danger" onClick={del}>{t('deleteAccount')}</button>
    </>
  );
}
