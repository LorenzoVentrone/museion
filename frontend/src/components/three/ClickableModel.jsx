'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInfoPanel } from '../../context/InfoPanelContext';

export default function ClickableModel({ 
  children, 
  info, 
  title,
  // New parameters for camera control
  cameraTargetVec = new THREE.Vector3(5, 5, 5), // dummy default camera position
  cameraSpeed = 0.05,
  cameraLookAtVec = null,
}) {
  const { camera } = useThree();
  const { panelInfo, openPanel } = useInfoPanel();
  const groupRef = useRef();
  const meshRef = useRef();
  const [isSelected, setIsSelected] = useState(false);

  // store camera's state to return to when model is deselected
  const originalCameraPositionRef = useRef(null);
  const originalCameraQuaternionRef = useRef(null);
  
  // Store the model's original local position (relative to its parent groupRef)
  const originalModelPositionRef = useRef();


  useEffect(() => {
    if (meshRef.current) {
      originalModelPositionRef.current = meshRef.current.position.clone();
    }
  }, []);

  // When clicked, open panel and set camera target
  const handleClick = useCallback((e) => {
    e.stopPropagation();
    const distance = camera.position.distanceTo(e.point);
    if (distance < 20) {
      // Store initial camera state
      
      // Set selected state
      setIsSelected(true);
      if (!originalCameraQuaternionRef.current) {
        originalCameraPositionRef.current = camera.position.clone();
        originalCameraQuaternionRef.current = camera.quaternion.clone();
      }
      openPanel(title, info);
    }
  }, [camera, openPanel, title, info]);
  
  // Prevent scroll wheel events when statue is selected
  useEffect(() => {
    const isModelSelected = panelInfo.isOpen && panelInfo.title === title; // reduntancy check
    
    if (isModelSelected) {
      // Wheel event handler that prevents default scrolling
      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };
      // Add event listener with passive: false to allow preventDefault
      window.addEventListener('wheel', preventScroll, { passive: false });
      document.body.style.overflow = 'hidden'; // hide body scrollbar

      return () => {
        // Clean up by removing the event listener
        window.removeEventListener('wheel', preventScroll);
        document.body.style.overflow = 'auto';
      };
    }
  }, [panelInfo.isOpen, panelInfo.title, title]);

  // Update isSelected state based on panel info
  useEffect(() => {
    setIsSelected(panelInfo.isOpen && panelInfo.title === title);
  }, [panelInfo.isOpen, panelInfo.title, title]);

  // Animation for camera movement and model hover
  useFrame(() => {
    if (!meshRef.current || !originalModelPositionRef.current || !groupRef.current) return;

    // Handle model position animation (floating effect)
    if (isSelected) {
      // this check is to ensure that if the info panel was opened by other means,
      // or if this is the first frame of selection after a click, 
      // we capture the camera's current state to return to.
      if (!originalCameraPositionRef.current) {
      originalCameraPositionRef.current = camera.position.clone();
      originalCameraQuaternionRef.current = camera.quaternion.clone();
    } 
      // Lift by 0.06 units on Y axis only
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalModelPositionRef.current.y + 0.06,
        0.1
      );
      
      // --- Camera animation (move to target position and look at model) ---
      // Get the world position of the model
      const modelWorldPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(modelWorldPosition);
      
      // cameraTargetVec is the target world-space position for the camera
      const targetCameraPosition = cameraTargetVec;
      // lerp to the viewpoint
      camera.position.lerp(targetCameraPosition, cameraSpeed);
      
      // use cameraLookAtVec to compute the camera's final orientation
      const finalLookAt = cameraLookAtVec ? cameraLookAtVec : modelWorldPosition;
      // smoothly orient the camera to look at the model's world position
      const targetQuaternion = new THREE.Quaternion(); // use Quaternion to rotate obj's without dealing with gimbal lock issues
      const tempLookAtMatrix = new THREE.Matrix4(); // identity matrix
      tempLookAtMatrix.lookAt(camera.position, finalLookAt, camera.up);
      targetQuaternion.setFromRotationMatrix(tempLookAtMatrix);
      camera.quaternion.slerp(targetQuaternion, cameraSpeed);

    } else {
      // Restore Y position when not selected
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        originalModelPositionRef.current.y, // restore original Y here
        0.1 // model homing animation speed 
      );
      // --- camera animation (return to original state)
      if (originalCameraQuaternionRef.current && originalCameraPositionRef.current) {
        camera.position.lerp(originalCameraPositionRef.current, cameraSpeed);
        camera.quaternion.slerp(originalCameraQuaternionRef.current, cameraSpeed);
        // Check if the camera is close enough to its original state
        const posThresholdSq = 0.0001 * 0.0001;  // squared distance thresh
        const quatDotThreshold = 1.0 - 0.00001; // dot product close to 1 (cos of theta angle when theta is small (Taylor))

        if (
          camera.position.distanceToSquared(originalCameraPositionRef.current) < posThresholdSq &&
          Math.abs(camera.quaternion.dot(originalCameraQuaternionRef.current)) > quatDotThreshold) {
            // snap to final state and clear refs to stop controlling the camera
            camera.position.copy(originalCameraPositionRef.current);
            camera.quaternion.copy(originalCameraQuaternionRef.current);
            originalCameraPositionRef.current = null;
            originalCameraQuaternionRef.current = null;
          }
        }
      }
  });

  // Reset camera when panel closes
  useEffect(() => {
    const wasSelected = isSelected && !panelInfo.isOpen;
    
    if (wasSelected && originalCameraQuaternionRef.current) {
      setIsSelected(false);
    }
  }, [panelInfo.isOpen, isSelected]);
    
  return (
    <group ref={groupRef}>
      <group
        ref={meshRef}
        onClick={handleClick}
        onPointerMissed={(e) => {
          e.stopPropagation();
        }}
        // Change cursor based on state
        onPointerEnter={() => {document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => {document.body.style.cursor = 'auto'; }}
      >
        {children} 
      </group>
    </group>
  );
}