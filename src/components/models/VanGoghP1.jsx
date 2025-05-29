import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function VanGoghP1(props) {
    const { nodes, materials } = useGLTF('/models/paintings/vangogh1.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/2.4, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>"Van Gogh saw the Potato Eaters as a showpiece, for which he deliberately chose a difficult composition to prove he was on his way to becoming a good figure painter. The painting had to depict the harsh reality of country life, so he gave the peasants coarse faces and bony, working hands. He wanted to show in this way that they 'have tilled the earth themselves with these hands they are putting in the dish ... that they have thus honestly earned their food'.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Vincent Van Gogh</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1885</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Potato Eaters"
        cameraTargetVec={new THREE.Vector3(27, 3, -65)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(35, 5, -63)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        position={[35, y, -65]}
        rotation={[rotX, rotY, 0]}
        scale={0.6}
    >
     <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.002']}
        position={[-1.547, 0.029, -1.28]}
        rotation={[1.599, 0.097, 2.361]}
        scale={[-0.295, -1.919, -0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.002']}
        position={[1.562, 0.029, -1.28]}
        rotation={[1.599, -0.097, -2.361]}
        scale={[-0.295, -1.919, -0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-0.001, 4.275, 0.174]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[1.192, 35.014, 1.192]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.002']}
        position={[0.015, 0.55, 0.265]}
        scale={2.178}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.potato_eaters.geometry}
        material={materials.potato_eaters}
        position={[0, 10.005, -0.104]}
        rotation={[1.571, 0, 0]}
        scale={10.225}
      />
    </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/vangogh1.glb')