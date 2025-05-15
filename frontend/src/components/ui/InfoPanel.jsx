'use client'

import { useEffect } from 'react';
import { useInfoPanel } from '../../context/InfoPanelContext';

export default function InfoPanel() {
  const { panelInfo, closePanel } = useInfoPanel();
  const { isOpen, title, content } = panelInfo;

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closePanel]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[400px] bg-white/98 shadow-lg 
        transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ zIndex: 1000 }}
    >
      <div className="p-6">
        <button 
          onClick={closePanel}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="prose">
          {content}
        </div>
      </div>
    </div>
  );
}
