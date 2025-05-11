// src/components/models/ExtrudeInWall.jsx

import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Loads and renders the `extrude-in-wall.glb` model.
 *
 * Props:
 *  - path           (string)           : URL or public path to the GLB (defaults to '/models/blender-components/extrude-in-wall.glb')
 *  - position       (array of numbers) : [x, y, z] world position
 *  - rotation       (array of numbers) : [x, y, z] Euler rotation (radians)
 *  - scale          (number|array)     : uniform or [x, y, z] scale
 *  - castShadow     (bool)             : whether the mesh casts shadows
 *  - receiveShadow  (bool)             : whether the mesh receives shadows
 */
const ExtrudeInWall = forwardRef(function ExtrudeInWall(
  {
    path = '/models/blender-components/extrude-in-wall.glb',
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
  return (
    <primitive
      ref={ref}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      {...props}
    />
  )
})

// Preload the model for better performance
useGLTF.preload('/models/blender-components/extrude-in-wall.glb')

export default ExtrudeInWall