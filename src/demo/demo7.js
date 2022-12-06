import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import Stats from 'three/examples/jsm/libs/stats.module.js'

// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机 
const camera = new THREE.PerspectiveCamera(45, window.innerHeight / window.innerWidth, 0.1, 1000)

// 实例化类
const renderer = new THREE.WebGLRenderer()  //初始化渲染器
const gltfLoader = new GLTFLoader()  // 加载器
const dracoLoader = new DRACOLoader()  // 加载器
const orbitControls = new OrbitControls(camera, renderer.domElement) //轨道控制器
orbitControls.autoRotate = true

// 平面
const geometry = new THREE.PlaneGeometry(100, 100); //平面实例化
const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotateX(-0.5 * Math.PI)
plane.position.y = -.1;   // y轴位置
plane.receiveShadow = true; // 可以接收阴影



// 相机设置位置
camera.position.set(0, 100, 200);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// 性能控制插件
const stats = new Stats();
document.body.appendChild(stats.dom);


// 光
const light = new THREE.AmbientLight('#111111');

const directionalLight = new THREE.DirectionalLight("#ffffff");
directionalLight.position.set(40, 60, 10);
directionalLight.shadow.camera.near = 1; //产生阴影的最近距离
directionalLight.shadow.camera.far = 400; //产生阴影的最远距离
directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
directionalLight.shadow.camera.right = 50; //最右边
directionalLight.shadow.camera.top = 50; //最上边
directionalLight.shadow.camera.bottom = -50; //最下面    

//这两个值决定生成阴影密度 默认512
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.mapSize.width = 1024;

//告诉平行光需要开启阴影投射
directionalLight.castShadow = true;


// 实例化后基本设置
orbitControls.enableDamping = true //设置阻尼


renderer.setSize(window.innerWidth, window.innerHeight) //设置渲染器的大小
//告诉渲染器需要阴影效果
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
document.body.appendChild(renderer.domElement)  // 将渲染器的canvas内容添加到body上



// 公共加载事件对象
let event = {}

event.onLoad = function (object) {
    console.log(object, 'object');

}

event.onProgress = function () {
    console.log('加载过程中');
}


event.onError = function (url) {
    console.log('加载错误' + url);
}

// 加载模型文件

let path = './public/static/'
let gltfName = 'LittlestTokyo.glb'

dracoLoader.setDecoderPath(path)
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.setPath(path)
gltfLoader.load(gltfName, event.onLoad, event.onProgress, event.onError)



scene.add(camera)
scene.add(plane)
scene.add(light);
scene.add(directionalLight);


renderer.render(scene, camera)  // 用相机(camera)渲染一个场景(scene)

function animate() {

    requestAnimationFrame(animate);


    orbitControls.update();
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
    renderer.setPixelRatio(window.devicePixelRatio)
})