import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import BottomNav from '@/components/BottomNav';
import ModalHost from '@/components/ModalHost';
import Footer from '@/components/Footer';

/** Proteção em camadas: middleware + este layout (Server Component) + verificação de sessão nas APIs. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!(await getServerSession(authOptions))) redirect('/login');
  return (
    <>
      <main id="main" className="mx-auto max-w-md space-y-4 p-4 pb-24">{children}<Footer /></main>
      <BottomNav />
      <ModalHost />
    </>
  );
}
