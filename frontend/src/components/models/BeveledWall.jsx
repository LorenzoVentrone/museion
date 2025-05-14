// src/components/floorplan/BeveledWall.jsx

import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Loads and renders the `beveled-wall.glb` model.
 *
 * Props:
 *  - path      (string)   : URL or public path to the GLB (defaults to '/beveled-wall.glb')
 *  - position  (array)    : [x, y, z] world position
 *  - rotation  (array)    : [x, y, z] Euler rotation (radians)
 *  - scale     (number|array) : uniform or [x, y, z] scale
 *  - castShadow / receiveShadow (bool)
 */
const BeveledWall = forwardRef(function BeveledWall(
  {
    path = '/models/blender-components/beveled-wall.glb',
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    castShadow = true,
    receiveShadow = true,
    ...props
  },
  ref
) {
  const { scene } = useGLTF(path)
  const cloned = scene.clone(true)
  return (
    <primitive
      ref={ref}
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      {...props}
    />
  )
})

// optional: preload for performance
useGLTF.preload('/models/blender-components/beveled-wall.glb')

export default BeveledWall