'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

export default function ScrollCameraController({ onScroll }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const lastOffset = useRef(0);

  useFrame(() => {
    if (onScroll && Math.abs(scroll.offset - lastOffset.current) > 0.001) {
      onScroll(scroll.offset);
      lastOffset.current = scroll.offset;
    }
    // unified, smooth transition between linear approach and circular wall-hugging
    const t = scroll.offset;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const zStart = 100;
    const zEnd = -62;
    const wallRadius = 40;
    const doorEntranceZ = -70 + wallRadius;
    const radius = 30;                    // Adjust to control distance from center
    const doorThreshold = (zStart - doorEntranceZ) / (zStart - zEnd);
    const rotateEarlyOffset = 0.5;        // Start circular motion this fraction earlier
    const rotationStart = Math.max(0, doorThreshold - rotateEarlyOffset);
    const blendDuration = 0.1;            // Fraction of scroll to blend transitions

    // easing function
    function easeInOutQuad(p) {
      return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    }

    // Linear (approach) position
    const linP = clamp(t / rotationStart, 0, 1);
    const linE = easeInOutQuad(linP);
    const zLinear = THREE.MathUtils.lerp(zStart, zEnd, linE);
    const linearPos = new THREE.Vector3(0, 2, zLinear);

    // Circular (hug) position
    const circP = clamp((t - rotationStart) / (1 - rotationStart), 0, 1);
    const circE = easeInOutQuad(circP);
    const startAngle = Math.PI / 2;
    const angle = startAngle + circE * Math.PI * 2;
    const circlePos = new THREE.Vector3(
      Math.cos(angle) * radius,
      2,
      -70 + Math.sin(angle) * radius
    );

    // Blending between linear and circular positions
    const blendP = clamp((t - rotationStart) / blendDuration, 0, 1);
    const blendE = easeInOutQuad(blendP);
    const finalPos = linearPos.clone().lerp(circlePos, blendE);
    camera.position.copy(finalPos);

    // Compute smooth orientation
    const approachDir = new THREE.Vector3(0, 0, -1);
    const tangentDir = new THREE.Vector3(
      -Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius
    ).normalize();
    const dirBlend = blendE;
    const finalDir = approachDir.clone().lerp(tangentDir, dirBlend).normalize();
    camera.lookAt(finalPos.clone().add(finalDir));
  });

  return null;
}