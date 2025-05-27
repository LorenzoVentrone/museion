import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PollockP2(props) {
    const { nodes, materials } = useGLTF('/models/paintings/pollock2.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/2, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>Jackson Pollock's style of painting, as exemplified by Convergence, is an important, innovative development in the history of painting. At the time of the painting, the United States took very seriously the threat of Communism and the cold war with Russia. Convergence was the embodiment of free speech and freedom of expression. Pollock threw mud in the face of convention and rebelled against the constraints of society's oppression. It was everything that America stood for all wrapped up in a messy, but deep package.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Paul Jackson Pollock</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1952</li>
        </ul>
        </div>
    </div>
  )
  

  return (
    <ClickableModel
        info={modelInfo}
        title="Convergence"
        cameraLookAtVec={new THREE.Vector3(-33, 2, -65)}
        cameraTargetVec={new THREE.Vector3(-30, 2, -65)}
        {...props} >
    <group 
        {...props}
        dispose={null}
        position={[-33, y, -65]}
        rotation={[rotX, rotY, 0]} 
        scale={1.3}>
      <group position={[0.007, 1.683, -0.348]} rotation={[1.333, 0, 0]} scale={1.53}>
        <mesh castShadow receiveShadow geometry={nodes.as_1.geometry} material={materials.as} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.as_2.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/pollock2.glb')

