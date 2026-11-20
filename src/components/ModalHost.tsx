'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useUI } from '@/store/ui';
import { useT } from '@/lib/i18n';
import { addDays, parseYmd, startOfWeek, ymd } from '@/lib/format';
import { useCreateSession, useCreateStudent, useStudent, useStudents, useUpdateStudent } from '@/hooks/queries';
import type { ScheduleSlot } from '@/types';
import Modal from './Modal';

const DAYS = [1, 2, 3, 4, 5, 6];
const dayName = (wd: number, lang: string) => new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'pt-BR', { weekday: 'short' }).format(addDays(startOfWeek(new Date()), wd - 1));

function SessionForm() {
  const t = useT();
  const { lang, selectedDay, closeModal } = useUI();
  const { data } = useStudents();
  const create = useCreateSession();
  const [wd, setWd] = useState(((parseYmd(selectedDay).getDay() + 6) % 7) + 1 > 6 ? 1 : parseYmd(selectedDay).getDay() || 1);
  const [err, setErr] = useState('');
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const monday = startOfWeek(parseYmd(selectedDay));
    create.mutate(
      { studentId: String(f.get('studentId')), date: ymd(addDays(monday, wd - 1)), start: String(f.get('start')), end: String(f.get('end')), notes: String(f.get('notes') || '') || undefined },
      { onSuccess: closeModal, onError: (er) => setErr(er.message) },
    );
  };
  return (
    <Modal title={t('newLesson')} onClose={closeModal}>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label" htmlFor="studentId">{t('student')}</label>
          <select id="studentId" name="studentId" required className="input" defaultValue="">
            <option value="" disabled>{t('selectStudent')}</option>
            {data?.students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select></div>
        <div><label className="label" htmlFor="wd">{t('day')}</label>
          <select id="wd" className="input" value={wd} onChange={(e) => setWd(Number(e.target.value))}>
            {DAYS.map((d) => <option key={d} value={d}>{dayName(d, lang)}</option>)}
          </select></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="label" htmlFor="start">{t('start')}</label><input id="start" name="start" type="time" required className="input" defaultValue="09:00" /></div>
          <div><label className="label" htmlFor="end">{t('end')}</label><input id="end" name="end" type="time" required className="input" defaultValue="10:00" /></div>
        </div>
        <div><label className="label" htmlFor="notes">{t('notes')}</label><textarea id="notes" name="notes" maxLength={500} rows={2} className="input" /></div>
        {err && <p role="alert" className="err">{err}</p>}
        <button className="btn w-full" disabled={create.isPending}>{t('saveLesson')}</button>
      </form>
    </Modal>
  );
}

function StudentForm({ id }: { id?: string }) {
  const t = useT();
  const { lang, closeModal } = useUI();
  const existing = useStudent(id);
  const create = useCreateStudent();
  const update = useUpdateStudent();
  if (id && !existing.data) return <Modal title={t('editPlan')} onClose={closeModal}><p role="status">{t('loading')}</p></Modal>;
  return <StudentFormInner key={id ?? 'new'} id={id} init={existing.data?.student} {...{ t, lang, closeModal, create, update }} />;
}

function StudentFormInner({ id, init, t, lang, closeModal, create, update }: any) {
  const [name, setName] = useState<string>(init?.name ?? '');
  const [plan, setPlan] = useState<2 | 4>(init?.plan ?? 2);
  const [slots, setSlots] = useState<ScheduleSlot[]>(init?.schedule ?? [{ weekday: 2, start: '09:30', end: '10:30' }]);
  const [err, setErr] = useState('');
  const edit = (i: number, p: Partial<ScheduleSlot>) => setSlots((s) => s.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const opts = { onSuccess: closeModal, onError: (er: Error) => setErr(er.message) };
    if (id) update.mutate({ id, name, plan, schedule: slots }, opts); else create.mutate({ name, plan, schedule: slots }, opts);
  };
  return (
    <Modal title={id ? t('editPlan') : t('newStudent')} onClose={closeModal}>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="label" htmlFor="sname">{t('fullName')}</label><input id="sname" required minLength={2} className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><label className="label" htmlFor="plan">{t('plan')}</label>
          <select id="plan" className="input" value={plan} onChange={(e) => setPlan(Number(e.target.value) as 2 | 4)}>
            <option value={2}>{t('plan')} 2 {t('lessonsWord')} · R$ 120,00{t('perMonth')}</option>
            <option value={4}>{t('plan')} 4 {t('lessonsWord')} · R$ 180,00{t('perMonth')}</option>
          </select></div>
        <fieldset className="space-y-2">
          <legend className="label">{t('schedule')}</legend>
          {slots.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
              <div><label className="label" htmlFor={`wd${i}`}>{t('day')}</label>
                <select id={`wd${i}`} className="input px-1" value={s.weekday} onChange={(e) => edit(i, { weekday: Number(e.target.value) })}>
                  {DAYS.map((d) => <option key={d} value={d}>{dayName(d, lang)}</option>)}</select></div>
              <div><label className="label" htmlFor={`s${i}`}>{t('start')}</label><input id={`s${i}`} type="time" required className="input px-1" value={s.start} onChange={(e) => edit(i, { start: e.target.value })} /></div>
              <div><label className="label" htmlFor={`e${i}`}>{t('end')}</label><input id={`e${i}`} type="time" required className="input px-1" value={s.end} onChange={(e) => edit(i, { end: e.target.value })} /></div>
              <button type="button" className="btn-sec" aria-label={t('remove')} onClick={() => setSlots(slots.filter((_, j) => j !== i))}>✕</button>
            </div>
          ))}
          {slots.length < 7 && <button type="button" className="btn-sec" onClick={() => setSlots([...slots, { weekday: 1, start: '09:00', end: '10:00' }])}>+ {t('addSlot')}</button>}
        </fieldset>
        <p className="text-xs text-muted">{t('schedulePurpose')} <Link href="/privacy" className="underline">{t('privacy')}</Link>.</p>
        {err && <p role="alert" className="err">{err}</p>}
        <button className="btn w-full" disabled={create.isPending || update.isPending}>{t('save')}</button>
      </form>
    </Modal>
  );
}

export default function ModalHost() {
  const { modal } = useUI();
  if (modal.type === 'session') return <SessionForm />;
  if (modal.type === 'student') return <StudentForm />;
  if (modal.type === 'editStudent') return <StudentForm id={modal.id} />;
  return null;
}
