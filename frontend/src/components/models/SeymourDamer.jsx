import React from 'react'
import { useGLTF } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'

export function SeymourDamer(props) {
  // Load the Seymour Damer model
  const { scene } = useGLTF('/models/mrs_anne_seymour_damer.glb')

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
    <ClickableModel info={modelInfo} title="Seymour Damer" {...props}>
      <group dispose={null}>
        <primitive
          object={scene}
          position={[-18, -0.5, -42]}
          rotation={[0, -30.2, 0]}
          scale={1.5}
          castShadow
          receiveShadow
        />
      </group>
    </ClickableModel>
  )
}

// Preload for better performance
useGLTF.preload('/models/mrs_anne_seymour_damer.glb')
