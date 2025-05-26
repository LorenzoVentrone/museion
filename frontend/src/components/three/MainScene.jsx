'use client';

import { useState, useRef } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import Dome from '../floorplan/Dome';
import { CenterModel } from '../models/CenterModel';
/* import { EffectComposer, Noise, Outline, Selection, SelectiveBloom } from '@react-three/postprocessing' */
/* import { BlendFunction } from 'postprocessing' */
import { SeymourDamer } from '../models/SeymourDamer';
import ScrollContainer from '../controls/ScrollContainer';
import ScrollCameraController from '../controls/ScrollCameraController';

export default function MainScene({setShowOverlay, setShowOutro}) {
  const handleScroll = (offset) => {
    setShowOverlay(offset < 0.015);
    setShowOutro(offset > 0.91);
  };
  const [scrollValue, setScrollValue] = useState(0);

  // Create refs for models we want to outline
  const centerModelRef = useRef();
  const seymourRef = useRef();

  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 2, 29]} />
      <ScrollContainer onScroll={setScrollValue}>
        {() => (
          <>
            
            {/* tutti i componenti dentro ScrollContainer sono figli di ScrollControls,
            quindi posso accedere allo scroll direttamente dentro ai singoli copmponenti 
            con l'hook useScroll() */}
            <ScrollCameraController onScroll={handleScroll} />
            <RectangleRoom />
            <Dome />
            <CenterModel />
            <SeymourDamer />
          </>
        )}
      </ScrollContainer>
    </>
  );
}