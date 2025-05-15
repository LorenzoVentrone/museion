'use client';

import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import ScrollCameraController from '../controls/ScrollCameraController';
import { PointerLockControls } from '@react-three/drei';
import {CenterModel} from '../models/CenterModel';
import Dome from '../floorplan/Dome'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { SeymourDamer } from '../models/SeymourDamer';


export default function MainScene() {
  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={70} position={[0, 2, 60]} />
      <ScrollControls pages={2} damping={0.1}>
        <ScrollCameraController loopRadius={35} loopHeight={4}/>
      </ScrollControls>

        {/* Geometry */}
        <RectangleRoom />
        <Dome />
        {/* Models */}
        <CenterModel />
        <SeymourDamer />
        {/* Grainy noise filter */}
        <EffectComposer>
          <Noise opacity={0.065} />
        </EffectComposer>
    </>
  );
}