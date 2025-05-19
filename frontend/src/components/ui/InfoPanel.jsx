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
  const [animationState, setAnimationState] = useState(isOpen ? 'visible' : 'hidden');
  const [persistedContent, setPersistedContent] = useState({ title, content });

  /* open / close transitions */
  useEffect(() => {
    if (isOpen) {
      // First make the component visible but offscreen
      setPersistedContent({ title, content });
      setShouldRender(true);
      setAnimationState('hidden');
      
      // Then trigger the slide-in animation after a frame
      const animationFrame = requestAnimationFrame(() => {
        setAnimationState('visible');
      });
      
      return () => cancelAnimationFrame(animationFrame);
    } else {
      // Start the exit animation
      setAnimationState('hidden');
      
      // Remove from DOM after animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the duration-500 in the CSS
      
      return () => clearTimeout(timer);
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
        className={`h-full transform transition-all duration-500 ease-out pointer-events-auto
                   ${animationState === 'visible' ? 'w-full md:w-[480px]' : 'w-0'}`}
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0.7))' }}
      >
        {/* Content container - mobile fullscreen, desktop centered */}
        <div 
          className={`absolute top-0 md:top-1/2 right-0 md:right-10 
                     w-full md:w-[400px] h-full md:h-auto max-h-full md:max-h-[80vh]
                     bg-white/90 rounded-none md:rounded-xl shadow-2xl
                     transform md:-translate-y-1/2 transition-all duration-500 ease-out
                     ${animationState === 'visible' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
          <div className="p-6 relative h-full md:h-auto overflow-y-auto">
            <button
              onClick={closePanel}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100/70 rounded-full transition-colors"
            >
              ✕
            </button>
            <h2 className="font-avant text-2xl font-bold mb-4 pr-10">{persistedContent.title}</h2>
            <div className="prose font-avant">{persistedContent.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}