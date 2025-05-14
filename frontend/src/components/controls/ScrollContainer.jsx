import { ScrollControls, PointerLockControls } from '@react-three/drei'
import ScrollCameraController from './ScrollCameraController'

const ScrollContainer = ({ children, onScroll }) => {
    return (
        <ScrollControls pages={10} damping={0.1}>
            {/* è il motivo per il quale il mouse si blocca, è buono per esperienze 3D ma non da la possibilità di usare il mouse */}
            {/* <PointerLockControls /> */}
            <ScrollCameraController loopRadius={35} loopHeight={4} onScroll={onScroll} />
            {/* tutti i children dentro ScrollContainer sono figli di ScrollControls e quindi posso accedere allo scroll direttamente dentro ai singoli componenti con l'hook useScroll()
                è più comodo invece di passare dentro children la variabile scroll e poi andare dentro i singoli componenti
                e ogni volta passare come props scroll e poi usarla.
                */}
            {children()}
        </ScrollControls>
    )
}

export default ScrollContainer