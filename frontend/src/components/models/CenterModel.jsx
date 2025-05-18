import React from 'react'
import { useGLTF } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'

const photoUrls = [
  '/images/centermodel/sepulchlar.jpg',
  '/images/centermodel/sepulchlar2.jpg',
  '/images/centermodel/sepulchlar3.jpg'
];

export function CenterModel(props) {
  const { nodes, materials } = useGLTF('/models/woman_statue-transformed.glb')
  
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
    <ClickableModel info={modelInfo} title="Sepulchral Monument to the Artist's Mother" photos={photoUrls}>
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
    </ClickableModel>
  )
}

useGLTF.preload('/models/woman_statue-transformed.glb')
