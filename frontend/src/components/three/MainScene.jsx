'use client';

import { useState } from 'react';
import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import { CenterModel } from '../models/CenterModel';
import Dome from '../floorplan/Dome'
import { EffectComposer, Noise, Outline, Selection, SelectiveBloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { SeymourDamer } from '../models/SeymourDamer';
import { useRef } from 'react';
import ScrollContainer from '../controls/ScrollContainer';


export default function MainScene() {
  // Allora cosi non lagga, ma a me serve più in alto nel codice lo scrollValue, cosi da poterlo usare dentro homepage
  const [scrollValue, setScrollValue] = useState(0);
  // Create refs for models we want to outline
  const centerModelRef = useRef();
  const seymourRef = useRef();

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
            <SeymourDamer />
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