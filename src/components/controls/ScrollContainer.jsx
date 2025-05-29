import { ScrollControls } from '@react-three/drei';
import ScrollCameraController from './ScrollCameraController';
import * as THREE from 'three';
import { useMemo } from 'react';

// See comments for why this is better than using scrollContainer directly
const ScrollContainer = ({ children, onScroll }) => {
  // Memoize the camera lookAt vector to avoid unnecessary re-renders in ScrollCameraController
  const specialCameraLookAt = useMemo(() => new THREE.Vector3(0, 5, -70), []);

  return (
    <ScrollControls pages={10} damping={0.1}>
      {/* PointerLockControls locks the mouse, which is good for 3D experiences but prevents mouse usage for UI.
          Uncomment if you want to lock the pointer for a full 3D experience. */}
      {/* <PointerLockControls /> */}

      {/* ScrollCameraController handles camera movement and scroll events.
          The specialCameraLookAt vector is used for the initial lerp to center the statue.
          It matches the lookAt vector when clicking the statue. */}
      <ScrollCameraController onScroll={onScroll} specialCameraLookAt={specialCameraLookAt} />

      {/* All children inside ScrollContainer are children of ScrollControls,
          so you can access scroll directly in each component using the useScroll() hook.
          This is more convenient than passing the scroll variable as a prop to each child. */}
      {children()}
    </ScrollControls>
  );
};

export default ScrollContainer;