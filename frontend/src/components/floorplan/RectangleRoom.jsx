import { Basic } from 'next/font/google';
import BasicWall from '../models/BasicWall';
import BeveledWall from '../models/BeveledWall';
import ExtrudeInWall from '../models/ExtrudeInWall';
import HoleCeiling from '../models/HoleCeiling';
import SlantedRoof from '../models/SlantedRoof';
import WallMolding from '../models/WallMolding';
import WallMolding2Entrance from '../models/WallMolding2Entrance';
import WallMolding2EntCol from '../models/WallMolding2EntCol';

export default function RectangleRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh position={[0, 0, 19]} receiveShadow>
        <boxGeometry args={[20, 0.1, 100]} />
        <meshPhysicalMaterial
          color="#7a1815" // warm carpet color, adjust as needed
          roughness={0.7} // high roughness for a soft look
          metalness={0.1} // low, carpets are not metallic
          reflectivity={0.15} // subtle reflection
          clearcoat={0.2} // slight clearcoat for a soft sheen
          sheen={1} // enable sheen for fabric-like effect
          sheenColor="#e2c9a0" // subtle highlight color
        />
      </mesh>

      {/* Ceiling */}
      <group position={[4, 5.2, 0]}> 
        <BeveledWall
          position={[0, 10, 10]}
          rotation={[Math.PI/2, 0, 0]}
        />
        <BeveledWall
          position={[0, 10, 5]}
          rotation={[Math.PI/2, 0, 0]}
        />
        <BasicWall
          scale={[2.1, 1.1, 1]}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-10, 10.3, 12.3]}
        />
        <BasicWall
          scale={[2, .9, 1]}
          rotation={[Math.PI/2, 0, Math.PI/2]}
          position={[0, 10, 20]}
        />
      </group>

      <HoleCeiling
        position={[0, 15, 40]}
        scale={[1, 0.5, 1]}
        rotation={[0, Math.PI/2, 0]}
      />

      {/* Slanted Roof with Windows */}
      <SlantedRoof
        position={[-0.2, 13, -14]}
        scale={[1.2, 1, 1.2]}
      />

      {/* Separating Wall */}
      <group position={[0, 0, 28]}>
        <WallMolding2Entrance
          rotation={[0, Math.PI, 0]}
          scale={[1, 2.5, 1]}
          position={[0, 0, 0]}
        />
        <BasicWall
          position={[-8, 7.5, 0]}

        />
        <BasicWall
          position={[8, 7.5, 0]}
        />
      </group>
      <BasicWall
        position={[7, 6.8, 48.4]}
        scale={[1.5, 1.1, 1]}
      />
      {/* Last Wall */}
      <WallMolding2EntCol
        rotation={[0, Math.PI, 0]}
        position={[0, 0, -27]}
      />

      {/*Left Walls */}
      <WallMolding
        rotation={[0, -Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[-10, 0, 50]}
      />
      <WallMolding
        rotation={[0, -Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[-10, 0, 30]}
      />
      <WallMolding
        rotation={[0, -Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[-10, 0, 7]}
      />
      <WallMolding
        rotation={[0, -Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[-10, 0, -17]}
      />

      {/*Right Walls */}
      <WallMolding
        rotation={[0, Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[10, 0, 50]}
      />
      <WallMolding
        rotation={[0, Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[10, 0, 30]}
      />
      <WallMolding
        rotation={[0, Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[10, 0,6]}
      />
      <WallMolding
        rotation={[0, Math.PI/2, 0]}
        scale={[2, 2.3, 2]}
        position={[10, 0, -17]}
      />
    </group>
  );
}