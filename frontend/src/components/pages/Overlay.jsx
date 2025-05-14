import React from 'react';

// TODO:
// HO un problemone con la renderizzazione, è troppo lenta e laggosa, questo un po risolve ma nonè definitivo
const Overlay = React.memo(() => (
  <div
    className={`
      fixed inset-0 flex flex-col items-center justify-center z-20
      bg-[#181818]/[0.85] backdrop-blur-sm transition-opacity duration-1000
      pointer-events-none
    `}
  >
    <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-[0.25em] text-center drop-shadow-lg select-none">
      MUSEION
    </h1>
    <p className="text-[#e0e0e0] text-2xl md:text-3xl mt-8 mb-14 text-center italic font-light max-w-xl select-none">
      Where the arts become real
    </p>
    <div className="flex flex-col items-center gap-2 animate-bounce-slow">
      <span className="text-[#aaa] text-base mb-2 tracking-wide uppercase select-none">
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
        className="animate-bounce"
      >
        <polyline points="10,16 18,26 26,16" />
      </svg>
    </div>
  </div>
));

export default Overlay;