import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function GaulsStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/gauls_altemps.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(Math.PI, Math.PI/2, animT(0.1))

    // Information to show in the panel when clicked
    const modelInfo = (
    <div>
        <p>This statue is thought to be a Roman copy of an Pergamene statue that celebrated the Attalid triumphs over the Gauls. The statue depicts a man of Gallic descent piercing his own chest with a short sword, while supporting a dying woman in his other arm. It is part of a marble group involving Gallic themes, with the “Dying Gaul,” and the “Kneeling Gaul.” The statues were excavated from the Gardens of Sallust, a Roman historian.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Unknown</li>
            <li>Material: Marble</li>
            <li>Technique: Carved</li>
            <li>Year: II CE</li>
            <li>Location: Palazzo Altemps, Rome</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="Ludovisi Gaul"
        cameraTargetVec={new THREE.Vector3(-18, 2, -90)}
        cameraLookAtVec={new THREE.Vector3(-22, 2, -93)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[-23, y, -90]}
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
      </group>
    </group>
    </ClickableModel>
    )
}
useGLTF.preload('/models/blender-components/gauls_altemps.glb')
