'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useInfoPanel } from '@/context/InfoPanelContext';
import * as THREE from 'three';
import { useRef } from 'react';

export default function ScrollCameraController({ onScroll, specialCameraLookAt, specialActivation = 0.11, specialBlendDuration = 0.13 }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const { panelInfo } = useInfoPanel();
  const isOpen = panelInfo.isOpen;
  const lastOffset = useRef(0);

  useFrame(() => {
    if (onScroll && Math.abs(scroll.offset - lastOffset.current) > 0.001) {
      onScroll(scroll.offset);
      lastOffset.current = scroll.offset;
    }
    // Do not interfere if a panel is open
    if (isOpen) return;
    const t = scroll.offset;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const zStart = 100;
    const zEnd = -62;
    const wallRadius = 40;
    const doorEntranceZ = -70 + wallRadius;
    const radius = 30;       // Adjust to control distance from center
    const doorThreshold = (zStart - doorEntranceZ) / (zStart - zEnd);
    const rotateEarlyOffset = 0.5; // Start circular motion this fraction earlier
    const rotationStart = Math.max(0, doorThreshold - rotateEarlyOffset);
    const blendDuration = 0.1; // Fraction of scroll to blend transitions

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

    // Add slight side-to-side bobble to simulate walking
    const bobAmplitude = 1.2; // horizontal bob width
    const bobFrequency = 12;   // bobs per full scroll cycle
    let bobOffset = 0;
    if (finalPos.z > doorEntranceZ) {
      bobOffset = Math.sin(t * Math.PI * 2 * bobFrequency) * bobAmplitude;
    }
    finalPos.x += bobOffset;
    camera.position.copy(finalPos);

    // Compute the standard final direction (normal behavior)
    const approachDir = new THREE.Vector3(0, 0, -1);
    const tangentDir = new THREE.Vector3(
      -Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius
    ).normalize();
    const finalDir = approachDir.clone().lerp(tangentDir, blendE).normalize();
    let computedLookAt = finalPos.clone().add(finalDir);

    // --- SPECIAL BLEND LOGIC ---
    // Create a blend factor that ramps up then down over a scroll window.
    // Let x = (t - specialActivation) / specialBlendDuration.
    // For 0 <= x < 1, raw blend factor increases from 0 to 1.
    // For 1 <= x < 2, raw blend factor decreases from 1 to 0.
    // Otherwise, the blend factor is 0.
    // IMPORTANT: Only apply special blending when we're in or transitioning to circular motion
    let specialRaw = 0;
    if (specialCameraLookAt) {
      const x = (t - specialActivation) / specialBlendDuration;
      if (x >= 0 && x < 1) {
        specialRaw = x;
      } else if (x >= 1 && x < 2) {
        specialRaw = 2 - x;
      } else {
        specialRaw = 0;
      }
      // Apply an easing function for a smoother transition.
      const smoothSpecialLerp = easeInOutQuad(specialRaw);
      // Blend the computed lookAt target with the special target.
      computedLookAt = computedLookAt.clone().lerp(specialCameraLookAt, smoothSpecialLerp);
    }

    camera.lookAt(computedLookAt);
  });

  return null;
}