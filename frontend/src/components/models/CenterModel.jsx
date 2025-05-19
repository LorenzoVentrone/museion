import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'


export function CenterModel(props) {
  const { nodes, materials } = useGLTF('/models/woman_statue-transformed.glb')
  const scroll = useScroll()
  const lerp = (a, b, t) => a + (b - a) * t
  const fastScroll = Math.min(scroll.offset / 0.1, 1)
  const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

  // Target values
  const y = lerp(200, 0, animT(0.1))
  const rotX = lerp(Math.PI, Math.PI / 2, animT(0.1))
  const rotY = lerp(0, Math.PI, animT(0.1))

  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.WomanRockLow_WorldGridMaterial_0.geometry} 
        material={materials.WorldGridMaterial} 
        position={[0, y, -70]} 
        rotation={[rotX, rotY, Math.PI]} 
        scale={[0.3, 0.3, 0.3]}
        castShadow
        receiveShadow/>
    </group>
  )
}

useGLTF.preload('/models/woman_statue-transformed.glb')
