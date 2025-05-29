import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function ThaliaStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/muse_thalia.glb')

    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI, animT(0.1))

    const modelInfo = (
    <div>
      <p>Thalia is the Greek goddess of comedy and idyllic poetry. In this context, her name means 'flourishing', because the praises in her songs flourish through time. She was the daughter of Zeus and Mnemosyne. She was portrayed as a young woman with a joyous air, crowned with ivy, wearing boots and holding a comic mask in her hand.</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
          <li>Artist: Unknown</li>
          <li>Material: Marble</li>
          <li>Technique: Carved</li>
          <li>Year: 117-138 CE</li>
          <li>Original Location: Villa of Cassius, Tivoli</li>
        </ul>
      </div>
    </div>
  )

    return (
    <ClickableModel
        info={modelInfo}
        title="Statue of Muse Thalia"
        cameraTargetVec={new THREE.Vector3(-27, 2, -58)}
        cameraLookAtVec={new THREE.Vector3(-35, 2, -62)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[-34, y, -60]}
        rotation={[rotX, rotY, 0]}
        scale={2}
    >
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials['Thalia-Material']}
        />
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials['Thalia-Material']}
        />
        <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['Thalia-Material']}
        />
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/blender-components/muse_thalia.glb')