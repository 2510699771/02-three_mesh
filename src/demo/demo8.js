import * as THREE from 'three'
import TWEEN from '.././jsm/tween.js';//
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'; //
import { CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';


let camera, scene, renderer, controls;
const particlesTotal = 512;  // 精灵总数量
const positions = [];   // 所有位置集合
const objects = [];    // 所有精灵对象
let current = 0;      // 第几个物体


// 1.创建场景
scene = new THREE.Scene()
scene.background = new THREE.Color('black')
// 2.创建相机 
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000)
camera.position.set(600, 400, 1500);
camera.lookAt(0, 0, 0);

const image = document.createElement('img');

image.src = './textures/sprite.png';

image.addEventListener('load', function () {

    for (let i = 0; i < particlesTotal; i++) {

        const object = new CSS3DSprite(image.cloneNode());   //3D精灵对象
        object.position.x = Math.random() * 4000 - 2000
        object.position.y = Math.random() * 4000 - 2000
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);
        objects.push(object);
    }
    transition();
});

// Plane

const amountX = 16;
const amountZ = 32;
const separationPlane = 150;
const offsetX = ((amountX - 1) * separationPlane) / 2;
const offsetZ = ((amountZ - 1) * separationPlane) / 2;

for (let i = 0; i < particlesTotal; i++) {

    const x = (i % amountX) * separationPlane;
    const z = Math.floor(i / amountX) * separationPlane;
    const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;

    positions.push(x - offsetX, y, z - offsetZ);

}

// Cube

const amount = 8;
const separationCube = 150;
const offset = ((amount - 1) * separationCube) / 2;

for (let i = 0; i < particlesTotal; i++) {

    const x = (i % amount) * separationCube;
    const y = Math.floor((i / amount) % amount) * separationCube;
    const z = Math.floor(i / (amount * amount)) * separationCube;

    positions.push(x - offset, y - offset, z - offset);

}

// Random

for (let i = 0; i < particlesTotal; i++) {

    positions.push(
        Math.random() * 4000 - 2000,
        Math.random() * 4000 - 2000,
        Math.random() * 4000 - 2000
    );

}

// Sphere

const radius = 750;

for (let i = 0; i < particlesTotal; i++) {

    const phi = Math.acos(- 1 + (2 * i) / particlesTotal);
    const theta = Math.sqrt(particlesTotal * Math.PI) * phi;

    positions.push(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    );

}

// 实例化类
renderer = new CSS3DRenderer()  //初始化渲染器
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

controls = new TrackballControls(camera, renderer.domElement);
controls.enabled = true





// 设置图形变换
function transition() {

    const graphical = current * particlesTotal * 3   //第一个元素 第一个轴位置

    const duration = 2000; 		// 变化过程时间

    for (let i = 0, j = graphical; i < particlesTotal; i++, j += 3) {

        const object = objects[i];

        new TWEEN.Tween(object.position)
            .to({
                x: positions[j],
                y: positions[j + 1],
                z: positions[j + 2]
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 3)
        .onComplete(transition)	//动画结束回调,继续调用函数
        .start();

    current = (current + 1) % 4;

}


function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

    const time = performance.now();

    // 精灵大小改变  类似呼吸

    for (let i = 0, l = objects.length; i < l; i++) {

        const object = objects[i];
        const scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1;
        object.scale.set(scale, scale, scale);

    }

    renderer.render(scene, camera);

}

animate()


window.addEventListener('resize', () => {
    console.log('画面更新了');

    // 1.更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 2.更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 3.更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 4.设置渲染器像素比
    // renderer.setPixelRatio(window.devicePixelRatio)
})