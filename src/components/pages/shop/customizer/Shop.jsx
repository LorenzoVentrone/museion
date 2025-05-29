'use client';

import './style.css';
import { CustomizerCanvas } from './Canvas';
import { Customizer } from './Customizer';

export default function Shop() {
  return (
    <>
      <CustomizerCanvas />
      <Customizer />
    </>
  );
}