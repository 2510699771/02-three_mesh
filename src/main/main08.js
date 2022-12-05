import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 
import gsap from 'gsap'

import * as dat from 'dat.gui'
import { BufferAttribute } from 'three'

//  环境贴图    场景贴图


// 1.创建场景
const scene = new THREE.Scene()


//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


// 设置相机位置
camera.position.set(0, 0, 10)

// 立方纹理 
const loader = new THREE.CubeTextureLoader();

const textureCube = loader.load([
    'textures/cubeMap/px.jpg',
    'textures/cubeMap/nx.jpg',
    'textures/cubeMap/py.jpg',
    'textures/cubeMap/ny.jpg',
    'textures/cubeMap/pz.jpg',
    'textures/cubeMap/nz.jpg',
]);


// 加入场景
scene.add(camera)

let div = document.createElement('div')
div.style.width = '200px'
div.style.height = '100px'
div.style.position = 'fixed'
div.style.right = '50px'
div.style.top = '50px'
div.style.color = '#fff'
document.body.appendChild(div)


// 创建几何体

// 物体
const cubeGeometry = new THREE.SphereGeometry(1, 20, 20)




// 材质
const material = new THREE.MeshStandardMaterial({
    envMap: textureCube,
    // map: preview,  // 纹理图
    // alphaMap: wfuAlbedo, // 透明纹理图
    // transparent: true, //设置可以透明
    // side: THREE.DoubleSide,
    // displacementMap: wfuDisplacementMap,
    // aoMap: wfuAo,
    // normalMap: wfuNormal,
    // bumpMap: wfuBump,
    // roughnessMap: wfuRoughnessMap,
    // aoMapIntensity: 0.5, //遮挡强度
    roughness: 0.1,//粗糙程度
    metalness: 0.8,//金属程度
    // opacity:0.5
})

const mesh = new THREE.Mesh(cubeGeometry, material);

const planeGeometry = new THREE.PlaneGeometry(1, 1, 5, 5)

const plane = new THREE.Mesh(planeGeometry, material);

plane.position.set(3, 0, 0)


// 平面添加第二组uv数据
// planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))

// mesh 添加第二组uv数据
// cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))


// 灯光(环境光)
const light = new THREE.AmbientLight(0x404040, 2); // soft white light

// 灯光(直线光)
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(10, 10, 10)

// scene.add(directionalLight);


// 点精灵
// var texture = new THREE.TextureLoader().load("textures/sixteenPic/招聘求职.png");
// 创建精灵材质对象SpriteMaterial
// var spriteMaterial = new THREE.SpriteMaterial({
//     color: 0xff00ff,//设置精灵矩形区域颜色
//     // rotation: Math.PI / 4,//旋转精灵对象45度，弧度值
//     map: texture,//设置精灵纹理贴图
// });
// 创建精灵模型对象，不需要几何体geometry参数
// var sprite = new THREE.Sprite(spriteMaterial);
// scene.add(sprite);
// 控制精灵大小，比如可视化中精灵大小表征数据大小
// sprite.scale.set(3, 3, 1); //// 只需要设置x、y两个分量就可以







scene.add(light);
scene.add(mesh)
scene.add(plane)

// 背景氛围贴图 
scene.background = textureCube


// 修改物体的位置
// cube.position.set(5, 0, 0)
// cube.position.x = 3

// 缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 3

// 旋转
// cube.rotation.set(Math.PI / 4, Math.PI / 2, Math.PI / 8, 'XZY')

// 设置动画

// var animate1 = gsap.to(cube.position, {
//     x: 5,
//     duration: 5,
//     ease: 'power1.inOut',
//     repeat: 2,  // 循环次数  无限循环-1
//     yoyo: true,  // 往返运动
//     delay: 2,   // 延迟2s运动
//     onComplete: () => { console.log('动画完成'); },
//     onStart: () => { console.log('动画开始'); },
// })
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 })

// 暂停 恢复
// window.addEventListener('dblclick', () => {
//     console.log(animate1);
//     if (animate1.isActive()) {
//         // 暂停
//         animate1.pause()
//     } else {
//         // 恢复
//         animate1.resume()
//     }
// })



// 将几何体添加到场景





// 初始化dat.Gui
const gui = new dat.GUI()

// // 运动参数
// var animate2 = gsap.to(cube.position, {
//     x: 5,
//     duration: 2,
//     ease: 'power1.inOut',
//     repeat: -1,  // 循环次数  无限循环-1
//     yoyo: true,  // 往返运动
//     // delay: 2,   // 延迟2s运动
//     onComplete: () => { console.log('动画完成'); },
//     onStart: () => { console.log('动画开始'); },
// })
// animate2.pause()

const params = {
    color: '#ffff00',
    // 立方体运动
    fn: () => {
        if (animate2.isActive()) {
            // 暂停
            animate2.pause()
        } else {
            // 恢复
            animate2.resume()
        }
    }
}

// // 设置移动
// gui.add(cube.position, 'x')
//     .min(0)
//     .max(5)
//     .step(0.01)
//     .name('移动x轴')
//     .onChange((value) => { console.log(value) })
//     .onFinishChange((value) => { console.log('完全停下来', value); })

// // 设置物体颜色
// gui.addColor(params, 'color').onChange((value) => {
//     console.log(value);
//     cube.material.color.set(value)
// }).name('物体颜色')

// // 设置物体显示/隐藏
// gui.add(cube, 'visible').name('是否显示')

// // 设置按钮点击触发某个事件
// gui.add(params, 'fn').name('点击立方体运动')

// // 设置立方体
// var folder = gui.addFolder('设置立方体')
// folder.add(cube.material, 'wireframe')




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

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

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