'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
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

            {/* Luce ambientale */}
            <ambientLight intensity={0.3} />
            {/* Luce direzionale */}
            <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
            {/* Luce di riempimento */}

            <Environment files="/images/desert.jpg" />
            <Sky />
                        
            <MainScene />

        </Canvas>
    </div>
  )
}

export default MainCanvas