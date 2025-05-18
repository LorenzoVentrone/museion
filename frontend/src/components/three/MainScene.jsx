'use client';

import { useState } from 'react';
import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import { CenterModel } from '../models/CenterModel';
import Dome from '../floorplan/Dome'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import ScrollContainer from '../controls/ScrollContainer';


export default function MainScene() {
  // Allora cosi non lagga, ma a me serve più in alto nel codice lo scrollValue, cosi da poterlo usare dentro homepage
  const [scrollValue, setScrollValue] = useState(0);
  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={70} position={[0, 2, 60]} />

      <ScrollContainer onScroll={setScrollValue}>
        {() => (
          <>
            {/* Geometry */}
            <RectangleRoom />
            <Dome />
            {/* Models */}
            <CenterModel />
          </>
        )}
      </ScrollContainer>

      {/* Grainy noise filter */}
      <EffectComposer>
        <Noise opacity={0.065} />
      </EffectComposer>
    </>
  );
}