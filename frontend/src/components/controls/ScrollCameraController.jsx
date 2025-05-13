'use client';

import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function ScrollCameraController({ loopRadius = 40, loopHeight = 0, onScroll }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const lastOffset = useRef(0);

  // Parametri oscillazione "camminata"
  const walkAmplitude = 6; // aumenta per oscillazioni più forti tra sinistra e destra
  const walkFrequency = 25;  // meno oscillazioni, più lente e ampie con valori bassi

  useFrame(() => {
    // mi serve per passare il valore alle singole componenti THREE (o blender in un futuro)
    if (onScroll && Math.abs(scroll.offset - lastOffset.current) > 0.001) {
      onScroll(scroll.offset);
      lastOffset.current = scroll.offset;
    }
    const t = scroll.offset;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const zStart = 90;
    const zEnd = -62;
    const wallRadius = 40;
    const doorEntranceZ = -70 + wallRadius;
    const radius = 30;
    const doorThreshold = (zStart - doorEntranceZ) / (zStart - zEnd);
    const rotateEarlyOffset = 0.5;
    const rotationStart = Math.max(0, doorThreshold - rotateEarlyOffset);
    const blendDuration = 0.1;

    function easeInOutQuad(p) {
      return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    }

    const linP = clamp(t / rotationStart, 0, 1);
    const linE = easeInOutQuad(linP);
    const zLinear = THREE.MathUtils.lerp(zStart, zEnd, linE);
    const linearPos = new THREE.Vector3(0, 2, zLinear);

    const circP = clamp((t - rotationStart) / (1 - rotationStart), 0, 1);
    const circE = easeInOutQuad(circP);
    const startAngle = Math.PI / 2;
    const angle = startAngle + circE * Math.PI * 2;
    const circlePos = new THREE.Vector3(
      Math.cos(angle) * radius,
      2,
      -70 + Math.sin(angle) * radius
    );

    const blendP = clamp((t - rotationStart) / blendDuration, 0, 1);
    const blendE = easeInOutQuad(blendP);
    const finalPos = linearPos.clone().lerp(circlePos, blendE);

    // Oscillazione camminata (asse X)
    const walkOffset = Math.sin(t * walkFrequency * Math.PI * 2) * walkAmplitude * (1 - Math.abs(2 * t - 1));
    /* const walkOffset = Math.sin(state.clock.getElapsedTime() * walkFrequency) * walkAmplitude * (1 - Math.abs(2 * t - 1)); */
    finalPos.x += walkOffset;

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