'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useInfoPanel } from '@/context/InfoPanelContext';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

export default function ScrollCameraController({ onScroll, specialCameraLookAt, specialActivation = 0.11, specialBlendDuration = 0.13 }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const { panelInfo } = useInfoPanel();
  const isOpen = panelInfo.isOpen;
  const lastOffset = useRef(0);

  useEffect(() => {
    const handleOrientationChange = () => {
      // Check if the orientation actually changed to avoid unnecessary reloads
      // This simple check might not be foolproof on all devices/browsers for resize vs orientation
      // but window.orientation is a common indicator.
      // For a more robust check, you might compare previous vs current aspect ratio.
      // However, for a direct "reload on orientationchange event", this is it.
      window.location.reload();
    };

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  useFrame(() => {
    const t = scroll.offset;
    if (onScroll && Math.abs(t - lastOffset.current) > 0.001) {
      onScroll(t);
      lastOffset.current = t;
    }

    // Do not interfere if a panel is open
    if (isOpen) return;

    // --- Utility: clamp function ---
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // --- Temporal phases ---
    const phase1End = 0.3;
    const phase2End = 0.7;
    const blendDuration = 0.1;

    // --- Camera path constants ---
    const zStart = 100;
    const zEnd = -62;
    const radius = 30;
    const centerZ = -70;
    const startAngle = Math.PI / 2;

    // --- Easing function ---
    function easeInOutQuad(p) {
      return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    }

    // --- Phase 1: Straight corridor ---
    const linP1 = clamp(t / phase1End, 0, 1);
    const z1 = THREE.MathUtils.lerp(zStart, zEnd, easeInOutQuad(linP1));
    const linearPos1 = new THREE.Vector3(0, 2, z1);
    const dir1 = new THREE.Vector3(0, 0, -1);

    // --- Phase 2: Circular turn ---
    const circP = clamp((t - phase1End) / (phase2End - phase1End), 0, 1);
    const circAngle = startAngle + easeInOutQuad(circP) * Math.PI * 2;
    const circlePos = new THREE.Vector3(
      Math.cos(circAngle) * radius,
      2,
      centerZ + Math.sin(circAngle) * radius
    );
    const dir2 = new THREE.Vector3(
      -Math.sin(circAngle) * radius,
      0,
      Math.cos(circAngle) * radius
    ).normalize();

    // --- Phase 3: Return corridor ---
    const linP3 = clamp((t - phase2End) / (1 - phase2End), 0, 1);
    const z3 = THREE.MathUtils.lerp(zEnd, zStart, easeInOutQuad(linP3));
    const linearPos3 = new THREE.Vector3(0, 2, z3);
    const dir3 = new THREE.Vector3(0, 0, 1);

    // --- Dynamic blending ---
    let finalPos, finalDir;
    if (t < phase1End) {
      // Only straight path
      finalPos = linearPos1;
      finalDir = dir1;
    } else if (t < phase1End + blendDuration) {
      // Blend straight → turn
      const b = (t - phase1End) / blendDuration;
      finalPos = linearPos1.clone().lerp(circlePos, easeInOutQuad(b));
      finalDir = dir1.clone().lerp(dir2, easeInOutQuad(b)).normalize();
    } else if (t < phase2End) {
      // Only turn
      finalPos = circlePos;
      finalDir = dir2;
    } else if (t < phase2End + blendDuration) {
      // Blend turn → return
      const b = (t - phase2End) / blendDuration;
      finalPos = circlePos.clone().lerp(linearPos3, easeInOutQuad(b));
      finalDir = dir2.clone().lerp(dir3, easeInOutQuad(b)).normalize();
    } else {
      // Only return path
      finalPos = linearPos3;
      finalDir = dir3;
    }

    // --- Bobbing effect for walking sensation (straight corridor only) ---
    const bobAmplitude = 1.1;
    const bobFrequency = 12;
    // Apply bobbing only in the straight corridor up until blend start
    const bobEnd = phase1End + blendDuration+0.2;
    if (t < bobEnd) {
      finalPos.x += Math.sin(t * Math.PI * 2 * bobFrequency) * bobAmplitude;
    }

    // --- Compute default lookAt target ---
    let computedLookAt = finalPos.clone().add(finalDir);

    // --- Special panel activation blend ---
    if (specialCameraLookAt) {
      const x = (t - specialActivation) / specialBlendDuration;
      let specialRaw;
      if (x > 0 && x <= 1) {
        specialRaw = x;
      } else if (x > 1 && x <= 2) {
        specialRaw = 2 - x;
      } else {
        specialRaw = 0;
      }
      const smoothSpecialLerp = easeInOutQuad(specialRaw);
      computedLookAt = computedLookAt.clone().lerp(specialCameraLookAt, smoothSpecialLerp);
    }

    camera.position.copy(finalPos);
    camera.lookAt(computedLookAt);
  });

  return null;
}
