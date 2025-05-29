import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function ThreeGracesStatue(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/the_three_graces.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, -1, animT(0.1))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/2, animT(0.1))

    const modelInfo = (
    <div>
        <p>The Three Graces, celebrated in classical literature and art, were the daughters of Jupiter (or Zeus in Greek mythology), and companions to the Muses. Thalia (youth and beauty) is accompanied by Euphrosyne (mirth), and Aglaia (elegance).It was commissioned from Antonio Canova by John Russel, 6th Duke of Bedford, who visited the sculptor in his studio in Rome in 1814, and was captivated by the group of the Three Graces which Canova had carved for the Empress Josephine, the estranged wife of Napoleon Bonaparte.</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Antonio Canova</li>
            <li>Material: Marble</li>
            <li>Technique: Carved</li>
            <li>Year: 1813-1814 CE</li>
            <li>Original Location: Ny Carlsberg Glypotek</li>
        </ul>
        </div>
    </div>
    )

    return (
    <ClickableModel
        info={modelInfo}
        title="The Three Graces"
        cameraTargetVec={new THREE.Vector3(-30, 2, -77)}
        cameraLookAtVec={new THREE.Vector3(-35, 2.2, -77)}
        cameraDistance={1}
    >
    <group 
        {...props}
        dispose={null}
        position={[-35, y, -75]}
        rotation={[rotX, rotY, 0]}
        scale={0.22}
        >
        <group rotation={[-0.038, -0.647, -3.132]}>
        <group position={[-8.923, -24.136, -5.581]}>
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Material_0}
            />
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Material_0}
            />
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Material_0}
            />
            <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.Material_0}
            />
        </group>
        </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/blender-components/the_three_graces.glb')