import * as THREE from 'three';

// CONSTANTS
const width = window.innerWidth;
const height = window.innerHeight;
const ratio = width/height;
const cameraFov = 75;
const nearPlane = 0.1;
const farPlane = 1000;

// SCENE DEFINITIONS
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(cameraFov,ratio,nearPlane,farPlane);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// SCENE OBJECTS
const vertexShader = document.getElementById("vertexShader").textContent;
const fragmentShader = document.getElementById("fragmentShader").textContent;

const geometry = new THREE.PlaneGeometry(1,1);

const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms:{}
});

const object = new THREE.Mesh(geometry,material);
scene.add(object);

// MAIN LOOP
function animate() {
    renderer.render(scene,camera);
}