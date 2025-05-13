import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

export default function CircleRoom() {
  const domeRef = useRef();
  const scroll = useScroll()
  const fastScroll = Math.min(scroll.offset / 0.12, 1);

  // Pavimento sale da più sotto
  const floorY = useMemo(() => -60 + fastScroll * 60, [fastScroll]); // da -60 a 0

  // Muro arriva da più lontano dietro (z da -200 a 0)
  const wallZ = useMemo(() => -200 + fastScroll * 200, [fastScroll]); // da -200 a 0

  // Cupola scende da più in alto (y da 120 a 10)
  const domeY = useMemo(() => 120 - fastScroll * 110, [fastScroll]); // da 120 a 10

  // Rotazione del gruppo: ruota sull'asse Y mentre si compone
  const groupRotation = useMemo(
    () => (1 - fastScroll) * Math.PI * 2, // 2 giri completi
    [fastScroll]
  );

  return (
    <group position={[0, 0, -70]} rotation={[0, groupRotation, 0]}>
      {/* Floor */}
      <mesh position={[0, floorY, 0]} receiveShadow>
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
            <mesh position={[0, 5, wallZ]} castShadow receiveShadow>
              <cylinderGeometry
                args={[
                  wallRadius,
                  wallRadius,
                  wallHeight,
                  64,
                  1,
                  true,
                  doorAngle,
                  Math.PI * 2 - 2 * doorAngle,
                ]}
              />
              <meshStandardMaterial color="#e9decf" side={THREE.DoubleSide} />
            </mesh>
          </>
        );
      })()}

      {/* Dome (hemisphere with hole) */}
      <mesh ref={domeRef} rotation={[0, 0, 0]} position={[0, domeY, 0]} castShadow>
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