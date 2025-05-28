/* just a proxy, maybe is not needed but i like it */


import { proxy } from 'valtio'

const state = proxy({
  intro: false,
  model: 'hat',
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['banner1', 'banner2', 'banner3', 'banner4'],
  color: '#ccc',
  decal: 'banner2'
})

export { state }
