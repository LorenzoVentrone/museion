'use client'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, SoftShadows } from '@react-three/drei'
import MainScene from './MainScene'
import Sky from '../environment/Sky'

const MainCanvas = ({ setShowOverlay, setShowOutro }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
        <Canvas
            shadows
            dpr={[1, 1.2]} // Adjusted for better performance on lower-end devices
            gl={{
              powerPreference: 'high-performance',
              antialias: true, // disable antialiasing to reduce GPU load
            }}
            // camera={{ position: [0, 5, 15], fov: 50 }} 
        >   

            {/* Remove Stats!! */}
            {/* Softer ambient light, slightly warmer sky */}
            <hemisphereLight skyColor="#FFDAB9" groundColor="#404040" intensity={0.15} /> 
            
            {/* Main sun light - sunset vibe: lower, warmer, less intense */}
            <directionalLight
              color="#F66300" // Warmer orange/yellow for sunset
              intensity={1.2} // Softer intensity
              position={[20, 15, -20]} // Lower in the sky, more from the side/slightly behind
              castShadow
              shadow-mapSize-width={2048} // Can reduce if performance is an issue
              shadow-mapSize-height={2048}
              shadow-bias={-0.00005} 
              shadow-camera-left={-30} 
              shadow-camera-right={30}
              shadow-camera-top={30}
              shadow-camera-bottom={-30}
              shadow-camera-near={0.5}
              shadow-camera-far={80} // Reduced: Tighter frustum can improve shadow precision. Adjust to fit the scene.
            />

            {/* Environment for reflections, using a sunset-like HDRI could be even better */}
            <Environment files="/images/desert.jpg" background={false} /> 
            
            {/* Procedural Sky - sunset configuration */}
            <Sky
              sunPosition={[20, 15, -20]} // Match directionalLight's position
              turbidity={10} // More atmospheric haze for sunset
              rayleigh={5} // More scattering for reddish/orange hues
              mieCoefficient={0.005}
              mieDirectionalG={0.85}
              inclination={0.25} // Example: 0 = midday, 0.25 = sunrise/sunset, 0.5 = night
              azimuth={0.25} // Rotation of the sun around the Y axis (0.25 = west)
            />
                      

            <MainScene 
              setShowOverlay={setShowOverlay} 
              setShowOutro={setShowOutro}
            /> 

            {/* Contact shadows - make them more subtle to avoid interference */}
            <ContactShadows
              position={[0, -0.01, 0]} 
              rotation-x={Math.PI / 2}
              scale={100} // Increased scale to cover a larger area
              width={1} 
              height={1} 
              far={10} // Reduced: Contact shadows should be very close to the object
              blur={4} // Softer blur
              opacity={0.5} // Reduced: Make them less prominent
              resolution={256} 
            />
            
            {/* SoftShadows: Adjust focus and samples for better occlusion handling */}
            <SoftShadows
              size={30}
              focus={0.5} // Increased: Higher focus can make shadows sharper near the caster and respect occluders better.
              samples={16} // Increased: More samples for better quality, can help with precision.
            />

        </Canvas>
    </div>
  )
}

export default MainCanvas