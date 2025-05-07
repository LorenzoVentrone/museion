'use client';

import { useGLTF } from '@react-three/drei';

export default function CenterModel({
  url = '/woman_statue.glb',
  position = [0, 10, -70],
  scale = [0.3, 0.3, 0.3],
  rotation = [0, Math.PI, 0]
}) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} position={position} scale={scale} rotation={rotation} castShadow />;
}

// Preload so it’s ready when the canvas mounts
useGLTF.preload('/woman_statue.glb');