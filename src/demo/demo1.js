import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const axesHelper = new THREE.AxesHelper(5);
// 精灵纹理
const spriteTextureLoader = new THREE.TextureLoader().load('/textures/sixteenPic/sprite.png')
// 类型为json的文件加载器 
const fileLoader = new THREE.FileLoader().setResponseType('json')
// 创建组对象，包含所有精灵对象
const group = new THREE.Group();

// 设置相机位置
camera.position.set(0, 0, 25)
camera.zoom = 20

const evn = {}
evn.onLoad = function (data) {
    data.map((item) => {
        // 精灵材质
        var spriteMaterial = new THREE.SpriteMaterial({
            map: spriteTextureLoader, //设置精灵纹理贴图
            transparent: true,
            opacity: 0.95,
        });
        // 精灵数组中
        const sprite = new THREE.Sprite(spriteMaterial);
        // 添加到
        group.add(sprite);
        const k = item.value / 200
        sprite.scale.set(k, k, 1)
        sprite.position.set(item.coordinate[0], item.coordinate[1], 0)
        // 修改精灵数组位置
        group.position.set(-110, -30, 0);
        // 添加整个精灵数组
        scene.add(group);
    })
}
evn.onProgress = function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
}
evn.onError = function () {
    console.log('加载错误');
}


// 文件加载对象
fileLoader.load('/textures/jsonData/pm25.json', evn.onLoad, evn.onProgress, evn.onError)


const light = new THREE.PointLight(0xff0000, 60, 100);
light.position.set(10, 10, 10);


const pointLightHelper = new THREE.PointLightHelper(light, 1);



scene.add(axesHelper);
scene.add(camera)
scene.add(light)
// scene.add(pointLightHelper)


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