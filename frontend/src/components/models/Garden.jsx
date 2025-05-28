import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'

export function Garden(props) {
    const scroll = useScroll()
    const { nodes, materials } = useGLTF('/models/blender-components/garden-circular-empty.glb')
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // target vals
    const y = lerp(-1200, -4, animT(0.15))
    const x = lerp(300, 0, animT(0.1))
    const rotX = lerp(0, 0, animT(0.1))
    const rotY = lerp(0, -Math.PI/2, animT(0.1))

    return (
    <group 
    position={[x, y, -30]}
    rotation={[rotX, rotY, 0]}
    scale={1.5}
    dispose={null}
    {...props}
    >
     <group position={[-0.013, 1.193, -0.032]} scale={[1.996, 1, 1.99]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_3.geometry}
          material={nodes.Cylinder_3.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_4.geometry}
          material={materials['leafes_Mat.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_5.geometry}
          material={materials['trunk_Mat.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/blender-components/garden-circular-empty.glb')