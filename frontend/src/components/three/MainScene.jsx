'use client';

import { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import CircleRoom from '../floorplan/CircleRoom';
import { CenterModel } from '../models/CenterModel';
import ScrollContainer from '../controls/ScrollContainer';


export default function MainScene() {
  const [scrollOffset, setScrollOffset] = useState(0);
  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={60} position={[0, 2, 29]} />

      {/* Controls */}
      <ScrollContainer onScroll={setScrollOffset} scrollOffset={scrollOffset}>
        {(scroll) => (
          <>
            <RectangleRoom scroll={scroll} />
            <CircleRoom scroll={scroll} />
            <CenterModel scroll={scroll} />
          </>
        )}
      </ScrollContainer>
    </>
  );
}