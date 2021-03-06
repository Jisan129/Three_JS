import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
console.log(OrbitControls)
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
/*
group.add(cube1)
*/
const cube2=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0x0000ff}))
group.add(cube2)



/**
 * Sizes
 */
//axes helper
const axesHelper = new THREE.AxesHelper(2)
/*
scene.add(axesHelper)
*/
//
const cursor ={
    x:0,
    y:0
}
window.addEventListener('mousemove',(event)=>{

        cursor.x=event.clientX/sizes.width-0.5
        cursor.y=(event.clientY/sizes.height-0.5)*-1
    }
)
//resizing
window.addEventListener('resize',()=>{
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight
    //update camera
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    //update render
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))//for multiple devices

    renderer.setSize(sizes.width,sizes.height)

})

window.addEventListener('dblclick',()=>{
    if(!document.fullscreenElement){
            canvas.requestFullscreen()
        }
    else {
            document.exitFullscreen()
        }
})

//scale
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z=3
camera.lookAt(cube1.position)
//controls
const controls =new OrbitControls(camera,canvas)
controls.enableDamping=true



scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


const clock=new THREE.Clock()
const Tick=()=>{
   /* const elapsedTime=clock.getElapsedTime()
    cube1.rotation.y=Math.sin(elapsedTime*Math.PI)
    cube2.position.y=Math.sin(elapsedTime*Math.PI)
    cube2.position.x=Math.cos(elapsedTime*Math.PI)*/
    camera.position.x=Math.sin(cursor.x*Math.PI)*3
    camera.position.z=Math.cos(cursor.x*Math.PI)*3
    camera.position.y=cursor.y*3
    camera.lookAt(cube1.position)

    //controls
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(Tick)

}
Tick()