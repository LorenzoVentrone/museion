import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function NikeStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/nike.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(0, -Math.PI/2, animT(0.1))

    // Information to show in the panel when clicked
    const modelInfo = (
    <div>
        <p>The Winged Victory of Samothrace, or the Niké of Samothrace, is a votive monument originally discovered on the island of Samothrace in the northeastern Aegean Sea. It is a masterpiece of Greek sculpture from the Hellenistic era, dating from the beginning of the 2nd century BC (190 BC). It is composed of a statue representing the goddess Niké (Victory), whose head and arms are missing and its base is in the shape of a ship's bow.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Unknown</li>
            <li>Material: Parian Marble</li>
            <li>Technique: Carved</li>
            <li>Year: circa 200-190 BCE</li>
            <li>Location: Louvre, Paris</li>
            <li>Height: 5.57m</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="Nike of Samothrace"
        cameraTargetVec={new THREE.Vector3(18, 2, -50)}
        cameraLookAtVec={new THREE.Vector3(20, 2.4, -48)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[20, y, -50]}
        rotation={[rotX, rotY, 0]}
        scale={0.05}
    >
     <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/blender-components/nike.glb')