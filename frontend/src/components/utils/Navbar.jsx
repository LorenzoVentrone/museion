import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from '../config/motion';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // White on homepage, dark on other pages
  const barColor = pathname === "/" ? "bg-white" : "bg-[#181818]";
  const textColor = pathname === "/" ? "text-white" : "text-[#181818]";
  const menuBg = "bg-white/70"; // dropdown always readable

  return (
    <>
      <motion.button
        {...slideAnimation("left")}
        className="fixed top-6 right-6 z-50 flex flex-col gap-1.5 w-10 h-10 items-center justify-center bg-transparent border-none outline-none cursor-pointer"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <span className={`block w-8 h-0.5 ${barColor} rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-8 h-0.5 ${barColor} rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-8 h-0.5 ${barColor} rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${menuBg} backdrop-blur-lg`}
            onClick={() => setOpen(false)}
          >
            <nav
              className={`flex flex-col gap-10 text-3xl font-light ${textColor} w-full items-center`}
              onClick={e => e.stopPropagation()}
            >
              {["Home", "Shop"].map((label, idx) => (
                <Link
                  key={label}
                  href={label === "Home" ? "/" : "/shop/tickets"}
                  className="group cursor-pointer transition"
                  style={{ display: "inline-block" }}
                  onClick={() => setOpen(false)}
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
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}