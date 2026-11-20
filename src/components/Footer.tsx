import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-md px-4 py-6 text-center text-xs text-muted">
      <p>
        {process.env.NEXT_PUBLIC_CONTROLLER_NAME} {process.env.NEXT_PUBLIC_CONTROLLER_DOC ? `· ${process.env.NEXT_PUBLIC_CONTROLLER_DOC}` : ''} ·{' '}
        <a className="underline" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</a>
      </p>
      <p className="mt-1">
        <Link className="underline" href="/privacy">Política de Privacidade</Link> · <Link className="underline" href="/terms">Termos de Serviço</Link>
      </p>
    </footer>
  );
}
