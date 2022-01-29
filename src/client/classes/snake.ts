import { IGameMap, ISnake, TBlock, DirectionEnum, IFoodSpawner } from '../../typings'
import * as THREE from 'three'
import { moveBy } from '../utils'
import { Block, Entity } from './block'

const SNAKE_MAT = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
})

const STUCK_SNAKE_MAT = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
})

export class Snake extends Entity implements ISnake {
  structure: TBlock[] = []
  direction: DirectionEnum | undefined
  lastMoveDirection: DirectionEnum | undefined

  constructor(
    public x: number,
    public y: number,
    public map: IGameMap,
    public foodSpawner?: IFoodSpawner
  ) {
    super()
    this.addBlock(x, y)
  }

  addBlock(x: number, y: number) {
    this.structure.push(new Block(x, y, SNAKE_MAT))
  }

  get head() {
    return this.structure[0]
  }

  get score() {
    return this.structure.length
  }

  isFreeAt(x: number, y: number) {
    for (let block of this.structure) {
      if (block.mesh.position.distanceTo(new THREE.Vector3(x, y, 0)) == 0) {
        return false
      }
    }

    return true
  }

  get hasMoved() {
    return this.direction == this.lastMoveDirection
  }

  grow() {
    let { x, y } = this.structure.at(-1)!
    this.structure.push(new Block(x, y, SNAKE_MAT))
  }

  tick() {
    if (!this.direction) return

    // move the head to the direction which is set
    let { x, y } = this.head

    switch (this.direction) {
      case DirectionEnum.UP:
        y = moveBy(y, 1, 0, this.map.h)
        break
      case DirectionEnum.DOWN:
        y = moveBy(y, -1, 0, this.map.h)
        break
      case DirectionEnum.RIGHT:
        x = moveBy(x, 1, 0, this.map.w)
        break
      case DirectionEnum.LEFT:
        x = moveBy(x, -1, 0, this.map.w)
        break
    }

    if (!this.isFreeAt(x, y)) {
      this.direction = undefined
      this.head.mesh.material = STUCK_SNAKE_MAT
      return
    }

    this.head.mesh.material = SNAKE_MAT

    this.structure[0].x = x
    this.structure[0].y = y

    // move all the blocks excluding the head
    // to the previous position of their leaders
    for (let i = this.structure.length - 1; i > 0; i--) {
      let prev = this.structure[i - 1]
      let current = this.structure[i]
      if (current.distanceTo(prev) >= 1) {
        this.structure[i].goTo(prev)
      }
    }

    this.lastMoveDirection = this.direction // meaning that snake has hasMoved
  }

  up() {
    if (this.direction == DirectionEnum.DOWN || !this.hasMoved) return
    this.direction = DirectionEnum.UP
  }

  down() {
    if (this.direction == DirectionEnum.UP || !this.hasMoved) return
    this.direction = DirectionEnum.DOWN
  }

  right() {
    if (this.direction == DirectionEnum.LEFT || !this.hasMoved) return
    this.direction = DirectionEnum.RIGHT
  }

  left() {
    if (this.direction == DirectionEnum.RIGHT || !this.hasMoved) return
    this.direction = DirectionEnum.LEFT
  }
}
