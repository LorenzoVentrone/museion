'use client'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import MainScene from './MainScene'
import Sky from '../environment/Sky'

const MainCanvas = ({setShowOverlay}) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas 
        shadows 
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Environment files="/images/desert.jpg" />
        <Sky />
        {/* sto passando lo scrollValue alla MainScene per poi utilizzarlo nei modelli */}
        <MainScene setShowOverlay={setShowOverlay}/>
      </Canvas>
    </div>
  )
}

export default MainCanvas