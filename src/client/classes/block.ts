const _ = require('lodash')

import * as THREE from 'three'
import { TBlock, IEntity } from '../../typings'

// const BLOCK_SIZE = 1
const BLOCK_GEO = new THREE.BoxGeometry()

export class Block implements TBlock {
  geo: THREE.BoxGeometry
  mesh: THREE.Mesh

  constructor(x: number, y: number, public mat: THREE.Material) {
    this.geo = BLOCK_GEO
    this.mesh = new THREE.Mesh(this.geo, this.mat)
    this.mesh.position.x = x
    this.mesh.position.y = y
  }

  set x(value: number) {
    this.mesh.position.x = value
  }

  get x() {
    return this.mesh.position.x
  }

  set y(value: number) {
    this.mesh.position.y = value
  }

  get y() {
    return this.mesh.position.y
  }

  goTo(target: TBlock) {
    this.x = target.x
    this.y = target.y
  }

  distanceTo(target: TBlock) {
    let { x, y } = this.mesh.position
    let { x: tx, y: ty } = target.mesh.position
    return Math.abs(x - tx) + Math.abs(y - ty)
  }
}

export abstract class Entity implements IEntity {
  structure: any = []

  getBlocks(): THREE.Mesh[] {
    return _.flattenDeep(this.structure).map((b: TBlock) => b.mesh)
  }

  abstract tick(): void
}
