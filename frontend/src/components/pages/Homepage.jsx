'use client'
import { useState } from 'react';
import MainCanvas from '@/components/three/MainCanvas';
import Overlay from './Overlay'
import Navbar from '@/components/utils/Navbar';


export default function Homepage() {
    const [scrollValue, setScrollValue] = useState(0);
    const showOverlay = scrollValue < 0.05; // Overlay visibile solo all'inizio

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <MainCanvas setScrollValue={setScrollValue} />
            {showOverlay && <Overlay />}
            <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
        </div>
    );
}