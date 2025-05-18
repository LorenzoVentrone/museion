'use client';

import { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import Dome from '../floorplan/Dome';
import { CenterModel } from '../models/CenterModel';
import ScrollContainer from '../controls/ScrollContainer';
import ScrollCameraController from '../controls/ScrollCameraController';

export default function MainScene({setShowOverlay}) {
  const handleScroll = (offset) => {
    setShowOverlay(offset < 0.015);
  };
  const [scrollValue, setScrollValue] = useState(0);

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
          </>
        )}
      </ScrollContainer>
    </>
  );
}