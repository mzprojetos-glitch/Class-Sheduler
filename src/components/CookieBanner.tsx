'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUI } from '@/store/ui';
import { useT } from '@/lib/i18n';

/** Banner LGPD: nenhum script de analytics/tracking deve ser carregado sem `cookie.analytics === true`. */
export default function CookieBanner() {
  const t = useT();
  const { cookie, set } = useUI();
  const [mounted, setMounted] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || cookie.decided) return null;
  const decide = (a: boolean) => set({ cookie: { decided: true, analytics: a } });
  return (
    <section role="dialog" aria-labelledby="ck-title" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card p-4 shadow-lg">
      <div className="mx-auto max-w-md">
        <h2 id="ck-title" className="font-semibold">{t('cookieTitle')}</h2>
        <p className="mt-1 text-sm text-muted">{t('cookieText')} <Link className="underline" href="/privacy">{t('privacy')}</Link></p>
        {custom && (
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked disabled /> {t('essential')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> {t('analytics')}</label>
            <button className="btn w-full" onClick={() => decide(analytics)}>{t('save')}</button>
          </div>
        )}
        {!custom && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn" onClick={() => decide(true)}>{t('accept')}</button>
            <button className="btn-sec" onClick={() => decide(false)}>{t('reject')}</button>
            <button className="btn-sec" onClick={() => setCustom(true)}>{t('customize')}</button>
          </div>
        )}
      </div>
    </section>
  );
}
