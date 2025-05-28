import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function VictorianPainting(props) {
  const { nodes, materials } = useGLTF('/models/paintings/murakami.glb')
  const scroll = useScroll()
  const lerp = (a, b, t) => a + (b - a) * t
  const fastScroll = Math.min(scroll.offset / 0.1, 1)
  const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

  // Target values
  const y = lerp(200, 0.7, animT(0.1))
  const rotX = lerp(Math.PI, 0, animT(0.1))
  const rotY = lerp(Math.PI, 0, animT(0.1))

  const modelInfo = (
    <div>
      <p className="mt-4">Originally a 17th-century masterpiece, the work captures Kyoto’s urban life with intricate detail. Murakami’s version, commissioned for Kyoto’s Kyocera Museum, transforms the delicate, almost serene original into something unapologetically bold.</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Material: Canvas</li>
          <li>Period: Contemporary</li>
          <li>Author: Takashi Murakami</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ClickableModel
        info={modelInfo}
        title="Rakuchū-Rakugai-zu Byōbu (Scenes in and around Kyoto)"
        cameraTargetVec={new THREE.Vector3(0, 4, -4)}
        cameraLookAtVec={new THREE.Vector3(-7, 4, -4)}
        cameraDistance={1}
        {...props}
    >
    <group dispose={null} scale={[0.5, 1, 1]}>
        <group
            position={[-18, y, 0]}
            rotation={[rotX, rotY, 0]}
            >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials.Material}
            position={[0, 3.992, 0]}
            scale={[0.285, 3.222, 6.343]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.murakami.geometry}
            material={materials.murakami}
            position={[0.403, 4.007, 0]}
            rotation={[-Math.PI / 2, 0, 1.579]}
            scale={-4.744}
          />
        </group>
      </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/murakami.glb')
