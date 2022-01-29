import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GameManager from './classes/gameManager'
import KeyBinding from './classes/keyBinding'
import { GameMap } from './classes/map'
import { Snake } from './classes/snake'

const MAP_SIZE = 30

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 22
camera.position.x = MAP_SIZE / 2
camera.position.y = MAP_SIZE / 2

const renderer = new THREE.WebGLRenderer({
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  },
  false
)

const map = new GameMap(MAP_SIZE, MAP_SIZE)
const snake = new Snake(0, 0, map)
const FPS = new GameManager(30, snake)
const keyBinding = new KeyBinding()

keyBinding.bind(() => snake.up(), 'ArrowUp')
keyBinding.bind(() => snake.down(), 'ArrowDown')
keyBinding.bind(() => snake.right(), 'ArrowRight')
keyBinding.bind(() => snake.left(), 'ArrowLeft')

snake.right()

for (let i = 23; i > 0; i--) snake.grow()

scene.add(...map.getBlocks(), ...snake.getBlocks())

const controls = new OrbitControls(camera, renderer.domElement)
controls.target = new THREE.Vector3(MAP_SIZE / 2, MAP_SIZE / 2, 0)

const light = new THREE.PointLight(0xffffff, 2)
light.position.set(MAP_SIZE / 2, MAP_SIZE / 2, 5)
scene.add(light)

const border = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(MAP_SIZE, MAP_SIZE)),
  new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
)
border.position.x += (MAP_SIZE - 1) / 2
border.position.y += (MAP_SIZE - 1) / 2
scene.add(border)

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  FPS.tick()

  render()
}

function render() {
  renderer.render(scene, camera)
}
animate()
