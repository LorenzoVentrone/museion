'use client'

import {
  useEffect,
  useState,
} from 'react';

import { useInfoPanel } from '../../context/InfoPanelContext';

/* ------------------------------ PANEL UI --------------------------------- */

export default function InfoPanel() {
  const { panelInfo, closePanel } = useInfoPanel();
  const { isOpen, title, content, meshRef } = panelInfo;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [slideClass,   setSlideClass]   = useState('translate-x-full');
  const [persistedContent, setPersistedContent] = useState({ title, content });

  /* open / close transitions */
  useEffect(() => {
    if (isOpen) {
      setPersistedContent({ title, content });
      setShouldRender(true);
      setSlideClass('translate-x-full');
      requestAnimationFrame(() => setSlideClass('translate-x-0'));
    } else {
      setSlideClass('translate-x-full');
      const t = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen, title, content]);

  /* Esc key to close */
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && closePanel();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [closePanel]);

  /* statue depth tweaks (unchanged) */
  useEffect(() => {
    if (meshRef?.current) {
      meshRef.current.renderOrder = isOpen ? 1000 : 0;
      if (meshRef.current.material) meshRef.current.material.depthTest = !isOpen;
    }
  }, [isOpen, meshRef]);

  /* --------------------------------------------------------------- */
  if (!shouldRender) return null;

  return (
    <div className="fixed inset-y-0 right-0 flex justify-end items-center pointer-events-none"
         style={{ zIndex: 300 }}>
      {/* Combined panel with backdrop */}
      <div 
        className={`h-full transform transition-all duration-500 overflow-hidden ease-out pointer-events-auto
                   ${isOpen ? 'w-screen md:w-[480px]' : 'w-0'}`}
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.7))' }}
      >
        {/* Content container - now vertically centered */}
        <div 
          className={`absolute top-1/2 right-0 md:right-10 w-full md:w-[400px] bg-white/90 rounded-xl shadow-2xl
                     transform -translate-y-1/2 transition-all duration-500 ease-out 
                     ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
          <div className="p-6 relative">
            <button
              onClick={closePanel}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100/70 rounded-full transition-colors"
            >
              ✕
            </button>
            <h2 className=" text-black font-avant text-2xl font-bold mb-4">{persistedContent.title}</h2>
            <div className="text-black prose font-avant">{persistedContent.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}