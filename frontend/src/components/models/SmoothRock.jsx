import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'

export function SmoothRock(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/smooth_rock.glb')

    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 2, animT(0.15))
    const rotX = lerp(-Math.PI, Math.PI/8, animT(0.1))
    const rotY = lerp(-Math.PI, 0, animT(0.1))
    return (
        <group {...props} dispose={null} position={[15, y, -70]} rotation={[rotX, rotY, 0]} scale={25}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_2.geometry}
                material={materials['Material.001']}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.017}
            />
        </group>
    )
}

useGLTF.preload('/models/blender-components/smooth_rock.glb')