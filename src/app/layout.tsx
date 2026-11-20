import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = { title: 'Class Scheduler', description: 'Organize suas aulas particulares' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-2">Pular para o conteúdo</a>
        <Providers>{children}<CookieBanner /></Providers>
      </body>
    </html>
  );
}
