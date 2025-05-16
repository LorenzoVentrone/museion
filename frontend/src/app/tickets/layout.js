'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TicketsLayout({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 p-4">
        <nav className="container mx-auto flex justify-start items-center">
          {loggedIn ? (
            <Link href="/tickets/orders" className="text-white font-bold">
              I miei ordini
            </Link>
          ) : (
            <Link href="/tickets/login" className="text-white font-bold">
              Login
            </Link>
          )}
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}