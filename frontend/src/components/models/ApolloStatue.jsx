import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function ApolloStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/statue_apollo.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(0, Math.PI/9, animT(0.1))

    // Information to show in the panel when clicked
    const modelInfo = (
    <div>
        <p>The impassive, square-shouldered Apollo is an early and powerful exemplar of the hard, simplified realism of the early classical period. The naked god stood in the centre of the west pediment of the temple, with his right arm extended in an imperious gesture to calm a battle of Greeks and Centaurs that raged around him. The left hand held his separately added bow. The unfinished back has a cutting for attaching the figure to the pediment wall. The statue was carved in high-quality marble from the Aegean island of Paros and is presented here in a plaster cast.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Unknown</li>
            <li>Material: Plaster cast</li>
            <li>Technique: Carved</li>
            <li>Year: circa 460BC</li>
            <li>Location: Temple of Zeus, Olympia, Greece</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="Statue of Apollo"
        cameraTargetVec={new THREE.Vector3(-6, 2, -98)}
        cameraLookAtVec={new THREE.Vector3(-6, 2.4, -100)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[-8, y, -105]}
        rotation={[rotX, rotY, 0]}
        scale={0.4}
    >
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.Apollo_Ashmolean_Museum}
        rotation={[3.137, 0, -0.002]}
        />
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/blender-components/statue_apollo.glb')