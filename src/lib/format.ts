export const PLAN_PRICE: Record<number, number> = { 2: 120, 4: 180 };
export const brl = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
export const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const parseYmd = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const startOfWeek = (d: Date) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); x.setHours(0, 0, 0, 0); return x; };
export const monthKey = (d: Date) => ymd(d).slice(0, 7);
export const initials = (n: string) => n.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('');
export const fmtDate = (d: Date, lang: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'pt-BR', o).format(d);
