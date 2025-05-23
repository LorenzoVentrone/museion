'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/utils/AuthProvider';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TicketsLayout({ children }) {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/tickets');
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] text-[#2e2b28] font-sans">
      <header className="bg-[#fff7ed] border-b border-[#f0e6dc] sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#2e2b28]">
            Museion
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/tickets" className="hover:underline">
              Biglietti
            </Link>
            {token ? (
              <>
                <Link href="/tickets/orders" className="hover:underline">
                  I miei ordini
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-[#d24545]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/tickets/signin?from=tickets"
                className="hover:underline"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            <Menu />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 text-sm">
            <Link href="/tickets" className="block hover:underline">
              Biglietti
            </Link>
            {token ? (
              <>
                <Link href="/tickets/orders" className="block hover:underline">
                  I miei ordini
                </Link>
                <button
                  onClick={handleLogout}
                  className="block hover:underline text-[#d24545]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/tickets/signin?from=tickets"
                className="block hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}