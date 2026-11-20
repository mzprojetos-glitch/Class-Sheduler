'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useT } from '@/lib/i18n';
import { useUI } from '@/store/ui';
import Footer from '@/components/Footer';
import PasswordInput from '@/components/PasswordInput';

export default function LoginPage() {
  const t = useT();
  const router = useRouter();
  const [tab, setTab] = useState<'in' | 'up'>('in');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = useUI((s) => s.set);
  void set;

  async function login(email: string, password: string) {
    const r = await signIn('credentials', { email, password, redirect: false });
    if (r?.error) { setErr(t('invalidLogin')); return false; }
    router.replace('/home'); router.refresh(); return true;
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(''); setBusy(true);
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email')), password = String(f.get('password'));
    try {
      if (tab === 'in') { await login(email, password); return; }
      if (password.length < 8) return setErr(t('passMin'));
      if (password !== f.get('confirm')) return setErr(t('passwordsDiff'));
      const r = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: f.get('name'), email, password, accepted: f.get('accepted') === 'on' }) });
      if (!r.ok) return setErr(((await r.json().catch(() => ({}))) as { error?: string }).error || t('error'));
      await login(email, password);
    } finally { setBusy(false); }
  }

  return (
    <>
      <main id="main" className="mx-auto max-w-md p-6">
        <div className="mb-6 text-center">
          <div aria-hidden className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl text-primary-fg">📅</div>
          <h1 className="text-2xl font-bold">{t('appName')}</h1>
          <p className="text-muted">{t('tagline')}</p>
        </div>
        <div role="tablist" className="mb-4 grid grid-cols-2 rounded-lg border border-line bg-secondary p-1">
          {(['in', 'up'] as const).map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); setErr(''); }}
              className={`min-h-[44px] rounded-md text-sm font-semibold ${tab === k ? 'bg-primary text-primary-fg' : 'text-fg'}`}>{k === 'in' ? t('signIn') : t('signUp')}</button>
          ))}
        </div>
        <form onSubmit={submit} className="card space-y-3" key={tab}>
          {tab === 'up' && <div><label className="label" htmlFor="name">{t('fullName')}</label><input id="name" name="name" required minLength={2} autoComplete="name" className="input" /></div>}
          <div><label className="label" htmlFor="email">{t('email')}</label><input id="email" name="email" type="email" required autoComplete="email" className="input" /></div>
          <div><label className="label" htmlFor="password">{t('password')}</label><PasswordInput id="password" name="password" autoComplete={tab === 'in' ? 'current-password' : 'new-password'} /></div>
          {tab === 'up' && (
            <>
              <div><label className="label" htmlFor="confirm">{t('confirmPassword')}</label><PasswordInput id="confirm" name="confirm" autoComplete="new-password" /></div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" name="accepted" required className="mt-1 h-4 w-4" />
                <span>{t('acceptPre')} <Link className="underline" href="/terms">{t('terms')}</Link> {t('and')} <Link className="underline" href="/privacy">{t('privacy')}</Link>.</span>
              </label>
              <p className="text-xs text-muted">{t('purposeSignup')} <Link className="underline" href="/privacy">{t('privacy')}</Link>.</p>
            </>
          )}
          <div aria-live="assertive">{err && <p role="alert" className="err">{err}</p>}</div>
          <button className="btn w-full" disabled={busy}>{tab === 'in' ? t('signIn') : t('signUp')}</button>
          {tab === 'in' && <p className="text-center text-sm"><Link className="underline" href="/forgot-password">{t('forgot')}</Link></p>}
        </form>
        <div className="mt-4 space-y-2">
          <button className="btn-sec w-full" onClick={() => signIn('google', { callbackUrl: '/home' })}>{t('google')}</button>
          <button className="btn-sec w-full" onClick={() => signIn('apple', { callbackUrl: '/home' })}>{t('apple')}</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
