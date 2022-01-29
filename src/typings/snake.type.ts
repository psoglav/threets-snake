import { IFoodSpawner } from '.';
import { TBlock } from './block.type'

export interface ISnake {
  foodSpawner?: IFoodSpawner
  structure: TBlock[]
  direction: DirectionEnum | undefined
  lastMoveDirection: DirectionEnum | undefined
  get head(): TBlock
  up(): void
  down(): void
  right(): void
  left(): void
  get score(): number
  isFreeAt(x: number, y: number): boolean
  get hasMoved(): boolean
}

export enum DirectionEnum {
  UP = 1,
  DOWN = -1,
  RIGHT = 2,
  LEFT = -2,
}
