import { BoxGeometry, Mesh, Material } from 'three'

export interface IEntity {
  getBlocks(): void
  tick(): void
}

export interface TBlock {
  // w: number
  // h: number
  set x(value: number)
  get x(): number
  set y(value: number)
  get y(): number
  geo: BoxGeometry
  mesh: Mesh
  mat: Material
  goTo(target: TBlock): void
  distanceTo(target: TBlock): number
}
