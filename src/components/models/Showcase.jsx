import React, { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF, useScroll } from '@react-three/drei'
import ClickableModel from '../three/ClickableModel'

export function Showcase(props) {
// Dimensions for the showcase (adjust as needed)
    const width = 6      // Long edge (horizontal)
    const depth = 2    // Short edge (depth)
    const glassHeight = 1     // Height of the glass walls
    const baseHeight = 1.5    // Height of the white base (bottom)
    const topThickness = 0.1  // Thickness of the top cover
    const wallThickness = 0.05

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
        <p>Small collection of small statues from around the World. From left to right: Thai icon, Nandi, Egyptian woman, Buddha.</p>
            <div className="mt-4">
            <h3 className="text-lg font-semibold">Details</h3>
                <ul className="list-disc ml-5 mt-2">
                    <li>Material: Clay, Marble, Bronze, Stone</li>
                    <li>Technique: Carved</li>
                    <li>Year: Various</li>
                    <li>Location: Thailand, India, Egypt, Nepal</li>
                </ul>
            </div>
    </div>
    )
  
  // Materials (using useMemo so they aren’t recreated every render)
  const floorMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xffffff }),
    []
  )
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transparent: true,
        opacity: 0.5,
        transmission: 1,           // gives a glass-like refraction effect
        clearcoat: 1,
        clearcoatRoughness: 0,
        ior: 4
      }),
    []
  )

  const nandi = useGLTF('/models/blender-components/nandi.glb')
  const small_buddha = useGLTF('/models/blender-components/small_buddha_statue.glb')
  const small_egypt = useGLTF('/models/blender-components/small_egypt.glb')
  const small_staue = useGLTF('/models/blender-components/small_statue.glb')

  return (
    <ClickableModel
        info={modelInfo}
        title="World Collection Showcase"
        cameraTargetVec={new THREE.Vector3(-2, 3, 40)}
        cameraLookAtVec={new THREE.Vector3(-8, 2, 40)}
        cameraDistance={1}
    >
    <group {...props} position={[-8, y, 40]} rotation={[rotX, rotY, 0]}>
      {/* White Base (Bottom) */}
      <mesh material={floorMaterial} position={[0, baseHeight/2, 0]}>
        <boxGeometry args={[width, baseHeight, depth]} />
      </mesh>

      {/* Glass Panels - Their bottom is at y = baseHeight, top at y = baseHeight + glassHeight */}
      {/* Front Glass Panel */}
      <mesh
        material={glassMaterial}
        position={[0, baseHeight + glassHeight/2, depth/2 - wallThickness/2]}
      >
        <boxGeometry args={[width, glassHeight, wallThickness]} />
      </mesh>

      {/* Left Glass Panel */}
      <mesh
        material={glassMaterial}
        position={[-width/2 + wallThickness/2, baseHeight + glassHeight/2, 0]}
      >
        <boxGeometry args={[wallThickness, glassHeight, depth]} />
      </mesh>

      {/* Right Glass Panel */}
      <mesh
        material={glassMaterial}
        position={[width/2 - wallThickness/2, baseHeight + glassHeight/2, 0]}
      >
        <boxGeometry args={[wallThickness, glassHeight, depth]} />
      </mesh>

      {/* Glass Top Cover */}
      <mesh
        material={glassMaterial}
        position={[0, baseHeight + glassHeight + topThickness/2, 0]}
      >
        <boxGeometry args={[width, topThickness, depth]} />
      </mesh>
      {/* Models inside the showcase */}
      {/* Imported directly from the GLTF files without creating new files */}
      <group position={[0, baseHeight + glassHeight / 2, 0]}>
        <primitive object={small_staue.scene} position={[2, -0.5, 0]} scale={0.4} rotation={[0, Math.PI, 0]} />
        <primitive object={small_buddha.scene} position={[1, -0.24, 0]} scale={100} rotation={[0, -Math.PI/4, 0]}/>
        <primitive object={nandi.scene} position={[-0.2, -0.5, 0.4]} scale={0.6} rotation={[0, Math.PI, 0]} />
        <primitive object={small_egypt.scene} position={[-1.5, -0.5, 0]} scale={0.03} rotation={[0, Math.PI/2, 0]} />
      </group>
    </group>
    </ClickableModel>
  )
}