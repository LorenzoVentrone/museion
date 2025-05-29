import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function SeymourDamer(props) {
  // Load the Seymour Damer model with access to nodes and materials, using gltfjsx
  const { nodes, materials } = useGLTF('/models/mrs_anne_seymour_damer.glb')
  const scroll = useScroll()
  const lerp = (a, b, t) => a + (b - a) * t
  const fastScroll = Math.min(scroll.offset / 0.1, 1)
  const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

  // Target values
  const y = lerp(200, -0.5, animT(0.1))
  const rotX = lerp(-Math.PI, Math.PI, animT(0.1))
  const rotY = lerp(0, Math.PI/2, animT(0.1))
  
  // Information to show in the panel when clicked
  const modelInfo = (
    <div>
      <h2>Anne Seymour Damer</h2>
      <p>Marble statue of the Hon Mrs Anne Seymour Damer (1749-1828) as the Muse of Sculpture by Giuseppe Ceracchi (1751-1801). The subject stands with her head turned to the right and her right leg extended, wearing a classical-style dress which is held by a sash tied in a bow beneath her breast. Her hair is elaborately dressed below a wreath of flowers. In the crook of her left arm she holds a statuette of a river-god, crouched and clasping a jar to his knees. Her right hand rests on his legs. The square base is integral.</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Artist: Giuseppe Ceracchi</li>
          <li>Material: Marble</li>
          <li>Technique: Carved</li>
          <li>Year: 1778</li>
          <li>Dimensions: 181 x 59 x 46 cm</li>
        </ul>
      </div>
    </div>
  )

  return (
    <ClickableModel 
      info={modelInfo}
      title="Seymour Damer"
      cameraTargetVec={new THREE.Vector3(-22, 2, -46)} // vector that tells ClickableModel where to lerp the camera @
      cameraLookAtVec={new THREE.Vector3(-28, 2, -48)} // vector that specifies where the camera points at
      cameraDistance={1} //

      {...props} >
      <group 
        position={[-27, y, -46]}
        rotation={[rotX, rotY, Math.PI]} 
        scale={1.5}
        dispose={null}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.main}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.main}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.main}
          />
        </group>
      </group>
    </ClickableModel>
  )
}

// Preload for better performance
useGLTF.preload('/models/mrs_anne_seymour_damer.glb')
