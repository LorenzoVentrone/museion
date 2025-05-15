import BasicWall from '../models/BasicWall';
import BeveledWall from '../models/BeveledWall';
import ExtrudeInWall from '../models/ExtrudeInWall';
import HoleCeiling from '../models/HoleCeiling';
import SlantedRoof from '../models/SlantedRoof';
import WallMolding from '../models/WallMolding';
import WallMolding2Entrance from '../models/WallMolding2Entrance';
import WallMolding2EntCol from '../models/WallMolding2EntCol';
import { useScroll } from '@react-three/drei';
import { useMemo } from 'react';

export default function RectangleRoom() {
  const scroll = useScroll();
  const fastScroll = Math.min(scroll.offset / 0.1, 1);
  const lerp = (a, b, t) => a + (b - a) * t;
  const animT = (delay) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85));

  // Floor
  const floorY = useMemo(() => lerp(-100, 0, fastScroll), [fastScroll]);
  const floorRot = useMemo(() => lerp(Math.PI, 0, fastScroll), [fastScroll]);

  // Ceiling group
  const ceilingY = useMemo(() => lerp(100, 5.2, fastScroll), [fastScroll]);
  const ceilingRot = useMemo(() => lerp(-Math.PI, 0, fastScroll), [fastScroll]);

  // BeveledWall 1
  const beveled1Y = useMemo(() => lerp(300, 10, fastScroll), [fastScroll]);
  const beveled1Z = useMemo(() => lerp(100, 10, fastScroll), [fastScroll]);
  const beveled1Rot = useMemo(() => lerp(Math.PI, Math.PI / 2, fastScroll), [fastScroll]);
  // BeveledWall 2
  const beveled2Z = useMemo(() => lerp(-100, 5, fastScroll), [fastScroll]);
  const beveled2Rot = useMemo(() => lerp(-Math.PI, Math.PI / 2, fastScroll), [fastScroll]);

  // HoleCeiling
  const holeY = useMemo(() => lerp(100, 15, fastScroll), [fastScroll]);
  const holeRot = useMemo(() => lerp(Math.PI, Math.PI / 2, fastScroll), [fastScroll]);

  // SlantedRoof

  const roofY = useMemo(() => lerp(110, 13, fastScroll), [fastScroll]);
  const roofRot = useMemo(() => lerp(Math.PI, 0, fastScroll), [fastScroll]);

  // Separating Wall group
  const sepWallY = useMemo(() => lerp(-100, 0, fastScroll), [fastScroll]);
  const sepWallZ = useMemo(() => lerp(100, 28, fastScroll), [fastScroll]);
  const sepWallRot = useMemo(() => lerp(Math.PI, 0, fastScroll), [fastScroll]);

  // Extra BasicWall
  const extraWallX = useMemo(() => lerp(100, 7, fastScroll), [fastScroll]);
  const extraWallY = useMemo(() => lerp(-100, 6.8, fastScroll), [fastScroll]);
  const extraWallZ = useMemo(() => lerp(100, 48.4, fastScroll), [fastScroll]);
  const extraWallRot = useMemo(() => lerp(-Math.PI, 0, fastScroll), [fastScroll]);

  // Last Wall
  const lastWallY = useMemo(() => lerp(-200, 0, fastScroll), [fastScroll]);
  const lastWallZ = useMemo(() => lerp(-100, -27, fastScroll), [fastScroll]);


  // Left Walls
  const leftWalls = [
    { z: 50, delay: 0.0 },
    { z: 30, delay: 0.05 },
    { z: 7, delay: 0.1 },
    { z: -17, delay: 0.15 },
  ].map(({ z, delay }, i) => ({
    x: lerp(-100, -10, animT(delay)),
    rot: lerp(Math.PI, -Math.PI / 2, animT(delay)),
    z,
    visible: fastScroll > delay,
  }));

  // Right Walls
  const rightWalls = [
    { z: 50, delay: 0.0 },
    { z: 30, delay: 0.05 },
    { z: 6, delay: 0.1 },
    { z: -17, delay: 0.15 },
  ].map(({ z, delay }, i) => ({
    x: lerp(100, 10, animT(delay)),
    rot: lerp(Math.PI, Math.PI / 2, animT(delay)),
    z,
    visible: fastScroll > delay,
  }));


  return (
    <group>
      {/* Floor */}
      <mesh
        position={[0, floorY, 19]}
        rotation={[0, floorRot, 0]}
        receiveShadow>
        <boxGeometry args={[20, 0.1, 100]} />
        <meshPhysicalMaterial
          color="#7a1815"
          roughness={0.7}
          metalness={0.1}
          reflectivity={0.15}
          clearcoat={0.2}
          sheen={1}
          sheenColor="#e2c9a0"
        />
      </mesh>

      {/* Ceiling */}
      <group position={[4, ceilingY, 0]} rotation={[ceilingRot, 0, 0]}>
        <BeveledWall
          position={[0, beveled1Y, beveled1Z]}
          rotation={[beveled1Rot, 0, 0]}
        />
        <BeveledWall
          position={[0, 10, beveled2Z]}
          rotation={[beveled2Rot, 0, 0]}
        />
        <BasicWall
          scale={[2.1, 1.1, 1]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[-10, 10.3, 12.3]}
        />
        <BasicWall
          scale={[2, .9, 1]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          position={[0, 10, 20]}
        />
      </group>

      {/* HoleCeiling */}
      <HoleCeiling
        position={[0, holeY, 40]}
        scale={[1, 0.5, 1]}
        rotation={[0, holeRot, 0]}
      />

      {/* Slanted Roof with Windows */}
      <SlantedRoof
        position={[-0.2, roofY, -14]}
        scale={[1.2, 1, 1.2]}
        rotation={[roofRot, 0, 0]}
      />

      {/* Separating Wall */}
      <group position={[0, sepWallY, sepWallZ]} rotation={[0, sepWallRot, 0]}>
        <WallMolding2Entrance
          rotation={[0, Math.PI, 0]}
          scale={[1, 2.5, 1]}
          position={[0, 0, 0]}
        />
        <BasicWall position={[-8, 7.5, 0]} />
        <BasicWall position={[8, 7.5, 0]} />
      </group>

      {/* Extra Wall */}
      <BasicWall
        position={[extraWallX, extraWallY, extraWallZ]}
        scale={[1.5, 1.1, 1]}
        rotation={[0, extraWallRot, 0]}
      />

      {/* Last Wall */}
      <WallMolding2EntCol
        rotation={[0, Math.PI, 0]}
        position={[0, lastWallY, lastWallZ]}
      />

      {/* Left Walls */}
      {leftWalls.map(
        (w, i) =>
          w.visible && (
            <WallMolding
              key={'left' + i}
              rotation={[0, w.rot, 0]}
              scale={[2, 2.3, 2]}
              position={[w.x, 0, w.z]}
            />
          )
      )}

      {/* Right Walls */}
      {rightWalls.map(
        (w, i) =>
          w.visible && (
            <WallMolding
              key={'right' + i}
              rotation={[0, w.rot, 0]}
              scale={[2, 2.3, 2]}
              position={[w.x, 0, w.z]}
            />
          )
      )}
    </group>
  );
}