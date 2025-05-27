import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function VictorianPainting(props) {
  const { nodes, materials } = useGLTF('/models/paintings/victorian_painting.glb')
  const scroll = useScroll()
  const lerp = (a, b, t) => a + (b - a) * t
  const fastScroll = Math.min(scroll.offset / 0.1, 1)
  const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

  // Target values
  const y = lerp(200, 2, animT(0.1))
  const rotX = lerp(Math.PI, -Math.PI/2, animT(0.1))
  const rotY = lerp(Math.PI, 0, animT(0.1))

  const modelInfo = (
    <div>
      <p>Lorem Ipsum Dolor Sit Amet</p>
      <p className="mt-4">Lorem Ipsum Dolor Sit Amet</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Material: Lorenzo Ventrone</li>
          <li>Period: Neo-Classical</li>
          <li>Author: Luca Tam</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ClickableModel
        info={modelInfo}
        title="Victorian Painting"
        cameraTargetVec={new THREE.Vector3(-5, 4, 0)}
        cameraLookAtVec={new THREE.Vector3(-7, 4, 0)}
        cameraDistance={1}
        {...props}
    >
    <group dispose={null} scale={2}>
        <group
            position={[-4.7, y, 0]}
            rotation={[rotX, rotY, Math.PI/2]}
            >
          <mesh
            receiveShadow
            geometry={nodes.Victorian_Framed_Painting_Victorian_Paintings_0.geometry}
            material={materials.Victorian_Paintings}
          />
          <mesh
            receiveShadow
            geometry={nodes.Painting_Victorian_Paintings_0.geometry}
            material={materials.Victorian_Paintings}
            position={[0.02, 0, 0]}
            scale={1.06}
          />
        </group>
      </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/victorian_painting.glb')
