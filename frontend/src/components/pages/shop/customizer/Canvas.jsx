import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './Store'


export const App = ({ position = [0, 0, 2.5], fov = 25 }) => {
  const snap = useSnapshot(state)
  return (
    <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} >
      <ambientLight intensity={0.5 * Math.PI} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <CameraRig>
        <Backdrop />

        {/* -------------- NOTE --------------- */}
        {/* Vorrei aggiungere una transizione quando renderizzo il modello 3d, ma mi 
        devo informare se si può fare con framer-motion */}

        <Center>
          {snap.model === 'shirt' ? <Shirt /> : <Hat />}
        </Center>
      </CameraRig>
    </Canvas>
  );
};

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (

    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>

      <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group 
          ref={group}>

            {children}

          </group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/images/models_logo/${snap.decal}.png`)
  const { nodes, materials } = useGLTF('/models/models_customizer/shirt_baked_collapsed.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    <group {...props} dispose={null} position={[0, 0.1, 0]}>
      
      {/* Main Shirt */}
      <mesh 
        castShadow 
        geometry={nodes.T_Shirt_male.geometry} 
        material={materials.lambert1} 
        material-roughness={1} 
        {...props} 
        dispose={null}
      >
        {/* Attach thee logos */}
        <Decal 
          position={[0, 0.04, 0.15]} 
          rotation={[0, 0, 0]} 
          scale={0.15} 
          map={texture} 
        />

      </mesh>
    </group>
  )
}
/* Preload to have it alredy ready with preselected logos */
useGLTF.preload('/models/models_customizer/shirt_baked_collapsed.glb')
  ;['/images/models_logo/banner1.png', '/images/models_logo/banner2.png', '/images/models_logo/banner3.png', '/images/models_logo/banner4.png'].forEach(useTexture.preload)


function Hat(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/images/models_logo/${snap.decal}.png`)
  const { nodes, materials } = useGLTF('/models/models_customizer/bucket_hat.glb')
  useFrame((state, delta) => easing.dampC(materials.Cubo.color, snap.color, 0.25, delta))
  return (
    <group 
      {...props} 
      dispose={null} 
      scale={0.7} 
      position={[0, -0.1, 0]} 
      rotation={[0, Math.PI, 0]}
    >

      {/* Stitching */}
      <mesh 
        geometry={nodes.Object_4.geometry} 
        material={materials.Hilos} 
      />

      {/* Main Hat */}
      <mesh 
        castShadow 
        geometry={nodes.Object_5.geometry} 
        material={materials.Cubo} 
        material-roughness={1} 
        {...props} 
        dispose={null}
      >
        {/* Attach thee logos */}
        <Decal 
          position={[0, 0.25, -0.25]} 
          rotation={[0, Math.PI, 0]} 
          scale={0.22} 
          map={texture}
        />

      </mesh>
    </group>
  )
}

/* Preload to have it alredy ready with preselected logos */
useGLTF.preload('/models/models_customizer/bucket_hat.glb')
  ;['/images/models_logo/banner1.png', '/images/models_logo/banner2.png', '/images/models_logo/banner3.png', '/images/models_logo/banner4.png'].forEach(useTexture.preload)