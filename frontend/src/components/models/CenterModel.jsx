import React from 'react'
import { useGLTF } from '@react-three/drei'

export function CenterModel(props) {
  const { nodes, materials } = useGLTF('/models/woman_statue-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.WomanRockLow_WorldGridMaterial_0.geometry} 
        material={materials.WorldGridMaterial} 
        position={[0, 0, -70]} 
        rotation={[Math.PI / 2, Math.PI, Math.PI]} 
        scale={[0.3, 0.3, 0.3]}
        castShadow
        receiveShadow/>
    </group>
  )
}

useGLTF.preload('/models/woman_statue-transformed.glb')
