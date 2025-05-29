'use client'
import { useState, useEffect } from 'react';
import MainCanvas from '@/components/three/MainCanvas';
import { motion, AnimatePresence } from "framer-motion";
import { slideAnimation } from "@/components/config/motion";
import Link from 'next/link';
import BetterUIMsg from '@/components/ui/BetterUIMsg';


// Homepage component: renders the landing page with animated overlays and the 3D canvas
export default function Homepage() {
    const [showOverlay, setShowOverlay] = useState(true);
    const [showOutro, setShowOutro] = useState(false);

    // Add or remove a class on scroll for styling purposes
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
            {/* Main 3D canvas, receives overlay state setters as props */}
            <BetterUIMsg />
            <MainCanvas setShowOverlay={setShowOverlay} setShowOutro={setShowOutro}/>
            <AnimatePresence>
                {/* Intro overlay */}
                {showOverlay && (
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 flex flex-col items-center justify-center z-20 bg-[#181818]/[0.9] backdrop-blur-sm pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="pointer-events-auto cinzel-decorative-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.08em] sm:tracking-[0.15em] md:tracking-[0.25em] text-center drop-shadow-lg select-none flex flex-wrap justify-center px-2"
                            {...slideAnimation("right")}
                        >
                            MUSEION
                        </motion.h1>
                        <motion.p
                            className="cinzel-decorative-regular text-[#e0e0e0] text-base sm:text-lg md:text-xl lg:text-2xl mt-4 mb-8 text-center italic font-light max-w-xs sm:max-w-md md:max-w-xl select-none mx-auto"
                            {...slideAnimation("left")}
                        >
                            Immersive. Interactive. Infinite.
                        </motion.p>
                        <motion.div
                            className="flex flex-col items-center gap-2"
                            {...slideAnimation("up")}
                        >
                            <span className="cinzel-decorative-black text-[#aaa] text-xs sm:text-sm md:text-base mb-2 tracking-wide uppercase select-none bounce-text text-center">
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
                    </motion.div>
                )}
                {/* Outro overlay */}
                {showOutro && (
                    <motion.div
                        key="outro"
                        className="fixed inset-0 flex flex-col items-center justify-center z-30 bg-[#181818]/[0.9] backdrop-blur-sm pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="pointer-events-auto cinzel-decorative-bold text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center drop-shadow-lg select-none"
                            {...slideAnimation("right")}
                        >
                            Thank you for your time!
                        </motion.h1>
                        <motion.p
                            className="cinzel-decorative-regular text-[#e0e0e0] text-base sm:text-xl md:text-2xl lg:text-3xl mt-6 mb-10 text-center italic font-light max-w-xs sm:max-w-md md:max-w-xl select-none mx-auto"
                            {...slideAnimation("left")}
                        >
                            Book now your real experience
                        </motion.p>
                        <motion.div
                            className="flex flex-col items-center gap-2"
                            {...slideAnimation("up")}
                        >
                            <Link
                                href="/shop/tickets"
                                className="custom-btn-book-now"
                            >
                                Book Now
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}