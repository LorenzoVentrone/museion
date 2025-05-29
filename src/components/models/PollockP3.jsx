import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PollockP3(props) {
    const { nodes, materials } = useGLTF('/models/paintings/pollock3.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/3, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>Number 17A, an oil on fiberboard and a good example of drip painting, was painted a year after Jackson Pollock introduced his famous drip technique. The abundance of paint creates a complex color vortex where the top and bottom layers are impossible to differentiate. Smudges of yellow, blue, and black on the fiberboard help soften the image, while three nearly-parallel white brushstrokes grab our attention and direct our gaze diagonally up the image.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Paul Jackson Pollock</li>
            <li>Material: Fiberboard</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1948</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Number 17A"
        cameraTargetVec={new THREE.Vector3(-28, 2, -81)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(-33, 2, -86)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        position={[-32, y, -83]}
        rotation={[rotX, rotY, 0]}
    >
      <group position={[-0.013, 1.832, -0.367]} rotation={[1.332, 0, 0]} scale={1.774}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['number-17a_1'].geometry}
          material={materials['number-17a']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['number-17a_2'].geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/pollock3.glb')