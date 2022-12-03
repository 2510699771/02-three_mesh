import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";   //引入加载外部模型

// 1.创建场景
const scene = new THREE.Scene()
//  2.创建相机(透视相机)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const axesHelper = new THREE.AxesHelper(5);


// var material = new THREE.MeshLambertMaterial({
//     color: 0x0000ff,
// }); //材质对象Material
// console.log(material);
// console.log(material.toJSON());
// console.log(JSON.stringify(material));


let event = {}
event.onLoad = function (obj) {
    console.log('加载完成', obj);
    scene.add(obj);
}


event.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('加载过程中' + url);
}


event.onError = function (url) {
    console.log('加载错误' + url);
}




//纹理加载器   (被manager 统一管理)
const textureLoader = new THREE.TextureLoader()




// 纹理加载
const preview = textureLoader.load('./textures/wfu/wfufefu_Popup_3840_sp.jpg')
const wfuAlbedo = textureLoader.load('./textures/wfu/wfufefu_2K_Albedo.jpg')
const wfuAo = textureLoader.load('./textures/wfu/wfufefu_2K_AO.jpg')
const wfuDisplacementMap = textureLoader.load('./textures/wfu/wfufefu_2K_Displacement.jpg')
const wfuNormal = textureLoader.load('./textures/wfu/wfufefu_2K_Normal.jpg')
const wfuRoughnessMap = textureLoader.load('./textures/wfu/wfufefu_2K_Roughness.jpg')
const wfuBump = textureLoader.load('./textures/wfu/wfufefu_2K_Bump.jpg')




// loader.setPath(path);
// loader.setMaterials(material)
// loader.load('./textures/objData/untitled1.obj', event.onLoad, event.onProgress, event.onError)


let path = "../public/static/untitled1";


// let path = "./statics/models/obj/IronMan/";
let objName = "untitled1.obj";
let mtlName = "untitled1.mtl";

function initModel() {
    try {
        // 1 初始化纹理加载器
        var mtlLoader = new MTLLoader();
        // 2 设置mtl资源路径
        mtlLoader.resourcePath = path;
        mtlLoader.path = path;
        // 3 加载材质
        mtlLoader.load(mtlName, function (materials) {
            materials.preload();
            // 4 加载模型
            var objLoader = new THREE.OBJLoader();

            objLoader.setMaterials(materials);
            objLoader.setPath(path);
            objLoader.load(objName, function (obj) {
                // obj.position.y = 10;
                // obj.scale.set(2, 2, 2);
                // scene.add(obj);
            })
        })
    } catch (e) {
        console.error('解析失败', e);
    }
}

initModel();



camera.position.set(0, 0, 30)
scene.add(axesHelper);
scene.add(camera)



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