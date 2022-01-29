import * as THREE from 'three'
import { IGameMap, TMap, TBlock } from '../../typings'
import { Entity, Block } from './block'

const MAP_MAT = new THREE.MeshPhysicalMaterial({
  // color: 0x111111,
  // wireframe: true
  transmission: 1,
  roughness: 0,
  metalness: 0,
  specularIntensity: 0
})

export class GameMap extends Entity implements IGameMap {
  structure: TMap = []

  constructor(public w: number, public h: number) {
    super()
    this.structure = this.create(w, h)
  }

  create(w: number, h: number): TMap {
    let structure = []

    for (let y = 0; y < h; y++) {
      let row: TBlock[] = []

      for (let x = 0; x < w; x++) {
        row.push(new Block(x, y, MAP_MAT))
      }

      structure.push(row)
    }

    return structure
  }

  tick(): void {}
}
