import { IGameManager, IEntity } from '../../typings'

export default class GameManager implements IGameManager {
  nextTime = 0
  lastTime = 0
  delay = 0
  queue: Function[] = []
  entities: IEntity[] = []

  constructor(fps: number, ...entities: IEntity[]) {
    this.set(fps)
    this.entities = entities
  }

  set(fps: number) {
    this.delay = 1000 / fps
  }

  call(cb: () => void) {
    this.queue.push(cb)
  }

  get ready() {
    return this.nextTime < +new Date()
  }

  tick() {
    if (this.ready) {
      this.lastTime = this.nextTime
      this.nextTime = +new Date() + this.delay
      this.entities.forEach((e) => e.tick())
    }
  }
}
