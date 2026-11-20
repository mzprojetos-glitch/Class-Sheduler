import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Help() {
  return (
    <>
      <main id="main" className="mx-auto max-w-md space-y-3 p-6">
        <h1 className="text-xl font-bold">Ajuda e suporte</h1>
        <p>Dúvidas, solicitações de dados (LGPD) ou problemas técnicos: <a className="underline" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>.</p>
        <Link className="btn" href="/settings">Voltar</Link>
      </main>
      <Footer />
    </>
  );
}
