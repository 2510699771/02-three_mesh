import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const axesHelper = new THREE.AxesHelper(5);
// axesHelper.name = 'axesHelper'


const fbxLoader = new FBXLoader()

let event = {}



// 初始化渲染器
const render = new THREE.WebGLRenderer()
// 设置渲染尺寸大小
render.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(render.domElement)


event.onLoad = function (object) {
    console.log(object, '模型');

    scene.add(object);

}


const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
camera.add(pointLight);

event.onProgress = function () {
    console.log('加载过程中');
}


event.onError = function (url) {
    console.log('加载错误' + url);
}

const fbxPath = "./textures/fbxData/nurbs.fbx";


fbxLoader.load(fbxPath, event.onLoad, event.onProgress, event.onError)



// 平面 -------------

const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.name = 'plane'
plane.rotation.x = Math.PI / 2

scene.add(plane);





camera.position.set(0, 20, 20)
scene.add(camera)






// 使用渲染器 通过相机 将场景渲染进来
render.render(scene, camera)





// 创建轨道控制器
const controls = new OrbitControls(camera, render.domElement)

// 设置阻尼 使控制器更有真实效果  必须在你的动画循环里调用.update()
controls.enableDamping = true

// 添加坐标轴辅助器   红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴



function rendeer(time) {
    controls.update()  //更新阻尼
    render.render(scene, camera);
    //  渲染下一帧的时候就会调用rendeer函数
    requestAnimationFrame(rendeer)
}

rendeer()


// 全屏 or  退出全屏
// window.addEventListener('dblclick', () => {
//     //    双击控制屏幕进入全屏 退出全屏
//     const fullScreenElement = document.fullscreenElement
//     if (!fullScreenElement) {
//         render.domElement.requestFullscreen()
//     } else {
//         document.exitFullscreen()
//     }
// })



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
    render.setPixelRatio(window.devicePixelRatio)
})