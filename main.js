import * as THREE from 'three';
import { OrbitControls  } from 'three/examples/jsm/Addons.js';
import { GUI } from 'dat.gui';

import vertexShader from './shaders/vert.vert?raw';
import fragmentShader from  './shaders/frag.frag?raw';

// CONSTANTS
const width = window.innerWidth;
const height = window.innerHeight;
const ratio = width/height;
const cameraFov = 35;
const nearPlane = 0.01;
const farPlane = 1000;

// SCENE DEFINITIONS
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(cameraFov,ratio,nearPlane,farPlane);
camera.position.x = 10;

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

// SCENE OBJECTS
let load = 1000e3;
const length = 10;
const radius = 0.5;
const geometry = new THREE.CylinderGeometry(radius,radius,length,50,50);

const texture = new THREE.TextureLoader().load('resources/concrete.jpg')
texture.wrapS = THREE.RepeatWrapping;

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:{
        uTexture:{value: texture},
        uLength:{value: length},
        uRadius:{value: radius},
        uLoad:{value: load}
    }
});

// GEOMETRY
const object = new THREE.Mesh(geometry,material);
object.rotation.x = Math.PI/2;
scene.add(object);

// GUI
const gui = new GUI();

const params = {
    loadKN: 1000  
};

gui.add(params, "loadKN", 0, 10000, 1)
   .name("Load (kN)")
   .onChange((value) => {
       material.uniforms.uLoad.value = value * 1000;  
   });



// MAIN LOOP
function animate() {
    renderer.render(scene,camera);
}