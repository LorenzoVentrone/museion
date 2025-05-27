import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function IndoorPlant(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/rhyzome_plant.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(Math.PI, 0, animT(0.1))


    return (
    <group {...props}>
        <group 
            dispose={null}
            position={[-6, y, -23]}
            rotation={[rotX, rotY, 0]}
            scale={0.04}
        >
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.concrete_pot_lambert3_0.geometry}
            material={materials.lambert3}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.plant_lambert2_0.geometry}
            material={materials.lambert2}
        />
        </group>
    </group>
  )
}

useGLTF.preload('/models/blender-components/rhyzome_plant.glb')