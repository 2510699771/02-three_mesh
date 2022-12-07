import * as THREE from 'three'
// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
// 性能
import Stats from 'three/examples/jsm/libs/stats.module.js'
// 光晕
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
// 动画插件
import gsap from 'gsap'
// gui 控制器
import * as dat from 'dat.gui'
// 1.创建场景
const scene = new THREE.Scene()

// 2.创建相机 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

// 实例化类
const renderer = new THREE.WebGLRenderer()  //初始化渲染器
const gltfLoader = new GLTFLoader()  // 加载器
const dracoLoader = new DRACOLoader()  // 加载器
const orbitControls = new OrbitControls(camera, renderer.domElement) // 轨道控制器
const clock = new THREE.Clock();  // 时钟
const textureLoader = new THREE.TextureLoader()  // 贴图
const axesHelper = new THREE.AxesHelper(200) //x y 轴辅助器
// orbitControls.autoRotate = true

// 平面
const geometry = new THREE.PlaneGeometry(200, 200); //平面实例化
const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotateX(-0.5 * Math.PI)
plane.position.y = -1;   // y轴位置
plane.receiveShadow = true; // 可以接收阴影



// 相机设置位置
camera.position.set(0, 120, 120);
camera.lookAt(new THREE.Vector3(0, 0, 0));


// 性能控制插件
const stats = new Stats();
document.body.appendChild(stats.dom);


// 


//  环境光
const light = new THREE.AmbientLight('#111111');

// 平行光
const directionalLight = new THREE.PointLight("#FFF5EE");
directionalLight.target = plane;
directionalLight.intensity = 2;
directionalLight.distance = 0;
directionalLight.position.set(130, 0, 0);
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


// 光晕

let lensFlare

const textureFlare0 = textureLoader.load('./textures/lensflare/lensflare0.png')
const textureFlare3 = textureLoader.load('./textures/lensflare/lensflare3.png')


lensFlare = new Lensflare();
lensFlare.addElement(new LensflareElement(textureFlare0, 700, 0, directionalLight.color));
lensFlare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
lensFlare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
lensFlare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
lensFlare.addElement(new LensflareElement(textureFlare3, 70, 1));

directionalLight.add(lensFlare)
lensFlare.position.copy(directionalLight.position);




// 实例化后基本设置
orbitControls.enableDamping = true //设置阻尼




renderer.setSize(window.innerWidth, window.innerHeight) //设置渲染器的大小
renderer.shadowMap.enabled = true;//告诉渲染器需要阴影效果
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
document.body.appendChild(renderer.domElement)  // 将渲染器的canvas内容添加到body上


// gui 控制器
// 初始化dat.Gui
const gui = new dat.GUI()

const guiParams = {
    angleSpeed: 0.01,
    angle: 0,
    isrotate: true,
}

// 设置按钮点击触发某个事件
gui.add(guiParams, 'isrotate').name('自动旋转')
gui.add(guiParams, 'angleSpeed').name('旋转速度').min(0.001).max(0.1).step(0.001)


// 公共加载事件对象
let event = {}

let anima

event.onLoad = function (object) {
    // console.log(object, 'object');
    const glbScene = object.scene
    glbScene.add(new THREE.AmbientLight(new THREE.Color('#FFF5EE')))
    glbScene.position.set(0, 20, 1)
    glbScene.scale.set(0.1, 0.1, 0.1)

    // 循环添加阴影
    glbScene.traverse(function (item) {
        if (item instanceof THREE.Mesh) {
            item.castShadow = true;
            item.receiveShadow = true;
            item.name = 'cube'
        }
    });

    scene.add(glbScene)

    anima = new THREE.AnimationMixer(glbScene)
    anima.clipAction(object.animations[0]).play()

    animate()
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

dracoLoader.setDecoderPath('./public/draco/')   // 解码
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.setPath(path)
gltfLoader.load(gltfName, event.onLoad, event.onProgress, event.onError)


// 场景添加
scene.add(camera)  //相机
scene.add(plane) //平面
scene.add(light); //环境光
scene.add(directionalLight); //平行光
// scene.add(lightHelper) //灯光辅助
scene.add(lensFlare); // 光晕
scene.add(axesHelper); // 光晕

renderer.render(scene, camera)  // 用相机(camera)渲染一个场景(scene)


// 每帧渲染函数
function animate() {

    requestAnimationFrame(animate); // 更新动画帧
    const delta = clock.getDelta();  // 获取时间

    anima.update(delta);  // 动画更新
    orbitControls.update(); //轨道更新
    renderer.render(scene, camera); //相机场景更新

    // 是否旋转
    if (guiParams.isrotate) {
        guiParams.angle += guiParams.angleSpeed;
        // 圆周运动网格模型x坐标计算  绕转半径100
        var x = 130 * Math.sin(guiParams.angle)
        // 圆周运动网格模型y坐标计算  绕转半径100
        var y = 130 * Math.cos(guiParams.angle)
        // 每次执行render函数，更新需要做圆周运动网格模型Mesh的位置属性
        directionalLight.position.set(x, y, 0);
        lensFlare.position.copy(directionalLight.position);
    }
}

// animate()

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