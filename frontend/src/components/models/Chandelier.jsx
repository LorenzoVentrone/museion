import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function Chandelier(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/chandelier.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 20, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(0, Math.PI/9, animT(0.1))

    return (
    <group {...props} dispose={null} position={[0, y, -70]} rotation={[rotX, rotY, 0]}>
        
        <group scale={7}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.deng_yuanhuandeng_t_0.geometry}
            material={materials.yuanhuandeng_t}
        />
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.hei_yuanhuandeng_t_0.geometry}
            material={materials.yuanhuandeng_t}
        />
        </group>
    </group>
  )
}

useGLTF.preload('/models/blender-components/chandelier.glb')