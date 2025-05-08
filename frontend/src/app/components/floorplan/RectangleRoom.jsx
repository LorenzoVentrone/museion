
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function RectangleRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh position={[0, 0, -2.5]} receiveShadow>
        <boxGeometry args={[20, 0.1, 60]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 10, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 60]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 5, -2.5]} receiveShadow>
        <boxGeometry args={[0.1, 10, 60]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 5, -2.5]} receiveShadow>
        <boxGeometry args={[0.1, 10, 60]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
}