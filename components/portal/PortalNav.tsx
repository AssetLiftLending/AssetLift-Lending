'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Users, LogOut, ChevronRight, Plus, TrendingUp } from 'lucide-react';
import Logo from '@/components/Logo';

const NAV = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { label: 'Deals', href: '/portal/deals', icon: FileText },
  { label: 'Clients', href: '/portal/clients', icon: Users },
  { label: 'SEO', href: '/portal/seo', icon: TrendingUp },
];

export default function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/portal/api/logout', { method: 'POST' });
    router.push('/portal');
  };

  return (
    <aside className="w-56 shrink-0 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="h-16 flex items-center px-5 border-b border-zinc-800">
        <Logo size={32} surface="dark" />
        <span className="ml-2 text-xs font-semibold text-zinc-400 uppercase tracking-widest">Broker Portal</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <Link
          href="/portal/deals/new"
          className="w-full flex items-center justify-center gap-2 bg-primary text-zinc-900 font-bold text-sm px-3 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Deal
        </Link>
      </div>

      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
