'use client';
import { useUI } from '@/store/ui';

const pt = {
  appName: 'Class Scheduler', tagline: 'Organize suas aulas particulares',
  showPassword: 'Mostrar senha', hidePassword: 'Ocultar senha',
  signIn: 'Entrar', signUp: 'Cadastrar', email: 'Email', password: 'Senha', confirmPassword: 'Confirmar senha', fullName: 'Nome completo',
  invalidLogin: 'Email ou senha inválidos', forgot: 'Esqueci minha senha', google: 'Entrar com Google', apple: 'Entrar com Apple',
  acceptPre: 'Li e aceito os', and: 'e a', terms: 'Termos de Serviço', privacy: 'Política de Privacidade',
  purposeSignup: 'Usamos nome e email apenas para criar e proteger sua conta. Veja a', passwordsDiff: 'As senhas não conferem', passMin: 'A senha deve ter ao menos 8 caracteres',
  hello: 'Olá, instrutor', taught: 'Ministradas', remaining: 'Restantes', absences: 'Faltas', todayLessons: 'Aulas de hoje', noLessons: 'Nenhuma aula neste dia.',
  lessonType: 'Aula particular', markTaught: 'Ministrada', markAbsent: 'Falta', reschedule: 'Remarcar',
  agendada: 'Agendada', ministrada: 'Ministrada', falta: 'Falta', remarcada: 'Remarcada',
  schedule: 'Agenda', newLesson: 'Nova aula', saveLesson: 'Salvar aula', student: 'Aluno', day: 'Dia da semana', start: 'Início', end: 'Fim', notes: 'Observações (opcional)', selectStudent: 'Selecione um aluno',
  students: 'Alunos', activeStudents: 'alunos ativos', search: 'Buscar alunos', newStudent: 'Novo aluno', editPlan: 'Editar plano e horários', plan: 'Plano', lessonsWord: 'aulas', perMonth: '/mês',
  registerPayment: 'Registrar pagamento', undoPayment: 'Marcar como pendente', paid: 'Pago', pending: 'Pendente', monthlyFee: 'Mensalidade do mês', nextLessons: 'Próximas aulas', noStudents: 'Nenhum aluno encontrado.',
  addSlot: 'Adicionar horário', remove: 'Remover', schedulePurpose: 'Coletamos somente nome, plano e horários do aluno para organizar sua agenda. Veja a',
  finances: 'Finanças', totalToReceive: 'Total a receber no mês', received: 'Recebido', pendingLbl: 'Pendente', planLegend: '2 aulas: R$ 120 · 4 aulas: R$ 180',
  home: 'Início', profile: 'Perfil', instructor: 'Instrutor de aulas particulares', account: 'Dados da conta', accountType: 'Tipo de conta', editProfile: 'Editar perfil', settings: 'Configurações', logout: 'Sair',
  appearance: 'Aparência', light: 'Claro', dark: 'Escuro', notifications: 'Notificações', reminders: 'Lembretes de aulas', scheduleChanges: 'Mudanças na agenda', language: 'Idioma', portuguese: 'Português', english: 'Inglês',
  changePassword: 'Alterar senha', currentPassword: 'Senha atual', newPassword: 'Nova senha', help: 'Ajuda e suporte', deleteAccount: 'Excluir conta e dados', deleteConfirm: 'Isso apaga permanentemente sua conta e todos os dados. Continuar?',
  save: 'Salvar', cancel: 'Cancelar', close: 'Fechar', loading: 'Carregando…', error: 'Algo deu errado.', retry: 'Tentar novamente', saved: 'Salvo com sucesso.',
  cookieTitle: 'Cookies e privacidade', cookieText: 'Usamos cookies essenciais para o funcionamento. Cookies de análise só são ativados com seu consentimento.', accept: 'Aceitar', reject: 'Recusar', customize: 'Personalizar', analytics: 'Cookies de análise (opcional)', essential: 'Essenciais (sempre ativos)',
  footerController: 'Responsável pelo tratamento de dados', prevWeek: 'Semana anterior', nextWeek: 'Próxima semana', prevMonth: 'Mês anterior', nextMonth: 'Próximo mês',
};
const en: typeof pt = {
  appName: 'Class Scheduler', tagline: 'Organize your private lessons',
  showPassword: 'Show password', hidePassword: 'Hide password',
  signIn: 'Sign in', signUp: 'Sign up', email: 'Email', password: 'Password', confirmPassword: 'Confirm password', fullName: 'Full name',
  invalidLogin: 'Invalid email or password', forgot: 'Forgot my password', google: 'Sign in with Google', apple: 'Sign in with Apple',
  acceptPre: 'I have read and accept the', and: 'and the', terms: 'Terms of Service', privacy: 'Privacy Policy',
  purposeSignup: 'We use your name and email only to create and protect your account. See the', passwordsDiff: 'Passwords do not match', passMin: 'Password must have at least 8 characters',
  hello: 'Hello, instructor', taught: 'Taught', remaining: 'Remaining', absences: 'Absences', todayLessons: "Today's lessons", noLessons: 'No lessons on this day.',
  lessonType: 'Private lesson', markTaught: 'Taught', markAbsent: 'Absent', reschedule: 'Reschedule',
  agendada: 'Scheduled', ministrada: 'Taught', falta: 'Absent', remarcada: 'Rescheduled',
  schedule: 'Schedule', newLesson: 'New lesson', saveLesson: 'Save lesson', student: 'Student', day: 'Weekday', start: 'Start', end: 'End', notes: 'Notes (optional)', selectStudent: 'Select a student',
  students: 'Students', activeStudents: 'active students', search: 'Search students', newStudent: 'New student', editPlan: 'Edit plan and schedule', plan: 'Plan', lessonsWord: 'lessons', perMonth: '/month',
  registerPayment: 'Register payment', undoPayment: 'Mark as pending', paid: 'Paid', pending: 'Pending', monthlyFee: "This month's fee", nextLessons: 'Next lessons', noStudents: 'No students found.',
  addSlot: 'Add time slot', remove: 'Remove', schedulePurpose: "We only collect the student's name, plan and schedule to organize your agenda. See the",
  finances: 'Finances', totalToReceive: 'Total to receive this month', received: 'Received', pendingLbl: 'Pending', planLegend: '2 lessons: R$ 120 · 4 lessons: R$ 180',
  home: 'Home', profile: 'Profile', instructor: 'Private lessons instructor', account: 'Account details', accountType: 'Account type', editProfile: 'Edit profile', settings: 'Settings', logout: 'Sign out',
  appearance: 'Appearance', light: 'Light', dark: 'Dark', notifications: 'Notifications', reminders: 'Lesson reminders', scheduleChanges: 'Schedule changes', language: 'Language', portuguese: 'Portuguese', english: 'English',
  changePassword: 'Change password', currentPassword: 'Current password', newPassword: 'New password', help: 'Help and support', deleteAccount: 'Delete account and data', deleteConfirm: 'This permanently deletes your account and all data. Continue?',
  save: 'Save', cancel: 'Cancel', close: 'Close', loading: 'Loading…', error: 'Something went wrong.', retry: 'Try again', saved: 'Saved successfully.',
  cookieTitle: 'Cookies and privacy', cookieText: 'We use essential cookies to run the app. Analytics cookies are only enabled with your consent.', accept: 'Accept', reject: 'Reject', customize: 'Customize', analytics: 'Analytics cookies (optional)', essential: 'Essential (always on)',
  footerController: 'Data controller', prevWeek: 'Previous week', nextWeek: 'Next week', prevMonth: 'Previous month', nextMonth: 'Next month',
};
export type Key = keyof typeof pt;
export const dict = { pt, en };
export function useT() {
  const lang = useUI((s) => s.lang);
  return (k: Key) => dict[lang][k];
}
