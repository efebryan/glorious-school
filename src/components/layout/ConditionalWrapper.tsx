"use client";

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/parent-dashboard') || pathname.startsWith('/staff-dashboard') || pathname.startsWith('/admin');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="flex-1 shrink-0 bg-slate-50">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}
