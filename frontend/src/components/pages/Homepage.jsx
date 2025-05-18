'use client'
import { useState, useEffect } from 'react';
import MainCanvas from '@/components/three/MainCanvas';
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "@/components/config/motion";


// Variants for the animations, right now I'm using the slideAnimation function, but maybe those could be usefull
const fromRightVariant = {
  hidden: { opacity: 0, x: 1000 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

const fromLeftVariant = {
  hidden: { opacity: 0, x: -1000 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

const fromBottomVariant = {
  hidden: { opacity: 0, y: 1000 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.4, 0.2, 0.2, 1] } }
};

export default function Homepage() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-screen h-screen">
      <MainCanvas setShowOverlay={setShowOverlay} />
      <AnimatePresence>
      <div
        className={`
          fixed inset-0 flex flex-col items-center justify-center z-20
          bg-[#181818]/[0.85] backdrop-blur-sm
          transition-opacity duration-700
          pointer-events-none
          ${showOverlay ? 'opacity-100' : 'opacity-0'}
        `}
      >
        
        <motion.h1
          className="cinzel-decorative-bold text-white text-6xl md:text-8xl font-extrabold tracking-[0.25em] text-center drop-shadow-lg select-none"
          
            /* variants={fromRightVariant}
            initial="hidden"
            animate="visible"
            exit="hidden" */
          {...slideAnimation("right")}
        >
          MUSEION
        </motion.h1>
        <motion.p
          className="cinzel-decorative-regular text-[#e0e0e0] text-2xl md:text-3xl mt-8 mb-14 text-center italic font-light max-w-xl select-none"
          
            /* variants={fromLeftVariant}
            initial="hidden"
            animate="visible"
            exit="hidden" */
          {...slideAnimation("left")}
        >
          {/* Where the arts become real */}
          Immersive. Interactive. Infinite.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-2"
          /* variants={fromBottomVariant}
          initial="hidden"
          animate="visible"
          exit="hidden" */
          {...slideAnimation("up")}
        >
          <span
            className="cinzel-decorative-black text-[#aaa] text-base mb-2 tracking-wide uppercase select-none bounce-text"
          >
            Scroll to join the tour
          </span>
          <svg
            width="36"
            height="36"
            fill="none"
            stroke="#aaa"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="bounce-arrow"
          >
            <polyline points="10,16 18,26 26,16" />
          </svg>
        </motion.div>
        </div>
      </AnimatePresence>
      </div>
  );
}