'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/utils/AuthProvider';
import CartDropdown from '@/components/utils/CartDropdown';

import {
  FiPackage, FiTag, FiUser,
  FiLogIn, FiLogOut
} from 'react-icons/fi';

// IconButton component for the bottom bar icons
// Renders either a Link or a button depending on the props
const IconButton = ({ href, onClick, icon: Icon, active }) =>
  href ? (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 text-xs ${
        active ? 'text-black' : 'text-[#2e2b28]'
      }`}
    >
      <Icon size={22} />
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 text-xs text-[#2e2b28]"
    >
      <Icon size={22} />
    </button>
  );

// Layout component for the tickets shop section
export default function TicketsLayout({ children }) {
  const router     = useRouter();
  const pathname   = usePathname();
  // Check if the current page is the sign-in page
  const isAuthPage = pathname?.startsWith('/shop/tickets/signin');

  const { token, logout } = useAuth();

  // Logout handler: logs out and redirects to tickets page
  const handleLogout = () => {
    logout();
    router.push('/shop/tickets');
  };

  return (
    <div className={`min-h-screen font-sans text-[#2e2b28] ${isAuthPage ? 'md:bg-white' : 'bg-white'}`}>

      {/* ---------- HEADER ---------- */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="cinzel-decorative-bold text-2xl font-bold text-[#181818]">
            Museion
          </Link>

          {/* Desktop/tablet navbar */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link href="/shop/merch"   className="hover:scale-110 transition-transform duration-200">
              Merchandise
            </Link>
            <Link href="/shop/tickets" className="hover:scale-110 transition-transform duration-200">
              Tickets
            </Link>

            {token ? (
              <>
                <Link href="/shop/profile" className="hover:scale-110 transition-transform duration-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:scale-110 transition-transform duration-200 text-[#d24545]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/shop/tickets/signin?from=tickets"
                className="hover:scale-110 transition-transform duration-200"
              >
                Login
              </Link>
            )}

            {/* Desktop cart */}
            <CartDropdown />
          </nav>
        </div>
      </header>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className={`max-w-6xl mx-auto p-4 md:p-6 ${isAuthPage ? '' : 'bg-white'}`}>
        {children}
      </main>

      {/* ---------- MOBILE BOTTOM BAR ---------- */}
      {!isAuthPage && (
        <nav
          className="md:hidden fixed bottom-0 left-0 w-full flex justify-around
                     border-t border-gray-200 bg-white py-8 z-30"
        >
          <IconButton
            href="/shop/merch"
            icon={FiPackage}
            active={pathname === '/shop/merch'}
          />

          <IconButton
            href="/shop/tickets"
            icon={FiTag}
            active={pathname === '/shop/tickets'}
          />

          {token ? (
            <IconButton
              href="/shop/profile"
              icon={FiUser}
              active={pathname === '/shop/profile'}
            />
          ) : (
            <IconButton
              href="/shop/tickets/signin?from=tickets"
              icon={FiLogIn}
              active={false}
            />
          )}

          {token ? (
            <IconButton
              onClick={handleLogout}
              icon={FiLogOut}
            />
          ) : (
            // Cart (when not logged in) → still goes to checkout
            <div className="flex flex-col items-center gap-1 text-xs">
              <CartDropdown small />
            </div>
          )}

          {token && (
            // Cart when logged in
            <div className="flex flex-col items-center gap-1 text-xs">
              <CartDropdown small />
            </div>
          )}
        </nav>
      )}
    </div>
  );
}