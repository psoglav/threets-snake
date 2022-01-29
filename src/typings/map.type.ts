import { TBlock } from './block.type'

export type TMap = Array<TBlock[]>

export interface IGameMap {
  structure: TMap
  w: number
  h: number
}
