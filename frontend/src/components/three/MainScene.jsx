'use client';

import { PerspectiveCamera } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import CircleRoom from '../floorplan/CircleRoom';
import { CenterModel } from '../models/CenterModel';
import ScrollContainer from '../controls/ScrollContainer';

export default function MainScene({ setScrollValue }) {
  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 2, 29]} />
      <ScrollContainer onScroll={setScrollValue}>
        {() => (
          <>
            
            {/* tutti i componenti dentro ScrollContainer sono figli di ScrollControls,
            quindi posso accedere allo scroll direttamente dentro ai singoli copmponenti 
            con l'hook useScroll() */}
            <RectangleRoom />
            <CircleRoom />
            <CenterModel />
          </>
        )}
      </ScrollContainer>
    </>
  );
}