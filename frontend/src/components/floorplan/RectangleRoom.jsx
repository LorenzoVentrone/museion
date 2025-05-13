import { useMemo } from 'react';

// TODO:
// - Aggiungere texture ai muri e al pavimento
// non mi piace troppo la composizione della stanza, da rivedere

export default function RectangleRoom({ scroll = 0 }) {
  const fastScroll = Math.min(scroll / 0.12, 1);

  // Pavimento e soffitto salgono dal basso
  const floorY = useMemo(() => -100 + fastScroll * 100, [fastScroll]);

  // soffitto
  const ceilingY = useMemo(() => 100 - fastScroll * 90, [fastScroll]);
  const ceilingZ = useMemo(() => -200 + fastScroll * 200, [fastScroll]);
  
  const ceilingRotation = useMemo(
    () => (1 - fastScroll) > 0 ? (1 - fastScroll) * Math.PI : 0,
    [fastScroll]
  );


  // Muro sinistro: da molto a sinistra (-110) a posizione finale (-10)
  const leftWallX = useMemo(() => -110 + fastScroll * 100, [fastScroll]);
  const leftWallY = useMemo(() => -100 + fastScroll * 105, [fastScroll]); // da -100 a 5
  const leftWallZ = useMemo(() => 60 - fastScroll * (60 - -2.5), [fastScroll]); // da 60 a -2.5
  
  // Muro destro: parte da molto in alto (y=100), molto a destra (x=110), molto avanti (z=60) e arriva a (x=10, y=5, z=-2.5)
  const rightWallX = useMemo(() => 110 - fastScroll * 100, [fastScroll]);      // da 110 a 10
  const rightWallY = useMemo(() => 100 - fastScroll * 95, [fastScroll]);       // da 100 a 5
  const rightWallZ = useMemo(() => 60 - fastScroll * (60 - -2.5), [fastScroll]); // da 60 a -2.5

  // Rotazione continua del muro destro mentre arriva
  const rightWallRotation = useMemo(
    () => (1 - fastScroll) > 0 ? (1 - fastScroll) * 3 * Math.PI * fastScroll : 0,
    [fastScroll]
  );

  const leftWallRotation = useMemo(
    () => (1 - fastScroll) > 0 ? (1 - fastScroll) * 3 * -Math.PI * fastScroll : 0,
    [fastScroll]
  );

  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh 
        position={[0, floorY, -2.5]} 
        receiveShadow
      >
        <boxGeometry args={[20, 0.1, 60]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Ceiling */}
      <mesh 
        position={[0, ceilingY, ceilingZ]} 
        rotation={[ceilingRotation, 0, 0]}
        receiveShadow
      >
        <boxGeometry args={[10, 0.1, 60]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      {/* Left Wall */}
      <mesh 
        position={[leftWallX, leftWallY, leftWallZ]}
        rotation={[0, leftWallRotation, 0]}
        receiveShadow
      >
        <boxGeometry args={[0.1, 10, 60]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[rightWallX, rightWallY, rightWallZ]}
        rotation={[0, rightWallRotation, 0]}
        receiveShadow
      >
        <boxGeometry args={[0.1, 10, 60]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
}