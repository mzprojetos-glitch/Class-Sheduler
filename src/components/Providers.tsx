'use client';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useUI } from '@/store/ui';

function ThemeSync() {
  const { theme, lang } = useUI();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  }, [theme, lang]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } } }));
  return (
    <SessionProvider>
      <QueryClientProvider client={qc}><ThemeSync />{children}</QueryClientProvider>
    </SessionProvider>
  );
}
