'use client'

import { useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useInfoPanel } from '../../context/InfoPanelContext';

export default function ClickableModel({ children, info, title }) {
  const { camera } = useThree();
  const { openPanel, closePanel, cameraShift } = useInfoPanel();
  const wheelThrottleRef = useRef(false);

  // Update camera position when cameraShift changes
  useEffect(() => {
    const originalX = camera.position.x;
    camera.position.x = originalX + cameraShift;
    return () => {
      camera.position.x = originalX;
    };
  }, [camera, cameraShift]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    // Get the distance from camera to the clicked point
    const distance = camera.position.distanceTo(e.point);
    // Only open panel if within 20 units (adjust as needed)
    if (distance < 20) {
      openPanel(title, info);
    }
  }, [camera, openPanel, title, info]);

  // Throttled onWheel event to close panel once per scroll burst, performance boost
  const handleWheel = useCallback((e) => {
    e.stopPropagation();
    if (!wheelThrottleRef.current) {
      wheelThrottleRef.current = true;
      closePanel();
      setTimeout(() => {
        wheelThrottleRef.current = false;
      }, 300);
    }
  }, [closePanel]);

  return (
    <group
      onClick={handleClick}
      onWheel={handleWheel}
      onPointerMove={(e) => {
        e.stopPropagation();
        const distance = camera.position.distanceTo(e.point);
        document.body.style.cursor = distance < 20 ? 'pointer' : 'auto';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {children}
    </group>
  );
}
