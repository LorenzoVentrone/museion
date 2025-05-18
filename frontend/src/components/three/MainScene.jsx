'use client';

import { PerspectiveCamera, OrbitControls, ScrollControls, Scroll } from '@react-three/drei';
import RectangleRoom from '../floorplan/RectangleRoom';
import ScrollCameraController from '../controls/ScrollCameraController';
import { PointerLockControls } from '@react-three/drei';
import {CenterModel} from '../models/CenterModel';
import Dome from '../floorplan/Dome'
import { EffectComposer, Noise, Outline, Selection, SelectiveBloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { SeymourDamer } from '../models/SeymourDamer';
import { useRef } from 'react';

export default function MainScene() {
  // Create refs for models we want to outline
  const centerModelRef = useRef();
  const seymourRef = useRef();

  return (
    <>
      {/* Camera inside the rectangle */}
      <PerspectiveCamera makeDefault fov={70} position={[0, 2, 60]} />
      <ScrollControls pages={2} damping={0.1}>
        <ScrollCameraController loopRadius={35} loopHeight={4}/>
      </ScrollControls>

      {/* Geometry */}
      <RectangleRoom />
      <Dome />
      
      {/* Models - Use forwardRef on your components to expose their refs */}
      <CenterModel ref={centerModelRef} />
      <SeymourDamer ref={seymourRef} />
      
      {/* Post-processing effects */}
      <EffectComposer disableNormalPass multisampling={8}>
        <Noise opacity={0.065} />
        
        {/* Outline effect applied with Selection */}
        <Selection>
          <Outline 
            blur
            edgeStrength={3}
            pulseSpeed={0.5}
            visibleEdgeColor="white"
            hiddenEdgeColor="white"
            width={2}
            selection={[centerModelRef, seymourRef]} // Explicitly select objects
          />
          <SelectiveBloom 
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.8}
            selection={[centerModelRef, seymourRef]} // Match the same selection
            lights={[]} // No need for specific lights
          />
        </Selection>
      </EffectComposer>
    </>
  );
}