'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import MainScene from './MainScene'
import Sky from '../environment/Sky'



const MainCanvas = () => {
  
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
        <Canvas
            shadows
            dpr={[1, 2]}
            /* camera={{ position: [0, 0, 6], fov: 55 }} */
        >   

            {/* Soft dawn sky & ground fill */}
            <hemisphereLight skyColor="#FFDDCC" groundColor="#111122" intensity={0.1} />
            {/* Warm dawn sun from the right */}
            <directionalLight
              color="#fff5e1"
              intensity={1.2}
              position={[-5, 10, 5]}
              castShadow
              shadow-mapSize-width={4096}
              shadow-mapSize-height={4096}
              shadow-bias={-0.0005}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
              shadow-camera-near={0.5}
              shadow-camera-far={20}
            />

            <Environment files="/images/desert.jpg" />
            <Sky
              sunPosition={[5, 2, 0]}
              turbidity={8}
              rayleigh={1}
              mieCoefficient={0.005}
              mieDirectionalG={0.8}
            />
                        
            {/* Sunlight beam through window */}
            <spotLight
              color="#ffffff"
              intensity={5}
              position={[20, 20, 30]}
              angle={Math.PI / 6}
              penumbra={0.3}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-near={0.5}
              shadow-camera-far={50}
            />

            <MainScene/>

            {/* Soft contact shadows at floor level */}
            <ContactShadows
              position={[0, -0.01, 0]}
              rotation-x={Math.PI / 2}
              width={20}
              height={20}
              far={5}
              blur={2}
              opacity={0.5}
              resolution={1024}
            />

        </Canvas>
    </div>
  )
}

export default MainCanvas