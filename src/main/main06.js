import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 
import gsap from 'gsap'

import * as dat from 'dat.gui'

// 环境遮挡贴图与强度


// 1.创建场景
const scene = new THREE.Scene()


//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


// 设置相机位置
camera.position.set(0, 0, 10)

// 加入场景
scene.add(camera)

//纹理加载器


const textureLoader = new THREE.TextureLoader()

// 纹理1
const door1 = textureLoader.load('./textures/door/door1.jpeg')
const alpha = textureLoader.load('./textures/alpha.jpg')

// console.log(door1);
// 设置纹理偏移
// door1.offset.set(0.5, 0.5)
// 设置纹理旋转  45°
// door1.rotation = Math.PI / 4
// 设置纹理旋转中心点
// door1.center.set(0.5, 0.5)
// 设置纹理重复
// door1.repeat.set(2, 3)
// 设置纹理重复模式
// door1.wrapS = THREE.MirroredRepeatWrapping
// door1.wrapT = THREE.RepeatWrapping


// door1.magFilter = THREE.NearestFilter
// door1.minFilter = THREE.NearestMipmapNearestFilter


// 创建几何体

// 物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: '#ffff00',
    map: door1,  // 纹理图
    alphaMap: alpha, // 透明纹理图
    transparent: true, //设置可以透明
    side: THREE.DoubleSide
    // opacity:0.5
})

const mesh = new THREE.Mesh(cubeGeometry, basicMaterial);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basicMaterial);
plane.position.set(3, 0, 0)


// 添加第二组uv数据
plane.set



scene.add(mesh)
scene.add(plane)



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