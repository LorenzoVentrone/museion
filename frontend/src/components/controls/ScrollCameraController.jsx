'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useInfoPanel } from '@/context/InfoPanelContext';
import * as THREE from 'three';
import { useRef } from 'react';

export default function ScrollCameraController({ onScroll }) {
  const { camera } = useThree();
  const scroll = useScroll();
  const { panelInfo } = useInfoPanel();
  const isOpen = panelInfo.isOpen;
  const lastOffset = useRef(0);

  useFrame(() => {
    const t = scroll.offset;
    if (onScroll && Math.abs(t - lastOffset.current) > 0.001) {
      onScroll(t);
      lastOffset.current = t;
    }

    if (isOpen) return;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    // --- Fasi temporali ---
    const phase1End = 0.3;
    const phase2End = 0.7;
    const blendDuration = 0.1;

    // --- Parametri posizione ---
    const zStart = 100;
    const zEnd = -62;

    const radius = 30;
    const centerZ = -70;
    const startAngle = Math.PI / 2;

    // --- Easing ---
    function easeInOutQuad(p) {
      return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    }

    // --- Phase 1: Corridoio dritto ---
    const linP1 = clamp(t / phase1End, 0, 1);
    const z1 = THREE.MathUtils.lerp(zStart, zEnd, easeInOutQuad(linP1));
    const linearPos1 = new THREE.Vector3(0, 2, z1);
    const dir1 = new THREE.Vector3(0, 0, -1);

    // --- Phase 2: Giro circolare ---
    const circP = clamp((t - phase1End) / (phase2End - phase1End), 0, 1);
    const circAngle = startAngle + easeInOutQuad(circP) * Math.PI * 2;
    const circlePos = new THREE.Vector3(
      Math.cos(circAngle) * radius,
      2,
      centerZ + Math.sin(circAngle) * radius
    );
    const dir2 = new THREE.Vector3(
      -Math.sin(circAngle),
      0,
      Math.cos(circAngle)
    ).normalize();

    // --- Phase 3: Ritorno indietro ---
    const linP3 = clamp((t - phase2End) / (1 - phase2End), 0, 1);
    const z3 = THREE.MathUtils.lerp(zEnd + 15, zStart - 10, easeInOutQuad(linP3));
    const linearPos3 = new THREE.Vector3(0, 2, z3);
    const dir3 = new THREE.Vector3(0, 0, 1); // guardando indietro

    // --- Blending dinamico ---
    let finalPos, finalDir;

    if (t < phase1End) {
      // Solo corridoio
      finalPos = linearPos1;
      finalDir = dir1;
    } else if (t < phase1End + blendDuration) {
      // transizione da lineare → circolare
      const b = (t - phase1End) / blendDuration;
      finalPos = linearPos1.clone().lerp(circlePos, easeInOutQuad(b));
      finalDir = dir1.clone().lerp(dir2, easeInOutQuad(b)).normalize();
    } else if (t < phase2End - blendDuration) {
      // solo circolare
      finalPos = circlePos;
      finalDir = dir2;
    } else if (t < phase2End) {
      // transizione da circolare → lineare (ritorno)
      const b = (t - (phase2End - blendDuration)) / blendDuration;
      finalPos = circlePos.clone().lerp(linearPos3, easeInOutQuad(b));
      finalDir = dir2.clone().lerp(dir3, easeInOutQuad(b)).normalize();
    } else {
      // solo corridoio di ritorno
      finalPos = linearPos3;
      finalDir = dir3;
    }

    // --- Bobbing effetto camminata ---
    const bobAmplitude = 1.2;
    const bobFrequency = 12;
    finalPos.x += Math.sin(t * Math.PI * 2 * bobFrequency) * bobAmplitude;

    // --- Applica alla camera ---
    camera.position.copy(finalPos);
    camera.lookAt(finalPos.clone().add(finalDir));
  });

  return null;
}
