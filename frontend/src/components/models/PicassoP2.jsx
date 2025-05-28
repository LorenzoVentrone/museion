import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PicassoP2(props) {
    const { nodes, materials } = useGLTF('/models/paintings/picasso2.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI-0.8, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>"Don Quixote is a 1955 sketch by Pablo Picasso of the Spanish literary hero and his sidekick, Sancho Panza. It was featured on the August 18-24 issue of the French weekly journal Les Lettres Françaises in celebration of the 350th anniversary of the first part, published in 1605, of the Miguel de Cervantes novel Don Quixote. Made on August 10, 1955, the drawing Don Quixote was in a very different style than Picasso's earlier Blue, Rose, and Cubist periods.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Pablo Picasso</li>
            <li>Material: Canvas</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1932</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Don Quixote"
        cameraTargetVec={new THREE.Vector3(17, 3, -85)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(25, 5, -95)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        title="Pollock Painting"
        position={[23, y, -95]}
        rotation={[rotX, rotY, 0]}
        scale={0.7}
    >
        <group {...props} dispose={null}>
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
        geometry={nodes['don-quixote'].geometry}
        material={materials['don-quixote']}
        position={[0, 9.794, -0.095]}
        rotation={[1.572, 0, 0]}
        scale={12.729}
      />
    </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/picasso2.glb')