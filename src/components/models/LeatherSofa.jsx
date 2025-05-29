import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'

export function LeatherSofa(props) {
    const { nodes, materials } = useGLTF('/models/blender-components/leather_bench.glb')

    const scroll = useScroll()
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // Target values
    const y = lerp(200, 0.5, animT(0.15))
    const rotX = lerp(-Math.PI, 0, animT(0.1))
    const rotY = lerp(-Math.PI, Math.PI/2, animT(0.1))
    return (
        <group {...props} dispose={null} position={[5, y, 8]} rotation={[rotX, rotY, 0]} scale={[0.5, 0.3, 0.3]}>
         <group position={[0.854, -2.343, 12.203]} scale={0.753}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube32_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[-10.722, 0.888, -3.443]}
          scale={[0.707, 1.96, 0.634]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube29_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[-11.917, 4.852, -0.486]}
          scale={[1.613, 6.242, 8.059]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder7_LeatherBench_Pillow_0.geometry}
          material={materials.LeatherBench_Pillow}
          position={[-9.848, 6.582, -0.383]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 3.611, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCylinder10_LeatherBench_Pillow_0.geometry}
          material={materials.LeatherBench_Pillow}
          position={[10.12, 6.582, -0.383]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1, 3.611, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube109_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[11.988, 4.852, -0.486]}
          scale={[1.613, 6.242, 8.059]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube110_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[-10.722, 0.888, 2.52]}
          scale={[0.707, 1.96, 0.634]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube111_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[10.757, 0.888, 2.52]}
          scale={[0.707, 1.96, 0.634]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube112_LeatherBench_Side_0.geometry}
          material={materials.LeatherBench_Side}
          position={[10.757, 0.888, -3.443]}
          scale={[0.707, 1.96, 0.634]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LP1_LeatherBench_Seat_0.geometry}
        material={materials.LeatherBench_Seat}
        position={[0.14, 0.998, 11.836]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1.215, 4.934, 5.897]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pCube108_LeatherBench_Wood_0.geometry}
        material={materials.LeatherBench_Wood}
        position={[0.805, 0, 13.578]}
        scale={[17.625, 1, 0.971]}
      />
    </group>
    )
}

useGLTF.preload('/models/blender-components/leather_bench.glb')