import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export function CenterModel({ scroll = 0 }) {
  const { nodes, materials } = useGLTF('/models/woman_statue-transformed.glb')
  // Animazione: parte da più in basso e più avanti, ruota su se stessa, poi si ferma nella posizione e rotazione finale
  const fastScroll = Math.min(scroll / 0.12, 1);

  // Posizione Y: parte da -40 e arriva a 0
  const posY = useMemo(() => -40 + fastScroll * 40, [fastScroll]);
  // Posizione Z: parte da +40 e arriva a -70
  const posZ = useMemo(() => 40 + fastScroll * (-110), [fastScroll]); // da 40 a -70
  // Rotazione Y: parte da 4 giri e arriva a Math.PI
  const rotY = useMemo(() => Math.PI + (1 - fastScroll) * Math.PI * 4, [fastScroll]);
  // Rotazione X e Z: come nel modello originale
  const rotX = Math.PI / 2;
  const rotZ = Math.PI;

  return (
    <group dispose={null}>
      <mesh 
        geometry={nodes.WomanRockLow_WorldGridMaterial_0.geometry} 
        material={materials.WorldGridMaterial} 
        position={[0, posY, posZ]} 
        rotation={[rotX, rotY, rotZ]} 
        scale={[0.3, 0.3, 0.3]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('/models/woman_statue-transformed.glb')