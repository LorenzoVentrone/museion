import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PollockP1(props) {
    const { nodes, materials } = useGLTF('/models/paintings/pollock1.glb')
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
        <p>Finished just after Pollock's first exhibition in 1943 at Peggy Guggenheim's New York gallery, Art of This Century, Pasiphae is the largest of the painter's mythologically themed pictures of the mid-1940s. Originally named Moby Dick, the picture was retitled before it was exhibited in 1944 when James Johnson Sweeney, a curator at the Museum of Modern Art, related the story of the Cretan princess Pasiphae who gave birth to the half-man, half-bull Minotaur.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Paul Jackson Pollock</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1943</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Pasiphae"
        cameraTargetVec={new THREE.Vector3(-27, 2, -53)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(-30, 2, -54)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        title="Pollock Painting"
        position={[-30, y, -53]}
        rotation={[rotX, rotY, 0]}
    >
        <group position={[0.012, 1.861, -0.381]} rotation={[-1.805, 0, 0]} scale={1.88}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.pasiphae_1.geometry}
            material={materials.pasiphae}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.pasiphae_2.geometry}
            material={materials['Scene_-_Root']}
        />
        </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/pollock1.glb')