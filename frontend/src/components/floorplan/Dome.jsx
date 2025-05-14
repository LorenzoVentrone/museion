import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

export default function Dome() {
  const domeRef = useRef();
  const { scene } = useGLTF('/models/dome.glb');

  // Define glass and steel materials
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.45
  }), []);
  
  const steelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#888888',
    metalness: 1,
    roughness: 0.2
  }), []);
  
  // Load and configure floor texture
  //const woodTexture = useLoader(TextureLoader, '/images/wooden-parquet-floor.jpg');
  //woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  //woodTexture.repeat.set(4, 4);
  
  // Apply materials to scene meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      if (child.name.toLowerCase().includes('rod') || child.name.toLowerCase().includes('beam')) {
        child.material = steelMat;
      } else {
        child.material = glassMat;
      }
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={[0, 0, -70]}>
      {/* Dome model */}
      <primitive
        object={scene}
        ref={domeRef}
        castShadow
        receiveShadow
        scale={4}
        rotation={[0, Math.PI, 0]}
      />

      {/* Oculus Light */}
      <pointLight
        position={[0, 20, 0]}
        intensity={1.2}
        distance={100}
        decay={2}
        color="#ffffff"
      />
      {/* Ambient light to illuminate textures */}
      <ambientLight intensity={0.6} />
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[40, 32]} />
        <meshStandardMaterial
          //map={woodTexture}
          metalness={0.3}
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Preload model for better performance
useGLTF.preload('/models/dome.glb');