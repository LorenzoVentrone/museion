import { ScrollControls, PointerLockControls } from '@react-three/drei'
import ScrollCameraController from './ScrollCameraController'
import * as THREE from 'three'
import { useMemo } from 'react'

// vedi commenti per sapere perchè è meglio di usare direttamente scrollContainer
const ScrollContainer = ({ children, onScroll }) => {
  const specialCameraLookAt = useMemo(() => new THREE.Vector3(0, 5, -70), []) // memoization to avoid unnecessary re-renders in ScrollCameraController
  return (
    <ScrollControls pages={10} damping={0.1}>
      {/* è il motivo per il quale il mouse si blocca, è buono per esperienze 3D ma non da la 
      possibilità di usare il mouse */}
      {/* <PointerLockControls /> */}
      <ScrollCameraController onScroll={onScroll} specialCameraLookAt={specialCameraLookAt} /> {/* il secondo vettore è per la gestione del lerp iniziale della statua al centro.
      È lo stesso vettore lookat di quando clicchiamo sulla statua /*}
      {/* tutti i children dentro ScrollContainer sono figli di ScrollControls e quindi posso accedere allo scroll direttamente dentro ai singoli componenti con l'hook useScroll()
      è più comodo invece di passare dentro children la variabile scroll e poi andare dentro i singoli componenti
      e ogni volta passare come props scroll e poi usarla.
       */}
      {children()}
    </ScrollControls>
  )
}

export default ScrollContainer