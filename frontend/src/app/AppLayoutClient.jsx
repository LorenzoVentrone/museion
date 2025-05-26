/*********************    READ   **************************/
// This is needed since i need to use 'use client' for framer-motion, but since 'use client' and const metadata 
// can't be used together, i need to use this workaround, and using this <ApplayoutClient> component inside 
// app/layout.js
/***********************************************************/
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { InfoPanelProvider } from '../context/InfoPanelContext';
import InfoPanel from '../components/ui/InfoPanel';
import { AuthProvider } from '@/components/utils/AuthProvider';
import Navbar from '@/components/utils/Navbar';
import './globals.css';


const pageVariants = {
  /* ----------------------------------------------------------------- */
  /* Da aggiungerne altre per le altre pagine, la cosa importante è che mettete duration: 0 su exit senno nnon è fluida
  la transizione dato che verrà eseguita si ala transizione di exit della pagina corrente sia la transizione 
  initial della pagina in cui verrete reinderizzati */
  /* ----------------------------------------------------------------- */
  '/': {
    initial: { x: -1000, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } },
    exit: { x: -1000, opacity: 0, transition: { duration: 0 } }, // Nessuna animazione su exit
  },
  '/shop/tickets': {
    initial: { x: -1000, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } },
    exit: { x: -1000, opacity: 0, transition: { duration: 0 } },
  },
  '/shop/merch': {
    initial: { y: 1000, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } },
    exit: { x: -1000, opacity: 0, transition: { duration: 0 } },
  },
  '/shop/tickets/signin': {
    initial: { y: -1000, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } },
    exit: { x: -1000, opacity: 0, transition: { duration: 0 } },
  },
};

export default function AppLayoutClient({ children }) {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const showNavbar = !(
    pathname?.startsWith('/shop/merch') ||
    pathname?.startsWith('/shop/tickets')
  );

  const variants = pageVariants[pathname] || pageVariants['/'];

  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <AuthProvider>
      <InfoPanelProvider>
        {showNavbar && <Navbar />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="min-h-screen">{children}</div>
          </motion.div>
        </AnimatePresence>
        <InfoPanel />
      </InfoPanelProvider>
    </AuthProvider>
  );
}