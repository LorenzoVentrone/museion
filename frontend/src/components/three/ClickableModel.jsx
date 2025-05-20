'use client'

import React, { useCallback, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInfoPanel } from '../../context/InfoPanelContext';

export default function ClickableModel({ children, info, title, photos = [] }) {
  const camera = useThree(state => state.camera);
  const { panelInfo, openPanel, closePanel } = useInfoPanel();
  const meshRef = useRef();
  

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
      openPanel(title, info);
    }
  }, [camera, openPanel, title, info]);
  
  // Prevent scroll wheel events when statue is selected
  useEffect(() => {
    const isSelected = panelInfo.isOpen && panelInfo.title === title;
    
    if (isSelected) {
      // Wheel event handler that prevents default scrolling
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      
      // Add event listener with passive: false to allow preventDefault
      window.addEventListener('wheel', preventScroll, { passive: false });
      
      return () => {
        // Clean up by removing the event listener
        window.removeEventListener('wheel', preventScroll);
      };
    }
  }, [panelInfo.isOpen, panelInfo.title, title]);

  useFrame(() => {
    if (!meshRef.current || !originalPositionRef.current) return;

    const isSelected = panelInfo.isOpen && panelInfo.title === title;
    if (isSelected) {
      // Lift by 2 units on Y axis only
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalPositionRef.current.y + 0.06,
        0.1
      );
      
    } else {
      // Restore Y position only
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalPositionRef.current.y,
        0.1
      );
    }
  });
    
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

    >
      {children} 
    </group>
  );
}