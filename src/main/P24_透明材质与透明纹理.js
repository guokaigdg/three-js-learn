/*
 * P24_透明材质与透明纹理
 */

import * as THREE from 'three';
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

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
    alphaMap: doorAplhaTexture, // P24_透明材质与透明纹理
    transparent: true, // 允许透明  P24_透明材质与透明纹理
    opacity: 0.5, // 透明度 P24_透明材质与透明纹理
    side: THREE.DoubleSide, // 渲染2面
    // side: THREE.BackSide, // 渲染2面
});
basicMaterial.side = THREE.BackSide; // 渲染2面
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 添加平面
const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    basicMaterial
);
plane.position.set(3, 0, 0);
scene.add(plane);

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
