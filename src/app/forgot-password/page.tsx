import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Forgot() {
  return (
    <>
      <main id="main" className="mx-auto max-w-md space-y-3 p-6">
        <h1 className="text-xl font-bold">Esqueci minha senha</h1>
        <p>Fluxo de recuperação preparado (UI). Para ativar, integre um provedor de e-mail (ex.: Resend) e gere um token de redefinição em <code>/api/forgot-password</code>.</p>
        <p>Enquanto isso, solicite ajuda em <a className="underline" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>.</p>
        <Link className="btn" href="/login">Voltar ao login</Link>
      </main>
      <Footer />
    </>
  );
}
