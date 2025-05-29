
import React, { forwardRef } from 'react'

/**
 * Renders a simple rectangular wall mesh using React Three Fiber.
 *
 * Props:
 *  - width        (number)       : wall width along X (default: 6)
 *  - height       (number)       : wall height along Y (default: 3)
 *  - thickness    (number)       : wall depth along Z (default: 0.1)
 *  - position     (number[3])    : [x, y, z] world position (default: [0, 0, 0])
 *  - rotation     (number[3])    : [x, y, z] Euler rotation in radians (default: [0, 0, 0])
 *  - color        (string)       : wall color (CSS hex, default: '#E0E0E0')
 *  - castShadow   (boolean)      : enable shadow casting (default: true)
 *  - receiveShadow(boolean)      : enable shadow receiving (default: true)
 */
const BasicWall = forwardRef(function BasicWall(
  {
    width = 4,
    height = 15,
    thickness = 0.2,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = '#e0d9cc',
    castShadow = true,
    receiveShadow = true,
    ...props
  },
  ref
) {

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      {...props}
    >
      <boxGeometry args={[width, height, thickness]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
})

export default BasicWall