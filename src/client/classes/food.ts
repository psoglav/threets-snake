import * as THREE from 'three'
import { Block } from './block'
import { IFoodSpawner, TBlock } from '../../typings'
import { random } from 'lodash'

const FOOD_MAT = new THREE.MeshBasicMaterial({
  color: 0x331166,
  // wireframe: true,
})

export default class FoodSpawner implements IFoodSpawner {
  scene: THREE.Scene | undefined
  structure: TBlock[] = []

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  spawn(arg1: number, arg2?: number) {
    let x = arg1
    let y = arg2

    if (typeof y != 'number') {
      x = random(arg1)
      y = random(arg1)
    }

    let block = new Block(x, y, FOOD_MAT)
    this.structure.push(block)

    this.scene?.add(block.mesh)
  }

  getAt(x: number, y: number) {
    for (let block of this.structure) {
      if (block.mesh.position.distanceTo(new THREE.Vector3(x, y, 0)) == 0) return block
    }

    return null
  }

  eat(food: TBlock) {
    this.scene?.remove(food.mesh)
  }
}
