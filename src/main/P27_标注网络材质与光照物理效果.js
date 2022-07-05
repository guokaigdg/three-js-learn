/*
 * P27_标注网络材质与光照物理效果
 */

import * as THREE from 'three';
import { PlaneGeometry } from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1.创建场景
const scene = new THREE.Scene();

// 2.创建相机(透视相机 )
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, // 屏幕宽度/屏幕高度
    0.1, // 近端
    10000 // 远端
);

// 设置camera坐标, x y z
camera.position.set(0, 0, 10);

// 3. 相机添加到场景中
scene.add(camera);

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
    'https://img1.baidu.com/it/u=598655570,3169839940&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=581'
);
const doorAplhaTexture = textureLoader.load(
    'https://img1.baidu.com/it/u=3544799171,3423892496&fm=253&fmt=auto&app=138&f=JPEG?w=1068&h=500'
); //

const doorAoTexture = textureLoader.load(
    'https://img2.baidu.com/it/u=4278857122,2228163089&fm=253&fmt=auto&app=138&f=JPEG?w=662&h=481'
);

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// 材质
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    alphaMap: doorAplhaTexture, // P24_透明材质与透明纹理
    transparent: true, // 允许透明  P24_透明材质与透明纹理/
    aoMap: doorAoTexture, // P25_环境遮挡贴图
    // aoMapIntensity: 1, // P25_环境贴图强度, 默认1
    // opacity: 0.5, // 透明度 P24_透明材质与透明纹理
    side: THREE.DoubleSide, // 渲染2面
    // side: THREE.BackSide, // 渲染背面
});
// basicMaterial.side = THREE.BackSide; // 渲染背面
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

// 给cube, 设置第二组UV P25_环境遮挡贴图与强度
cubeGeometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(3, 0, 0);

scene.add(plane);

// 给平面设置第二组UV P25_环境遮挡贴图与强度
planeGeometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光 环境光 P27_标注网络材质与光照物理效果
const light = new THREE.AmbientLight(0xffffff, 0.6); // 默认强度为1
scene.add(light);

// 直线光源
const directionaLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionaLight.position.set(10, 10, 10);
scene.add(directionaLight);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼, 更真实效果, 必须在动画动画循环调用 update()
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render); // 每一帧执行一次
}

render();
