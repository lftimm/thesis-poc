import * as THREE from 'three';
import { OrbitControls, ThreeMFLoader } from 'three/examples/jsm/Addons.js';

import vertexShader from './shaders/vert.vert?raw';
import fragmentShader from  './shaders/frag.frag?raw';

// CONSTANTS
const width = window.innerWidth;
const height = window.innerHeight;
const ratio = width/height;
const cameraFov = 75;
const nearPlane = 0.1;
const farPlane = 1000;

// SCENE DEFINITIONS
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(cameraFov,ratio,nearPlane,farPlane);
camera.position.x = 10;

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;


// SCENE OBJECTS
const geometry = new THREE.CylinderGeometry(1,1,10,50,50);

const texture = new THREE.TextureLoader().load('resources/concrete.jpg')
texture.wrapS = THREE.RepeatWrapping;

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:{
        uTexture:{value: texture}
    }
});

const object = new THREE.Mesh(geometry,material);
object.rotation.x = Math.PI/2;
scene.add(object);

// MAIN LOOP
function animate() {
    renderer.render(scene,camera);
}