import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'Política de Privacidade – Class Scheduler' };
export default function Privacy() {
  const c = process.env.NEXT_PUBLIC_CONTROLLER_NAME, mail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <>
      <main id="main" className="mx-auto max-w-2xl space-y-4 p-6 leading-relaxed">
        <h1 className="text-2xl font-bold">Política de Privacidade</h1>
        <p className="text-sm text-muted">Modelo base alinhado à LGPD (Lei 13.709/2018). Revise com um profissional jurídico antes de publicar.</p>
        <h2 className="text-lg font-semibold">1. Controlador</h2>
        <p>{c} — contato: <a className="underline" href={`mailto:${mail}`}>{mail}</a>.</p>
        <h2 className="text-lg font-semibold">2. Dados coletados e finalidade</h2>
        <ul className="list-disc pl-5">
          <li>Conta do instrutor: nome e email — criar e proteger o acesso.</li>
          <li>Alunos: nome, plano e horários — organizar a agenda e o controle financeiro.</li>
          <li>Pagamentos: valor do plano e status (pago/pendente) — controle mensal.</li>
        </ul>
        <p>Não coletamos dados além do estritamente necessário. Senhas são armazenadas com hash (bcrypt).</p>
        <h2 className="text-lg font-semibold">3. Cookies</h2>
        <p>Usamos cookies essenciais (sessão). Cookies de análise/tracking só são ativados após seu consentimento, que pode ser alterado a qualquer momento.</p>
        <h2 className="text-lg font-semibold">4. Seus direitos</h2>
        <p>Você pode acessar, corrigir, exportar e excluir seus dados. A exclusão de conta e dados está disponível em Configurações; demais pedidos: {mail}.</p>
        <h2 className="text-lg font-semibold">5. Compartilhamento e retenção</h2>
        <p>Não vendemos dados. Operadores de infraestrutura (hospedagem e banco de dados) tratam dados sob nossas instruções. Os dados são mantidos enquanto a conta existir.</p>
        <Link className="btn" href="/login">Voltar</Link>
      </main>
      <Footer />
    </>
  );
}
