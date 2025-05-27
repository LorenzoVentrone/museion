import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PollockP5(props) {
    const { nodes, materials } = useGLTF('/models/paintings/pollock5.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.15))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, 0, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>Shimmering Substance glows with the brilliant light of midday sun on a thick meadow. Alive with arcs and orbs of heat-saturated colors, the painting channeled primal forces into radically new artistic expression and was Pollock's next step in coming to terms with the inner turmoil that compelled him to paint.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Paul Jackson Pollock</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1945</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Untitled"
        cameraTargetVec={new THREE.Vector3(-17, 3, -93)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(-16, 3, -99)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        position={[-18, y, -99]}
        rotation={[rotX, rotY, 0]}
        scale={2}   
    >
      <group position={[0, 2.158, -0.449]} rotation={[1.338, 0, 0]} scale={2.458}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['the-deep_1'].geometry}
          material={materials['the-deep']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['the-deep_2'].geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/pollock5.glb')