import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function LionStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/lion.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 1.5, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(0, -Math.PI/2, animT(0.1))

    // Information to show in the panel when clicked
    const modelInfo = (
    <div>
        <p>Said to have been found in Trastevere, near Porta Portese, Rome. Marble statues of lions were sometimes used as tomb monuments or as guardians at both ends of a large tomb facade. Like many classical Greek works of art, this statue was taken to Rome during the imperial period.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Unknown</li>
            <li>Material: Marble</li>
            <li>Technique: Carved</li>
            <li>Location: Trastevere, Private Collection</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="Lion Statue"
        cameraTargetVec={new THREE.Vector3(10, 2, -95)}
        cameraLookAtVec={new THREE.Vector3(15, 2, -103)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[7, y, -102]}
        rotation={[rotX, rotY, 0]}
        scale={1}
    >
    <group position={[3.281, 0.542, -0.944]} rotation={[-1.643, -0.043, 0.538]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.material_0}
        />
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/blender-components/lion.glb')