'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ymd } from '@/lib/format';

export type Modal = { type: 'session' | 'student' | 'editStudent' | null; id?: string };
interface UI {
  theme: 'light' | 'dark'; lang: 'pt' | 'en';
  remindersOn: boolean; changesOn: boolean;
  cookie: { decided: boolean; analytics: boolean };
  selectedDay: string; studentSearch: string; modal: Modal;
  set: (p: Partial<UI>) => void; openModal: (m: Modal) => void; closeModal: () => void;
}
/** Zustand: apenas estado de UI (tema, idioma, modais, filtros). Dados do servidor ficam no React Query. */
export const useUI = create<UI>()(persist((set) => ({
  theme: 'light', lang: 'pt', remindersOn: true, changesOn: true,
  cookie: { decided: false, analytics: false },
  selectedDay: ymd(new Date()), studentSearch: '', modal: { type: null },
  set: (p) => set(p), openModal: (modal) => set({ modal }), closeModal: () => set({ modal: { type: null } }),
}), {
  name: 'cs-ui',
  partialize: (s) => ({ theme: s.theme, lang: s.lang, remindersOn: s.remindersOn, changesOn: s.changesOn, cookie: s.cookie }),
}));
