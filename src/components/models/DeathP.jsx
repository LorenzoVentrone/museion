import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function DeathP(props) {
    const { nodes, materials } = useGLTF('/models/paintings/death_painting.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 3.5, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/2, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>Here Death gently closes the eyes of the man. It is without any doubt curious that Malczewski left Death slightly incomplete, to symobolize the fleeting nature of Death, the invisible force. The lack of surface detail on her face in the general area of the nose evokes a sense of uneasiness.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist:  Jacek Malczewski</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1902</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Death"
        cameraTargetVec={new THREE.Vector3(-2, 3, 11)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(-8, 3, 11)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        position={[-9, y, 13]}
        rotation={[rotX, rotY, 0]}
    >
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.662}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, -Math.PI]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Painting_1_0.geometry}
              material={materials.material}
              position={[0.11, 0.105, 0]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wall_5_0.geometry}
            material={materials.material_1}
            position={[-0.006, 0, -0.023]}
            rotation={[0, 0, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Back_3_0.geometry}
            material={materials.material_2}
            position={[-0.006, 0, -0.005]}
            rotation={[-Math.PI, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Rama_2_0.geometry}
            material={materials.material_3}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/death_painting.glb')