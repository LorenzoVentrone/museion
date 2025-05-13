'use client'
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger/X Icon in alto a destra */}
      <button
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
      </button>

      {/* Fullscreen Dropdown Menu glassmorphism */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center
            bg-white/10 backdrop-blur-lg transition-all"
          onClick={() => setOpen(false)}
        >
          <nav
            className="flex flex-col gap-10 text-3xl font-light text-white w-full items-center"
            onClick={e => e.stopPropagation()}
          >
            <a href="/" className="hover:underline transition cursor-pointer">Home</a>
            <a href="/shop" className="hover:underline transition cursor-pointer">Shop</a>
            <a href="/about" className="hover:underline transition cursor-pointer">About</a>
          </nav>
        </div>
      )}
    </>
  );
}