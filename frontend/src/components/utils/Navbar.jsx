'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from '../config/motion';

const navbarVariants = {
  hidden: { opacity: 0, x: -1500 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.4, 0.2, 0.2, 1] } }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        /* initial="hidden"
        animate="visible"
        variants={navbarVariants} */
        {...slideAnimation("left")}
        className="fixed top-6 right-6 z-50 flex flex-col gap-1.5 w-10 h-10 items-center justify-center bg-transparent border-none outline-none cursor-pointer"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`block w-8 h-0.5 bg-white rounded transition-all duration-300
            ${open ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`block w-8 h-0.5 bg-white rounded transition-all duration-300
            ${open ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-8 h-0.5 bg-white rounded transition-all duration-300
            ${open ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </motion.button>

      {/* Fullscreen Dropdown Menu glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center
              bg-white/10 backdrop-blur-lg"
            onClick={() => setOpen(false)}
          >
            <nav
              /* keeping the same text style as you see in the Homepage ? cinzel-decorative-regular */
              className="flex flex-col gap-10 text-3xl font-light text-white w-full items-center"
              onClick={e => e.stopPropagation()}
            >
              {["Home", "Shop", "About"].map((label, idx) => (
                <a
                  key={label}
                  href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className="group cursor-pointer transition"
                  style={{ display: "inline-block" }}
                >
                  {label.split("").map((char, i) => (
                    <span
                      key={i}
                      className="inline-block transition-transform duration-200 group-hover:-translate-y-1"
                      style={{ transitionDelay: `${i * 30}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}