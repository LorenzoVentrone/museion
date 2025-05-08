'use client';

import dynamic from 'next/dynamic';

const FloorScene = dynamic(() => import('./FloorScene'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <FloorScene />;
}