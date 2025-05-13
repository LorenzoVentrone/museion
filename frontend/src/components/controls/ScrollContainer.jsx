import {ScrollControls, PointerLockControls} from '@react-three/drei'
import ScrollCameraController from './ScrollCameraController'

const ScrollContainer = ({children, onScroll, scrollOffset}) => {
  return (
    <ScrollControls pages={10} damping={0.1}>
        <PointerLockControls />
        <ScrollCameraController loopRadius={35} loopHeight={4} onScroll={onScroll}/>
        {children(scrollOffset)}
    </ScrollControls>
  )
}

export default ScrollContainer