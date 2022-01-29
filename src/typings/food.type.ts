import { TBlock } from '.'

export interface IFoodSpawner {
  structure: TBlock[]
  spawn(x: number, y: number): void
  spawn(mapSize: number): void
  getAt(x: number, y: number): TBlock | null
  eat(food: TBlock): void
}
