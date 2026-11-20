'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT, type Key } from '@/lib/i18n';

const ITEMS: { href: string; key: Key; icon: string }[] = [
  { href: '/home', key: 'home', icon: '🏠' }, { href: '/schedule', key: 'schedule', icon: '📅' },
  { href: '/students', key: 'students', icon: '👥' }, { href: '/finances', key: 'finances', icon: '💰' }, { href: '/profile', key: 'profile', icon: '👤' },
];

export default function BottomNav() {
  const path = usePathname();
  const t = useT();
  return (
    <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card">
      <ul className="mx-auto flex max-w-md">
        {ITEMS.map((i) => {
          const active = path === i.href || path.startsWith(i.href + '/') || (i.href === '/profile' && path === '/settings');
          return (
            <li key={i.href} className="flex-1">
              <Link href={i.href} aria-current={active ? 'page' : undefined}
                className={`flex min-h-[56px] flex-col items-center justify-center text-xs font-semibold ${active ? 'text-primary underline underline-offset-4' : 'text-muted'}`}>
                <span aria-hidden className="text-lg">{i.icon}</span>{t(i.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
