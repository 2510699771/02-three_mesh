import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Water } from 'three/examples/jsm/objects/Water'
import { Sky } from 'three/examples/jsm/objects/Sky'
// 性能
import Stats from 'three/examples/jsm/libs/stats.module.js'
// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 20000)

const animationMixer = new THREE.AnimationMixer(scene)

const gltfLoader = new GLTFLoader()

const clock = new THREE.Clock()

const stats = new Stats();
container.appendChild(stats.dom);

let event = {}


// 初始化渲染器
const render = new THREE.WebGLRenderer( //增加下面两个属性，可以抗锯齿
    { antialias: true, })

// 设置渲染尺寸大小
render.setSize(window.innerWidth, window.innerHeight)

// 设置渲染效果****
render.toneMapping = THREE.ACESFilmicToneMapping;

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(render.domElement)

let action = null

event.onLoad = function (obj) {
    console.log('加载完成', obj)
    obj.scene.rotation.y = - Math.PI / 2;
    // obj.scene.name = 'Soldier'
    obj.scene.position.set(0, -5, 0)
    obj.scene.scale.set(4, 4, 4)
    scene.add(obj.scene);
    const animationClip = obj.animations.find((animationClip) => { return animationClip.name === 'Main' })

    action = animationMixer.clipAction(animationClip)
    action.play()

}



event.onProgress = function () {
    console.log('加载过程中');
}

event.onError = function (url) {
    console.log('加载错误' + url);
}

const gltfPath = "./public/static/mafer_city.glb";  //  场景 

gltfLoader.load(gltfPath, event.onLoad, event.onProgress, event.onError)



// 水

const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load('./textures/water/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 4,
    fog: scene.fog !== undefined
});
water.rotation.x = - Math.PI / 2;
scene.add(water);


// 天空

const sky = new Sky();
sky.scale.setScalar(10000);
scene.add(sky);
const skyUniforms = sky.material.uniforms;
skyUniforms['turbidity'].value = 20;
skyUniforms['rayleigh'].value = 2;
skyUniforms['mieCoefficient'].value = 0.005;
skyUniforms['mieDirectionalG'].value = 0.8;


// 太阳
const sun = new THREE.Vector3();
const pmremGenerator = new THREE.PMREMGenerator(render);
const phi = THREE.MathUtils.degToRad(88);
const theta = THREE.MathUtils.degToRad(180);
sun.setFromSphericalCoords(1, phi, theta);
sky.material.uniforms['sunPosition'].value.copy(sun);
water.material.uniforms['sunDirection'].value.copy(sun).normalize();
scene.environment = pmremGenerator.fromScene(sky).texture;



// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, .8);
scene.add(ambientLight);
// 添加平行光
const dirLight = new THREE.DirectionalLight(0xffffff, .8);
dirLight.color.setHSL(.1, 1, .95);
dirLight.position.set(-1, 1.75, 1);
dirLight.position.multiplyScalar(30);
scene.add(dirLight);


camera.position.set(0, 50, 50)
scene.add(camera)




// 使用渲染器 通过相机 将场景渲染进来
render.render(scene, camera)





// 创建轨道控制器
const controls = new OrbitControls(camera, render.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = 1.5;
controls.minDistance = 50;
controls.maxDistance = 1200;

// 设置阻尼 使控制器更有真实效果  必须在你的动画循环里调用.update()
controls.enableDamping = true

// 添加坐标轴辅助器   红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴



function rendeer(time) {

    water.material.uniforms['time'].value += 1.0 / 60.0;

    // 
    stats.update();
    // 

    controls.update()  //更新阻尼
    render.render(scene, camera);
    animationMixer.update(clock.getDelta())
    //  渲染下一帧的时候就会调用rendeer函数
    requestAnimationFrame(rendeer)
}

rendeer()



// 监听画面变化  更新渲染

window.addEventListener('resize', () => {
    console.log('画面更新了');

    // 1.更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    // 2.更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    // 3.更新渲染器
    render.setSize(window.innerWidth, window.innerHeight)
    // 4.设置渲染器像素比
    render.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})