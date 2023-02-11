import * as THREE from './node_modules/three/build/three.module.js';
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

// scene, camera, render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
camera.position.setZ(30);

renderer.render( scene, camera );

// geometry, material and mesh
const geometry = new THREE.SphereGeometry(3, 64, 16);
const material = new THREE.MeshStandardMaterial( {
     color: 0xFF6347,
     } );
const sphere = new THREE.Mesh(geometry, material);

// texture of moon
const texture = new THREE.TextureLoader('moon.jpg');

scene.add( sphere );

// lights
const pointLight = new THREE.PointLight({ color: 0xFFFFFF});
const ambientLight = new THREE.AmbientLight({ color: 0xFFFFFF });
pointLight.position.set(20, 20, 20);

scene.add( pointLight, ambientLight );

/* helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add( lightHelper, gridHelper );
*/

// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {  // game loop, to not update our render over and over again when we add a new obj to the scene
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    sphere.rotation.z += 0.01;

    // controls.update();
    
    renderer.render( scene, camera );
}


animate();