import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CircleRoom() {
  const domeRef = useRef();

  return (
    <group position={[0, 0, -70]}>
      {/* Floor */}
      <mesh receiveShadow>
        <cylinderGeometry args={[40, 40, 0.2, 64]} />
        <meshStandardMaterial color="#e9decf" />
      </mesh>

      {/* Vertical wall with single front doorway */}
      {(() => {
        const wallRadius = 40;
        const wallHeight = 10;
        const doorWidth = 6;
        const doorAngle = (doorWidth / (2 * Math.PI * wallRadius)) * 2 * Math.PI;

        return (
          <>
            {/* Wall segment excluding only front door */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow>
              <cylinderGeometry
                args={[
                  wallRadius,
                  wallRadius,
                  wallHeight,
                  64,
                  1,
                  true,
                  doorAngle,
                  Math.PI * 2 - 2*doorAngle,
                ]}
              />
              <meshStandardMaterial color="#e9decf" side={THREE.DoubleSide} />
            </mesh>
          </>
        );
      })()}

      {/* Dome (hemisphere with hole) */}
      <mesh ref={domeRef} rotation={[0, 0, 0]} position={[0, 10, 0]} castShadow>
        <sphereGeometry args={[40, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e9decf" side={2} />
      </mesh>

      {/* Oculus (no geometry, but adds light!) */}
      <pointLight
        position={[0, 20, 0]}
        intensity={1.2}
        distance={100}
        decay={2}
        color="#ffffff"
      />
    </group>
  );
}