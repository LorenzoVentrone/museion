import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'


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

  
  const modelInfo = (
    <div>
      <p>This magnificent statue represents the centerpiece of our collection.</p>
      <p className="mt-4">Created in the classical style, it exemplifies the beauty 
      and grace of traditional sculpture while maintaining a contemporary relevance.</p>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Material: White Marble</li>
          <li>Period: Classical</li>
          <li>Height: 2.1 meters</li>
          <li>Author: Rudolph Tegner</li>
        </ul>
      </div>
    </div>
  );

  return (
    <ClickableModel info={modelInfo} title="Sepulchral Monument to the Artist's Mother">
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
    </ClickableModel>
  )
}

useGLTF.preload('/models/woman_statue-transformed.glb')
