import React, { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'

/**
 * Loads and renders the `hole-ceiling.glb` model.
 *
 * Props:
 *  - path           (string)           : URL or public path to the GLB (defaults to '/models/blender-components/hole-ceiling.glb')
 *  - position       (array of numbers) : [x, y, z] world position
 *  - rotation       (array of numbers) : [x, y, z] Euler rotation (radians)
 *  - scale          (number|array)     : uniform or [x, y, z] scale
 *  - castShadow     (bool)             : whether the mesh casts shadows
 *  - receiveShadow  (bool)             : whether the mesh receives shadows
 */
const WallMolding = forwardRef(function WallMolding(
  {
    path = '/models/blender-components/wall-molding-2.glb',
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

// Preload the model for better performance
useGLTF.preload('/models/blender-components/wall-molding-2.glb')

export default WallMolding