'use client'

import { useState } from 'react';
import MainCanvas from '@/components/three/MainCanvas';

export default function Home() {
  const [scrollValue, setScrollValue] = useState(0);

  // opzionale: vedere il valore in console
  // console.log('scrollValue:', scrollValue);

  return <MainCanvas setScrollValue={setScrollValue} />;
}