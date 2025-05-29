import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PicassoP1(props) {
    const { nodes, materials } = useGLTF('/models/paintings/picasso1.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI-0.2, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>"Girl Before a Mirror" is a Cubist painting by Pablo Picasso created in 1932, depicting his mistress Marie-Thérèse Walter. The painting divides the subject into two distinct representations: a more youthful and gentle version and a more mature, almost distorted reflection. The mirror itself is depicted with a choppy, almost abstract style, contrasting with the more naturalistic rendering of Marie-Thérèse.</p>
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
        title="Girl Before a Mirror"
        cameraTargetVec={new THREE.Vector3(3, 3, -98)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(4, 4, -106)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        title="Pollock Painting"
        position={[2, y, -106]}
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
            geometry={nodes.girl_before_mirror.geometry}
            material={materials.girl_before_mirror}
            position={[0, 7.843, -0.062]}
            rotation={[1.57, 0, 0]}
            scale={9.709}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials['Material.002']}
            position={[0.015, 0.55, 0.265]}
            scale={2.178}
        />
        </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/picasso1.glb')