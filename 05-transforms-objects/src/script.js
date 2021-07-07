import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
/*const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)*/
const group=new THREE.Group()
scene.add(group)

const cube1=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0x00ff00}))
cube1.position.x=-1.5
cube1.rotation.x=1
group.add(cube1)
const cube2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0x0000ff}))
cube2.position.x=1.5
group.add(cube2)



/**
 * Sizes
 */
//axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)



//scale
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z=3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
const clock=new THREE.Clock()
const Tick=()=>{
    const elapsedTime=clock.getElapsedTime()
    cube1.rotation.y=Math.sin(elapsedTime*Math.PI)
    cube2.position.y=Math.sin(elapsedTime*Math.PI)
    cube2.position.x=Math.cos(elapsedTime*Math.PI)

    renderer.render(scene, camera)
    window.requestAnimationFrame(Tick)

}
Tick()