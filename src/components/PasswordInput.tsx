'use client';
import { useState } from 'react';
import { useT } from '@/lib/i18n';

type Props = { id: string; name: string; autoComplete?: string; required?: boolean; minLength?: number };

/** Campo de senha com botão "mostrar/ocultar" acessível (aria-pressed + rótulo dinâmico). */
export default function PasswordInput({ id, name, autoComplete, required = true, minLength }: Props) {
  const t = useT();
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input id={id} name={name} type={visible ? 'text' : 'password'} required={required} minLength={minLength}
        autoComplete={autoComplete} className="input pr-12" />
      <button type="button" onClick={() => setVisible((v) => !v)} aria-pressed={visible}
        aria-label={visible ? t('hidePassword') : t('showPassword')} title={visible ? t('hidePassword') : t('showPassword')}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-lg text-muted">
        <span aria-hidden>{visible ? '🙈' : '👁'}</span>
      </button>
    </div>
  );
}
