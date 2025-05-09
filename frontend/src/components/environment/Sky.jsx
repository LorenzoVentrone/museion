import * as THREE from 'three'

const Sky = () => {
  return (
    <>  
        {/* In Pratica è tutto contenuto dentro una sfera, che da l'impressione di essere un cielo */}
        <mesh>
            <sphereGeometry args={[1000, 1000, 32, 32]} />
            <meshStandardMaterial color="skyblue" side={THREE.DoubleSide}/> {/* royalBlue */}
        </mesh>
    </>
  )
}

export default Sky