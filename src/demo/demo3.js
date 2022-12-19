import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// const axesHelper = new THREE.AxesHelper(5);
// axesHelper.name = 'axesHelper'
const animationMixer = new THREE.AnimationMixer(scene)

const gltfLoader = new GLTFLoader()

const clock = new THREE.Clock()

let event = {}


// 初始化渲染器
const render = new THREE.WebGLRenderer( //增加下面两个属性，可以抗锯齿
    {
        antialias: true,
        alpha: true
    })
// 设置渲染尺寸大小
render.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(render.domElement)

let action = null

event.onLoad = function (obj) {
    console.log('加载完成', obj)

    // obj.scene.name = 'Soldier'
    obj.scene.position.set(0, 0, 0)
    scene.add(obj.scene);
    scene.add(new THREE.AmbientLight(0xffffff, 1));  //环境光
    const animationClip = obj.animations.find((animationClip) => { return animationClip.name === 'root|stand|Base Layer' })
    // console.log(animationClip, 'animationClip');
    action = animationMixer.clipAction(animationClip)
    action.play()

}

// 递归判断
function isClickSoldier(object) {
    if (object.name === 'Soldier') {
        return object
    } else if (object.parent) {
        return isClickSoldier(object.parent)
    } else {
        return null
    }
}


// 光线投射
const raycaster = new THREE.Raycaster();

// 点击停止动画
// render.domElement.addEventListener('click', event => {
//     let { clientX, clientY } = event
//     let x = (clientX / window.innerWidth) * 2 - 1
//     let y = - (clientY / window.innerHeight) * 2 + 1
//     const pointer = new THREE.Vector2(x, y);

//     raycaster.setFromCamera(pointer, camera)

//     const intersects = raycaster.intersectObjects(scene.children, true)

//     const intersect = intersects.filter(inter => {
//         return inter.object.name !== 'axesHelper' && inter.object.name !== 'gridHelper' && inter.object.name !== 'plane'
//     })[0]  //过滤掉辅助网格 和 白色地板

//     // console.log(intersect, 'intersect');
//     if (intersect && isClickSoldier(intersect.object)) {
//         console.log(1, 'action');
//         action.stop()
//     }

// })





event.onProgress = function () {
    console.log('加载过程中');
}


event.onError = function (url) {
    console.log('加载错误' + url);
}

// const gltfPath = "./public/static/Soldier.glb";  //机器人
const gltfPath = "./public/static/woman.glb";  //   女生
// const gltfPath = "./public/static/sceneandwoman.glb";  //  场景 + 女生

gltfLoader.load(gltfPath, event.onLoad, event.onProgress, event.onError)


// 平面 -------------

const geometry = new THREE.PlaneGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.name = 'plane'
plane.rotation.x = Math.PI / 2

// scene.add(plane);


// 网格辅助---------------

const gridHelper = new THREE.GridHelper(50, 50);
// gridHelper.name = 'gridHelper'
scene.add(gridHelper);



camera.position.set(0, 50, 50)
// scene.add(axesHelper);
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
    animationMixer.update(clock.getDelta())
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