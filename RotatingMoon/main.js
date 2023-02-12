import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// scene, camera, render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setSize( sizes.width, sizes.height );
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
pointLight.position.set(0, 20, 20);

scene.add( pointLight, ambientLight );

// resize functionality
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const canvas = document.querySelector('canvas');

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // to not stop instantly
controls.enablePan = false; 

function animate() {  // game loop, to not update our render over and over again when we add a new obj to the scene
    window.requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
    sphere.rotation.z += 0.01;

    controls.update();
    
    renderer.render( scene, camera );
}


animate();