'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Chiudi menu con ESC
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <>
      {/* Hamburger Menu */}
      {!open &&(
        <button
          onClick={() => setOpen(!open)}
          className="z-50 p-3 text-[var(--color-charcoal)] fixed top-4 left-4"
          aria-label="Toggle menu"
        >
          {<Menu size={28} />}
        </button>
      )}

      {/* Overlay e menu mobile/slide */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-30"
            />
            <motion.div
              key="menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-[var(--color-sand)] text-[var(--color-charcoal)] shadow-lg p-6 flex flex-col gap-6 z-40"
            >
              <h2 className="text-2xl mt-6 font-[var(--font-heading)]">Museion</h2>
              <nav className="flex flex-col gap-4 text-lg font-[var(--font-body)] ">
                <a onClick={() => setOpen(false)} className = "hover:underline" href="#home">Home</a>
                <a onClick={() => setOpen(false)} className = "hover:underline"  href="#esposizioni">Esposizioni</a>
                <a onClick={() => setOpen(false)} className = "hover:underline"  href="#visita">Visita</a>
                <a onClick={() => setOpen(false)} className = "hover:underline"  href="#biglietti">Biglietti</a>
                <a onClick={() => setOpen(false)} className = "hover:underline"  href="#contatti">Contatti</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}