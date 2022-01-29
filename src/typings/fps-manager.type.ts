import { IEntity } from '.'

export interface IGameManager {
  nextTime: number
  lastTime: number
  delay: number
  entities: IEntity[]
  queue: Function[]

  get ready(): boolean
  tick(): void
  call(cb: () => void): void
  set(value: number): void
}
