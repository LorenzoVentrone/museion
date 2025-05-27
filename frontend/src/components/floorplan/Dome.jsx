import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Dome() {
  const domeRef = useRef();
  const floorRef = useRef();
  const { scene } = useGLTF('/models/dome.glb');
  const scroll = useScroll();
  const fastScroll = Math.min(scroll.offset / 0.1, 1);

  const lerp = (a, b, t) => a + (b - a) * t;
  const animT = (delay) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85));

  // Animated values
  const y = useMemo(() => lerp(200, 0, animT(0.0)), [scroll.offset]);
  const rotX = useMemo(() => lerp(Math.PI, 0, animT(0.0)), [scroll.offset]);
  // Floor animation: parte da y = -100 e arriva a y = 0
  const floorY = useMemo(() => lerp(-150, 0, animT(0.05)), [scroll.offset]);
  const floorRot = useMemo(() => lerp(Math.PI, 0, animT(0.1)), [scroll.offset]);

  // Define glass and steel materials
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.6,
    roughness: 0,
    transmission: 1,
    ior: 7
  }), []);
  
  const steelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#888888',
    metalness: 1,
    roughness: 0.2
  }), []);
  
  // Apply materials to scene meshes
  useMemo(() => {
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
  }, [scene, glassMat, steelMat]);

  // Animate dome and floor transform
  // qua uso useFrame invece di andare ad interpolare direttamente posizione e rotazione tanto per, se vogliamo mettere tutto uguale mettiamolo, in caso se stai leggendo questo commento nella PR dimmelo e cambio 
  useFrame(() => {
    if (domeRef.current) {
      domeRef.current.position.y = lerp(domeRef.current.position.y, y, 0.1);
      domeRef.current.rotation.x = lerp(domeRef.current.rotation.x, rotX, 0.1);
    }
    if (floorRef.current) {
      floorRef.current.position.y = lerp(floorRef.current.position.y, floorY, 0.1);
      floorRef.current.rotation.y = lerp(floorRef.current.rotation.y, floorRot, 0.1); // <-- ora ruota su Y
    }
  });

  return (
    <group position={[0, 0, -70]}>
      {/* Dome model animated */}
      <primitive
        object={scene}
        ref={domeRef}
        castShadow
        receiveShadow
        scale={4}
        rotation={[rotX, Math.PI, 0]}
        position={[0, y, 0]}
      />

      

      {/* Floor animated */}
      <mesh
        ref={floorRef}
        position={[0, floorY, 0]}
        rotation={[-Math.PI / 2, floorRot, 0]} // <-- rotazione iniziale su Y
        receiveShadow
      >
        <circleGeometry args={[40, 32]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models/dome.glb');