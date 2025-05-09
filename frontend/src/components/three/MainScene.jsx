'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import CircleRoom from '../floorplan/CircleRoom';
import ScrollCameraController from '../controls/ScrollCameraController';
import { PointerLockControls } from '@react-three/drei';
import {CenterModel} from '../models/CenterModel';


export default function MainScene() {
  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={60} position={[0, 2, 29]} />
      <ScrollControls pages={2} damping={0.1}>
      <PointerLockControls />
        <ScrollCameraController loopRadius={35} loopHeight={4}/>
      </ScrollControls>

        {/* Geometry */}
        <RectangleRoom />
        <CircleRoom />
        {/* Models */}
        <CenterModel />
    </>
  );
}