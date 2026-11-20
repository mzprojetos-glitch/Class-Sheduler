import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = { title: 'Termos de Serviço – Class Scheduler' };
export default function Terms() {
  return (
    <>
      <main id="main" className="mx-auto max-w-2xl space-y-4 p-6 leading-relaxed">
        <h1 className="text-2xl font-bold">Termos de Serviço</h1>
        <p className="text-sm text-muted">Modelo base. Revise com um profissional jurídico antes de publicar.</p>
        <h2 className="text-lg font-semibold">1. O serviço</h2>
        <p>O Class Scheduler ajuda instrutores a organizar aulas particulares, alunos e cobranças mensais. Não processa pagamentos: o registro financeiro é apenas um controle interno.</p>
        <h2 className="text-lg font-semibold">2. Conta</h2>
        <p>Você é responsável pelas informações cadastradas e pela segurança da sua senha, e por obter base legal para tratar dados de seus alunos.</p>
        <h2 className="text-lg font-semibold">3. Uso adequado</h2>
        <p>É proibido usar o serviço para fins ilícitos ou tentar acessar dados de outros usuários.</p>
        <h2 className="text-lg font-semibold">4. Cancelamento e reembolso</h2>
        <p>Você pode excluir sua conta a qualquer momento em Configurações. Se houver cobrança pelo serviço, a política de reembolso será informada antes da contratação.</p>
        <h2 className="text-lg font-semibold">5. Limitação de responsabilidade</h2>
        <p>O serviço é oferecido “como está”, sem garantia de disponibilidade ininterrupta.</p>
        <Link className="btn" href="/login">Voltar</Link>
      </main>
      <Footer />
    </>
  );
}
