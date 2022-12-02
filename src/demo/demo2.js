import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const axesHelper = new THREE.AxesHelper(5);



let event = {}
event.onLoad = function () {
    console.log('加载完成');
}
event.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('加载过程中' + url);
    console.log('目前已加载项的个数。' + itemsLoaded);
    console.log('总共所需要加载项的个数。' + itemsTotal);
    console.log('加载进度百分比', (itemsLoaded / itemsTotal * 100).toFixed(2) + '%');

}
event.onError = function (url) {
    console.log('加载错误' + url);
}

// 组加载管理器
const manager = new THREE.LoadingManager(event.onLoad, event.onProgress, event.onError);

const mapLoader = new THREE.TextureLoader(manager)

// 加载树
const treeMap = mapLoader.load("/textures/sixteenPic/tree.png");
for (let index = 0; index < 100; index++) {
    // 精灵材质
    const spriteMaterial = new THREE.SpriteMaterial({
        map: treeMap, //设置精灵纹理贴图
        transparent: true,
        opacity: 0.95,
    });
    // 物体
    const sprite = new THREE.Sprite(spriteMaterial);

    let n = Math.random() * (30 + 1 + 20) - 20
    let m = Math.random() * (30 + 1 + 20) - 20

    // 设置精灵模型位置，在xoz平面上随机分布
    sprite.position.set(n, 1, m,)
    sprite.scale.set(5, 5, 1)

    scene.add(sprite);
}


// 草地


const gressNormal = mapLoader.load("./textures/grass/vcjmaixs_2K_Normal.jpg")
const gressRoughness = mapLoader.load("./textures/grass/vcjmaixs_2K_Roughness.jpg")
const gressAlbedo = mapLoader.load("./textures/grass/vcjmaixs_4K_Albedo.jpg")
const gressAo = mapLoader.load("./textures/grass/vcjmaixs_4K_AO.jpg")
const gressBump = mapLoader.load("./textures/grass/vcjmaixs_4K_Bump.jpg")
const gressDisplacement = mapLoader.load("./textures/grass/vcjmaixs_4K_Displacement.jpg")
const gressSp = mapLoader.load("./textures/grass/vcjmaixs_Popup_3840_sp.jpg")


gressSp.wrapS = THREE.RepeatWrapping
gressSp.wrapT = THREE.RepeatWrapping
gressSp.repeat.set(10, 10);


// 几何平面
const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
// 材质
const material = new THREE.MeshStandardMaterial({
    color: 0x777700,
    side: THREE.DoubleSide,
    map: gressSp,
    aoMap: gressAo,
    bumpMap: gressBump,
    emissiveMap: gressAlbedo,
    transparent: true, //设置可以透明   
    displacementMap: gressDisplacement,
    normalMap: gressNormal,
    roughnessMap: gressRoughness,
    opacity: 1,
});
const plane = new THREE.Mesh(geometry, material);

// 平面添加第二组uv数据
geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2))
// rotateX  沿x旋转
plane.rotateX(-Math.PI / 2)
plane.position.set(0, -1.5, 0)


// 灯光(环境光)
const light = new THREE.AmbientLight('#fff', 1.5); // soft white light



camera.position.set(0, 0, 30)
scene.add(plane);
scene.add(axesHelper);
scene.add(camera)
scene.add(light);




// 初始化渲染器
const render = new THREE.WebGLRenderer()
// 设置渲染尺寸大小
render.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的canvas内容添加到body上
document.body.appendChild(render.domElement)


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
window.addEventListener('dblclick', () => {
    //    双击控制屏幕进入全屏 退出全屏
    const fullScreenElement = document.fullscreenElement
    if (!fullScreenElement) {
        render.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})



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