'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from './RectangleRoom';
import CircleRoom from './CircleRoom';
import ScrollCameraController from '../controls/ScrollCameraController';
import { PointerLockControls } from '@react-three/drei';
import CenterModel from '../models/CenterModel';

export default function FloorScene() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      shadows
    >
      {/* Light */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />

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
    </Canvas>
  );
}