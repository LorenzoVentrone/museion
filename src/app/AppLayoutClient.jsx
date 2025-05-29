/*********************    READ   **************************/
// This workaround is needed because 'use client' is required for framer-motion,
// but 'use client' and the 'metadata' export cannot be used together in Next.js.
// So, this <AppLayoutClient> component is used inside app/layout.js.
/***********************************************************/
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';
import { InfoPanelProvider } from '../context/InfoPanelContext';
import InfoPanel from '../components/ui/InfoPanel';
import { AuthProvider } from '@/components/utils/AuthProvider';
import Navbar from '@/components/utils/Navbar';
import './globals.css';

// Animation variants for different routes/pages
const pageVariants = {
  // Add more variants for other pages as needed.
  // Important: set duration: 0 on exit for smooth transitions,
  // otherwise both the exit transition of the current page and
  // the initial transition of the next page will run, causing a glitch.
  '/': {
    initial: { x: -1000, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } },
    exit: { x: -1000, opacity: 0, transition: { duration: 0 } },
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

  // Show the Navbar only if not on /shop/merch or /shop/tickets pages
  const showNavbar = !(
    pathname?.startsWith('/shop/merch') ||
    pathname?.startsWith('/shop/tickets')
  );

  // Select animation variants for the current route
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