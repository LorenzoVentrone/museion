'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/utils/AuthProvider';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import CartDropdown from '@/components/utils/CartDropdown';

export default function TicketsLayout({ children }) {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/shop/tickets/signin');

  const handleLogout = () => {
    logout();
    router.push('/shop/tickets');
  };

  return (
    <div
      className={`
    min-h-screen font-sans text-[#2e2b28]
    ${isAuthPage ? 'md:bg-white' : 'bg-white'}
  `}
    >
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="cinzel-decorative-bold text-2xl font-bold text-[#181818]">
            Museion
          </Link>
          {/* Hamburger button */}
          <button
            className="sm:hidden p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
          {/* Navbar links */}
          <nav
            className={`
              flex-col sm:flex-row items-center gap-4 sm:gap-8  w-full sm:w-auto
              absolute sm:static top-16 left-0 right-0 bg-white sm:bg-transparent shadow-md sm:shadow-none
              transition-all duration-300
              ${menuOpen ? 'flex' : 'hidden'} sm:flex
              z-40
            `}
          >
            <Link
              href="/shop/merch"
              className="hover:scale-110 transition-transform duration-200 text-base sm:text-lg px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Merchandise
            </Link>
            <Link
              href="/shop/tickets"
              className="hover:scale-110 transition-transform duration-200 text-base sm:text-lg px-4 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Tickets
            </Link>
            {token ? (
              <>
                <Link
                  href="/shop/tickets/orders"
                  className="hover:scale-110 transition-transform duration-200 text-base sm:text-lg px-4 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  I miei ordini
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:scale-110 transition-transform duration-200 text-[#d24545] bg-transparent border-none cursor-pointer text-base sm:text-lg px-4 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/shop/tickets/signin?from=tickets"
                className="hover:scale-110 transition-transform duration-200 text-base sm:text-lg px-4 py-2"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
            {/* Carrello riutilizzabile */}
            <CartDropdown />
          </nav>
        </div>
      </header>

      <main className={`max-w-6xl mx-auto p-4 md:p-6 ${isAuthPage ? '' : 'bg-white'}`}>
        {children}
      </main>
    </div>
  );
}