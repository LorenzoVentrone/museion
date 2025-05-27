import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'

export function AthenaAltar(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/athena_pergamon-v1.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))
  
    // Target values
    const y = lerp(200, 0, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(Math.PI, -Math.PI/2, animT(0.1))

    // Information to show in the panel when clicked
    const modelInfo = (
    <div>
        <p>This frieze depicts Athena grasping the giant Acyoneus by his hair as she prepares to slay him. On the right, Acyoneus’ mother watches in horror and above her, Nike prepares to crown Athena in victory. This altar was built as a commemoration of King Eumene II’s victory over the Gauls. It was later excavated in Turkey and taken to Berlin.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Unknown</li>
            <li>Material: Marble</li>
            <li>Technique: Carved</li>
            <li>Year: II BCE</li>
            <li>Location: Statens Museum for Kunst, Copenhagen</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="Great Altar of Zeus and Athena at Pergamon"
        cameraTargetVec={new THREE.Vector3(25, 2, -81)}
        cameraLookAtVec={new THREE.Vector3(30, 2, -80)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[33, y, -85]}
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
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_11.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_12.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_13.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
    </ClickableModel>
    )
}
useGLTF.preload('/models/blender-components/athena_pergamon-v1.glb')
