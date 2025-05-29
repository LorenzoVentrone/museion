import * as THREE from 'three';

// Sky component: creates a large sphere to simulate the sky background
const Sky = () => {
  return (
    <>  
      {/* The entire scene is wrapped inside a large sphere to give the impression of a sky */}
      <mesh>
        <sphereGeometry args={[1000, 1000, 32, 32]} />
        <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} />
        {/* You can change the color to 'royalBlue' if desired */}
      </mesh>
    </>
  );
};

export default Sky;