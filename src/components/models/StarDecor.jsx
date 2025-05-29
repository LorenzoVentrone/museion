import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'

export function StarDecor(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/star_decor.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.15))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, 0, animT(0.1))
    return (
    <group {...props} dispose={null} position={[-15, y, -60]} rotation={[rotX, rotY, 0]} scale={15}>
        <group scale={0.01}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Stars_Material005_0.geometry}
            material={materials['Material.005']}
            position={[-3.492, 13.259, -53.617]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
        />
        </group>
    </group>
  )
}

useGLTF.preload('/models/blender-components/star_decor.glb')