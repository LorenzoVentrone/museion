'use client'

import React, { useCallback, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInfoPanel } from '../../context/InfoPanelContext';

export default function ClickableModel({ children, info, title, photos = [] }) {
  const camera = useThree(state => state.camera);
  const controls = useThree(state => state.controls);
  const { panelInfo, openPanel, closePanel } = useInfoPanel();
  const meshRef = useRef();
  
  // Store rotation angle for continuous animation
  const rotationRef = useRef(0);

  // Store the original transformation on mount.
  const originalRotationRef = useRef();
  const originalPositionRef = useRef();
  useEffect(() => {
    if (meshRef.current) {
      originalRotationRef.current = meshRef.current.rotation.clone();
      originalPositionRef.current = meshRef.current.position.clone();
    }
  }, []);

  // When clicked, open panel. (This marks the model as being selected.)
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    const distance = camera.position.distanceTo(e.point);
    if (distance < 20) {
      openPanel(title, info, photos);
    }
  }, [camera, openPanel, title, info, photos]);

  useFrame((state, delta) => {
    if (!meshRef.current || !originalPositionRef.current) return;

    const isSelected = panelInfo.isOpen && panelInfo.title === title;
    if (isSelected) {
      // Lift by 2 units on Y axis only
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalPositionRef.current.y + 0.5,
        0.1
      );
      
    } else {
      // Restore Y position only
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalPositionRef.current.y,
        0.1
      );
      
      // Restore original Y rotation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        originalRotationRef.current.y,
        0.1
      );
    }
  });

  // Determine if this model is selected
  const isSelected = panelInfo.isOpen && panelInfo.title === title;
  
  return (
    <group
      ref={meshRef}
      onClick={handleClick}
      onPointerMissed={(e) => {
        e.stopPropagation();
      }}
      // Change cursor based on state
      onPointerEnter={() => document.body.style.cursor = 'pointer'}
      onPointerLeave={() => document.body.style.cursor = 'auto'}
      renderOrder={isSelected ? 1 : 0} /* draw on top of the blurred panel */
    >
      {children} 
    </group>
  );
}
