import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'
import * as THREE from 'three'


export function PollockP4(props) {
    const { nodes, materials } = useGLTF('/models/paintings/pollock4.glb')
    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, -2, animT(0.15))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, 0, animT(0.1))


    // Information to show in the panel when clicked
  const modelInfo = (
    <div>
        <p>It was not for nothing that white was chosen as the vestment of pure joy and immaculate purity. And black as the vestment of the greatest, most profound mourning and as the symbol of death. The balance between these two colors that is achieved by mechanically mixing them together forms gray. Naturally enough, a color that has come into being in this way can have no external sound, nor display any movement. Gray is toneless and immobile. This immobility, however, is of a different character from the tranquility of green, which is the product of two active colors and lies midway between them. Gray is therefore the disconsolate lack of motion. The deeper this gray becomes, the more the disconsolate element is emphasized, until it becomes suffocating. ”- Wassily Kandinsky, On the Spiritual in Art</p>
        <div className="mt-4">
        <h3 className="text-lg font-semibold">Details</h3>
        <ul className="list-disc ml-5 mt-2">
            <li>Artist: Paul Jackson Pollock</li>
            <li>Material: Fiberboard</li>
            <li>Technique: Oil Painting</li>
            <li>Year: 1953</li>
        </ul>
        </div>
    </div>
  )

  return (
    <ClickableModel 
        info={modelInfo}
        title="Number 14: Gray"
        cameraTargetVec={new THREE.Vector3(8, 3, 54)} // vector that tells ClickableModel where to lerp the camera @
        cameraLookAtVec={new THREE.Vector3(8, 3, 51)} // vector that specifies where the camera points at
        cameraDistance={1} // distance of the camera from the model
        {...props} >
    <group
        {...props}
        dispose={null}
        position={[8.5, y, 51]}
        rotation={[rotX, rotY, 0]}
        scale={4}   
    >
      <group name="Scene">
        <group
          name="Group001_157"
          position={[-1.391, -0.694, 1.942]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.001}
        />
        <group
          name="Box032_158"
          position={[-1.12, -1.203, 1.957]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.001}
        />
        <group
          name="Box033_159"
          position={[-1.12, -0.935, 1.957]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.001}
        />
        <group
          name="Box034_160"
          position={[-1.124, -0.313, 1.949]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.001}
        />
        <group
          name="Box047_161"
          position={[-1.12, -0.727, 1.957]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.001}
        />
        <group
          name="Box035_164"
          position={[-1.117, -0.359, 1.915]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={0.001}
        />
        <group
          name="62x82frame002_436"
          position={[-0.446, 1.53, -2.922]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <group
          name="shimmering-substance"
          position={[-0.445, 1.376, -0.483]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.753, 0.753, 0.809]}>
          <mesh
            name="shimmering-substance_1"
            castShadow
            receiveShadow
            geometry={nodes['shimmering-substance_1'].geometry}
            material={materials['shimmering-substance']}
          />
          <mesh
            name="shimmering-substance_2"
            castShadow
            receiveShadow
            geometry={nodes['shimmering-substance_2'].geometry}
            material={materials['Oak.FRAME']}
          />
        </group>
      </group>
    </group>
    </ClickableModel>
  )
}

useGLTF.preload('/models/paintings/pollock4.glb')