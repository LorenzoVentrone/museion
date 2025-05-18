'use client'

import {
  useEffect,
  useState,
  useMemo,
  useRef,
  Suspense,
} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import { useInfoPanel } from '../../context/InfoPanelContext';

/* ------------------------------- CONFIG ---------------------------------- */

const NUM_PHOTOS   = 3;          // how many placeholders to throw           ▸
const PHOTO_W_H    = [2, 3]; // width / height of each plane (world-units)
const THROW_TIME   = 0.8;        // seconds for each photo to reach target
const START_OFFSET = 0.05;       // distance in front of the camera (m)

/* --------------------------- PHOTO COMPONENTS ---------------------------- */

function PhotoPlane({ texture, start, target, rotationTarget }) {
  const ref = useRef();
  const progress = useRef(0);
  
  // Get the image's aspect ratio
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  
  // Calculate dimensions that preserve aspect ratio
  const height = 2.5; // Fixed height
  const width = height * aspectRatio; // Width adjusted based on aspect ratio

  useFrame((_, dt) => {
    progress.current = Math.min(progress.current + dt / THROW_TIME, 1);
    // lerp position & rotation
    ref.current.position.lerpVectors(start, target, progress.current);
    ref.current.rotation.z = THREE.MathUtils.lerp(0, rotationTarget, progress.current);
  });

  return (
    <RoundedBox
      ref={ref}
      args={[width, height, 0.04]} // Use calculated width to maintain aspect ratio
      radius={0.12}
      smoothness={6}
      renderOrder={2}
    >
      <meshBasicMaterial 
        map={texture} 
        transparent 
        toneMapped={false} // Prevent color shift
        encoding={THREE.sRGBEncoding} // Use proper color space
      />
    </RoundedBox>
  );
}

function PhotoCloud({ photoUrls }) {
  const textures = useTexture(photoUrls, (loadedTextures) => {
    // Process textures after loading to fix encoding and filtering
    loadedTextures.forEach(texture => {
      texture.encoding = THREE.sRGBEncoding;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
    });
  });
  
  const { viewport } = useThree();
  const { width, height } = viewport;

  /* one-time memo of start/target transforms */
  const data = useMemo(
    () =>
      textures.map((_t, i) => {
        // all photos start near the top-right (panel) corner of the screen
        const start = new THREE.Vector3(
          width / 2 - 1.5,                     // a bit left from right edge
          height / 2 - 1.0,                    // a bit down from top edge
          0,
        );
        
        // Calculate the right edge boundary to avoid info panel
        // Info panel is at right-10, width 400px - convert to world units
        // Assuming the info panel takes up roughly 30% of the viewport width
        const rightBoundary = width * 0.3; 
        
        // scatter across viewport, but constrained away from the right side
        const target = new THREE.Vector3(
          // Keep x position away from the right side where the info panel is
          // Use negative values (left side) or small positive values (center)
          THREE.MathUtils.randFloat(-width * 0.4, width * 0.15),
          
          // Vertical positioning - spread photos vertically
          height * 0.2 - (i * (height * 0.25)),
          
          // Depth - slightly randomized
          THREE.MathUtils.randFloat(-2, -3),
        );
        
        const rot = THREE.MathUtils.randFloat(-Math.PI / 10, Math.PI / 10);
        return { start, target, rot };
      }),
    [textures, width, height],
  );

  return data.map(({ start, target, rot }, i) => (
    <PhotoPlane
      key={i}
      texture={textures[i]}
      start={start}
      target={target}
      rotationTarget={rot}
    />
  ));
}

function PhotosOverlay({ visible, photoUrls = [] }) {
  if (!visible || photoUrls.length === 0) return null;

  return (
    <Canvas
      className="photo-overlay"
      orthographic
      camera={{ zoom: 120, position: [0, 0, 10] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,          // under the info panel (z-index 1000)
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <PhotoCloud photoUrls={photoUrls} />
      </Suspense>
    </Canvas>
  );
}

/* ------------------------------ PANEL UI --------------------------------- */

export default function InfoPanel() {
  const { panelInfo, closePanel } = useInfoPanel();
  const { isOpen, title, content, meshRef, photos = [] } = panelInfo;

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [slideClass,   setSlideClass]   = useState('translate-x-full');
  const [persistedContent, setPersistedContent] = useState({ title, content });

  /* open / close transitions */
  useEffect(() => {
    if (isOpen) {
      setPersistedContent({ title, content });
      setShouldRender(true);
      setSlideClass('translate-x-full');
      requestAnimationFrame(() => setSlideClass('translate-x-0'));
    } else {
      setSlideClass('translate-x-full');
      const t = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(t);
    }
  }, [isOpen, title, content]);

  /* Esc key to close */
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && closePanel();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [closePanel]);

  /* statue depth tweaks (unchanged) */
  useEffect(() => {
    if (meshRef?.current) {
      meshRef.current.renderOrder = isOpen ? 1000 : 0;
      if (meshRef.current.material) meshRef.current.material.depthTest = !isOpen;
    }
  }, [isOpen, meshRef]);

  /* --------------------------------------------------------------- */
  if (!shouldRender) return null;

  return (
    <>
      {/* translucent blur backdrop */}
      <div
        className="fixed inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          zIndex: 400,
          opacity: slideClass === 'translate-x-0' ? 1 : 0,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      />

      {/* the flying photos overlay */}
      <PhotosOverlay visible={isOpen} photoUrls={photos} />

      {/* information panel */}
      <div
        className={`fixed top-10 right-10 w-[400px] bg-white bg-opacity-95 rounded-xl shadow-2xl
          transform transition-transform duration-500 ease-out ${slideClass}`}
        style={{ zIndex: 1000 }}
      >
        <div className="p-6 relative">
          <button
            onClick={closePanel}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            ✕
          </button>
          <h2 className="font-avant text-2xl font-bold mb-4">{persistedContent.title}</h2>
          <div className="prose font-avant">{persistedContent.content}</div>
        </div>
      </div>
    </>
  );
}