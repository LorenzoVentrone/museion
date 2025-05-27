import React from 'react'
import { useGLTF, useScroll } from '@react-three/drei'

export function Garden(props) {
    const scroll = useScroll()
    const { nodes, materials } = useGLTF('/models/blender-components/garden1.glb')
    const lerp = (a, b, t) => a + (b - a) * t
    const fastScroll = Math.min(scroll.offset / 0.1, 1)
    const animT = (delay = 0) => Math.min(1, Math.max(0, (fastScroll - delay) / 0.85))

    // target vals
    const y = lerp(-1200, -30, animT(0.1))
    const x = lerp(300, 0, animT(0.1))
    const rotX = lerp(0, 0, animT(0.1))
    const rotY = lerp(0, -Math.PI/2, animT(0.1))

    return (
    <group 
    position={[x, y, 0]}
    scale={10}
    rotation={[rotX, rotY, 0]}
    dispose={null}
    {...props}
    >
      <group position={[-5.77, 2.38, 20.52]} rotation={[-Math.PI / 2, 0, -1.82]} scale={1.85}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10.geometry}
          material={materials.Vegetation_Bark_Maple_1}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.formica_cinza}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.material}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.material}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.material}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.material}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.material}
          scale={0.07}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9.geometry}
          material={materials.material}
          scale={0.07}
        />
      </group>
      <group position={[-16.06, 2.28, -15.95]} rotation={[-Math.PI / 2, 0, 0]} scale={0.14}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_10001.geometry}
          material={materials['Vegetation_Bark_Maple_1.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3001.geometry}
          material={materials['formica_cinza.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4001.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5001.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6001.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7001.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8001.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_9001.geometry}
          material={materials['material.001']}
        />
      </group>
      <group position={[32, 0, 9]} rotation={[-Math.PI / 2, 0, 0]} scale={0.09}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_0_Tree_0Mat_0.geometry}
            material={materials.Tree_0Mat}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tree_1_Tree_1Mat_0.geometry}
            material={materials.Tree_1Mat}
          />
        </group>
      </group>
      <group position={[0, 3, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2002.geometry}
          material={materials['Material.004']}
          position={[-38, -6, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2003.geometry}
          material={materials['Material.004']}
          position={[-30, -11, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2004.geometry}
          material={materials['Material.004']}
          position={[-37, -8, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2005.geometry}
          material={materials['Material.004']}
          position={[-36, -11, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2006.geometry}
          material={materials['Material.004']}
          position={[-35, -7, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2007.geometry}
          material={materials['Material.004']}
          position={[-36, -2, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2008.geometry}
          material={materials['Material.004']}
          position={[-37, 2, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2009.geometry}
          material={materials['Material.004']}
          position={[-37, 7, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2010.geometry}
          material={materials['Material.004']}
          position={[-38, 10, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2011.geometry}
          material={materials['Material.004']}
          position={[-38, 13, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2012.geometry}
          material={materials['Material.004']}
          position={[-40, 17, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2013.geometry}
          material={materials['Material.004']}
          position={[-37, 19, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2014.geometry}
          material={materials['Material.004']}
          position={[-36, 15, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2015.geometry}
          material={materials['Material.004']}
          position={[-35, 20, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2016.geometry}
          material={materials['Material.004']}
          position={[-35, 23, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2017.geometry}
          material={materials['Material.004']}
          position={[-38, 20, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2018.geometry}
          material={materials['Material.004']}
          position={[-40, 11, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2019.geometry}
          material={materials['Material.004']}
          position={[-40, 9, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2020.geometry}
          material={materials['Material.004']}
          position={[-38, 1, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2021.geometry}
          material={materials['Material.004']}
          position={[-40, -2, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2022.geometry}
          material={materials['Material.004']}
          position={[-40, -5, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2023.geometry}
          material={materials['Material.004']}
          position={[-39, -8, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2024.geometry}
          material={materials['Material.004']}
          position={[-39, -12, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2025.geometry}
          material={materials['Material.004']}
          position={[-38, -16, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2026.geometry}
          material={materials['Material.004']}
          position={[-36, -18, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2027.geometry}
          material={materials['Material.004']}
          position={[-34, -19, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2028.geometry}
          material={materials['Material.004']}
          position={[-34, -15, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2029.geometry}
          material={materials['Material.004']}
          position={[-35, -13, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2030.geometry}
          material={materials['Material.004']}
          position={[-36, -4, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2031.geometry}
          material={materials['Material.004']}
          position={[-34, 2, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2032.geometry}
          material={materials['Material.004']}
          position={[-35, 7, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2033.geometry}
          material={materials['Material.004']}
          position={[-35, 10, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2034.geometry}
          material={materials['Material.004']}
          position={[-34, 13, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2035.geometry}
          material={materials['Material.004']}
          position={[-32, 16, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2036.geometry}
          material={materials['Material.004']}
          position={[-33, 19, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2037.geometry}
          material={materials['Material.004']}
          position={[-29, 20, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2038.geometry}
          material={materials['Material.004']}
          position={[-23, 19, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2039.geometry}
          material={materials['Material.004']}
          position={[-23, 23, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2040.geometry}
          material={materials['Material.004']}
          position={[-24, 21, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2041.geometry}
          material={materials['Material.004']}
          position={[-25, 26, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2042.geometry}
          material={materials['Material.004']}
          position={[-29, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2043.geometry}
          material={materials['Material.004']}
          position={[-31, 25, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2044.geometry}
          material={materials['Material.004']}
          position={[-31, 28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2045.geometry}
          material={materials['Material.004']}
          position={[-26, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2046.geometry}
          material={materials['Material.004']}
          position={[-24, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2047.geometry}
          material={materials['Material.004']}
          position={[-22, 34, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2048.geometry}
          material={materials['Material.004']}
          position={[-19, 36, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2049.geometry}
          material={materials['Material.004']}
          position={[-20, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2050.geometry}
          material={materials['Material.004']}
          position={[-22, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2051.geometry}
          material={materials['Material.004']}
          position={[-25, 28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2052.geometry}
          material={materials['Material.004']}
          position={[-21, 28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2053.geometry}
          material={materials['Material.004']}
          position={[-19, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2054.geometry}
          material={materials['Material.004']}
          position={[-16, 28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2055.geometry}
          material={materials['Material.004']}
          position={[-16, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2056.geometry}
          material={materials['Material.004']}
          position={[-15, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2057.geometry}
          material={materials['Material.004']}
          position={[-14, 35, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2058.geometry}
          material={materials['Material.004']}
          position={[-12, 37, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2059.geometry}
          material={materials['Material.004']}
          position={[-15, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2060.geometry}
          material={materials['Material.004']}
          position={[-9, 40, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2061.geometry}
          material={materials['Material.004']}
          position={[-7, 40, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2062.geometry}
          material={materials['Material.004']}
          position={[-4, 39, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2063.geometry}
          material={materials['Material.004']}
          position={[0, 41, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2064.geometry}
          material={materials['Material.004']}
          position={[1, 40, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2065.geometry}
          material={materials['Material.004']}
          position={[6, 41, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2066.geometry}
          material={materials['Material.004']}
          position={[5, 42, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2067.geometry}
          material={materials['Material.004']}
          position={[5, 36, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2068.geometry}
          material={materials['Material.004']}
          position={[2, 35, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2069.geometry}
          material={materials['Material.004']}
          position={[-1, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2070.geometry}
          material={materials['Material.004']}
          position={[-6, 32, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2071.geometry}
          material={materials['Material.004']}
          position={[-5, 34, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2072.geometry}
          material={materials['Material.004']}
          position={[-2, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2073.geometry}
          material={materials['Material.004']}
          position={[-8, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2074.geometry}
          material={materials['Material.004']}
          position={[-11, 32, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2075.geometry}
          material={materials['Material.004']}
          position={[-10, 36, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2076.geometry}
          material={materials['Material.004']}
          position={[1, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2077.geometry}
          material={materials['Material.004']}
          position={[1, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2078.geometry}
          material={materials['Material.004']}
          position={[4, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2079.geometry}
          material={materials['Material.004']}
          position={[7, 35, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2080.geometry}
          material={materials['Material.004']}
          position={[9, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2081.geometry}
          material={materials['Material.004']}
          position={[14, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2082.geometry}
          material={materials['Material.004']}
          position={[13, 36, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2083.geometry}
          material={materials['Material.004']}
          position={[18, 35, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2084.geometry}
          material={materials['Material.004']}
          position={[16, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2085.geometry}
          material={materials['Material.004']}
          position={[21, 32, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2086.geometry}
          material={materials['Material.004']}
          position={[24, 28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2087.geometry}
          material={materials['Material.004']}
          position={[24, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2088.geometry}
          material={materials['Material.004']}
          position={[24, 25, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2089.geometry}
          material={materials['Material.004']}
          position={[22, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2090.geometry}
          material={materials['Material.004']}
          position={[19, 29, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2091.geometry}
          material={materials['Material.004']}
          position={[18, 31, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2092.geometry}
          material={materials['Material.004']}
          position={[13, 30, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2093.geometry}
          material={materials['Material.004']}
          position={[12, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2094.geometry}
          material={materials['Material.004']}
          position={[8, 32, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2095.geometry}
          material={materials['Material.004']}
          position={[9, 35, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2096.geometry}
          material={materials['Material.004']}
          position={[15, 33, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2097.geometry}
          material={materials['Material.004']}
          position={[15, 36, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2098.geometry}
          material={materials['Material.004']}
          position={[18, 38, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2099.geometry}
          material={materials['Material.004']}
          position={[22, 37, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2100.geometry}
          material={materials['Material.004']}
          position={[25, 34, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2101.geometry}
          material={materials['Material.004']}
          position={[20, 34, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2102.geometry}
          material={materials['Material.004']}
          position={[32, -24, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2103.geometry}
          material={materials['Material.004']}
          position={[32, -27, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2104.geometry}
          material={materials['Material.004']}
          position={[30, -28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2105.geometry}
          material={materials['Material.004']}
          position={[28, -26, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2106.geometry}
          material={materials['Material.004']}
          position={[25, -26, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2107.geometry}
          material={materials['Material.004']}
          position={[20, -28, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2108.geometry}
          material={materials['Material.004']}
          position={[20, -32, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2109.geometry}
          material={materials['Material.004']}
          position={[18, -30, -1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2110.geometry}
          material={materials['Material.004']}
          position={[16, -31, -1]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2111.geometry}
        material={materials['Material.005']}
        position={[-7, 2, 23]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <group position={[9, 2, 25]} rotation={[-Math.PI / 2, 0, 0]} scale={0.56}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2112.geometry}
          material={materials['Material.005']}
          position={[7.18, -17.96, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2113.geometry}
        material={materials['Material.005']}
        position={[-27, 2, 12]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2114.geometry}
        material={materials['Material.005']}
        position={[-33, 2, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2115.geometry}
        material={materials['Material.005']}
        position={[-19, 2, -31]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2116.geometry}
        material={materials['Material.005']}
        position={[14, 2, -35]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2117.geometry}
        material={materials['Material.005']}
        position={[28, 2, -29]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2118.geometry}
        material={materials['Material.005']}
        position={[42, 2, -6]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2119.geometry}
        material={materials['Material.005']}
        position={[37, 2, 18]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2120.geometry}
        material={materials['Material.005']}
        position={[14, 2, 24]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <group position={[-12, 2, 35]} rotation={[-Math.PI / 2, 0, 0]} scale={0.56}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2121.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2126.geometry}
          material={materials['Material.005']}
          position={[10.78, -8.98, 1.8]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2122.geometry}
        material={materials['Material.005']}
        position={[-22, 2, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2123.geometry}
        material={materials['Material.005']}
        position={[-37, 2, -18]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2124.geometry}
        material={materials['Material.005']}
        position={[-20, 2, -37]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2125.geometry}
        material={materials['Material.005']}
        position={[40, 2, -17]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.56}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.002']}
        position={[32.29, 3.66, -18.2]}
        rotation={[0.91, 0.41, 2.67]}
        scale={-4.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Material.002']}
        position={[34.37, 2.71, -10.11]}
        rotation={[0, -0.28, -2.96]}
        scale={-1.63}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={materials['Material.002']}
        position={[30.24, 1.6, -5.6]}
        rotation={[0.61, 0.48, 2.41]}
        scale={-2.39}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials['Material.002']}
        position={[-41.21, 1.83, -4.26]}
        rotation={[0.17, -1.27, 0.28]}
        scale={-2.39}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials['Material.002']}
        position={[21.67, 1.91, 18.71]}
        rotation={[0.84, -0.33, 0.83]}
        scale={-2.39}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Material.002']}
        position={[-27.73, 2.92, 23.29]}
        rotation={[3.04, -0.85, -0.03]}
        scale={-4.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.003']}
        position={[-0.01, 1.19, -0.03]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[24.99, 5.19, 2.97]}
        scale={[0.58, 3.23, 0.19]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials['Material.002']}
        position={[-28.73, 2.92, -22.71]}
        rotation={[3.04, -0.85, -0.03]}
        scale={-4.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials['Material.002']}
        position={[-20.73, 2.92, -8.71]}
        rotation={[-2.87, -1.03, -2.15]}
        scale={-4.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials['Material.002']}
        position={[-21.73, 2.92, 28.29]}
        rotation={[-2.59, -0.64, 1.13]}
        scale={-4.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials['Material.002']}
        position={[24.27, 2.92, 31.29]}
        rotation={[2.86, -0.77, 0]}
        scale={-4.04}
      />
    </group>
  )
}

useGLTF.preload('/models/blender-components/garden1.glb')