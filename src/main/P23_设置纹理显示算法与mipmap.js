/*
 * P23_设置纹理显示算法与mipmap
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
// const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const texture = textureLoader.load(
    'https://img1.baidu.com/it/u=598655570,3169839940&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=581'
);

// P22_详情纹理偏移
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5, 0.5);

// P22_详情纹理旋转
// doorColorTexture.center.set(0.5, 0.5); // 设置旋转原点
// doorColorTexture.rotation = Math.PI / 4;

// P22_详情纹理偏移重复
// doorColorTexture.repeat.set(2, 3);
// 设置纹理重复模式
// doorColorTexture.wrapT = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapS = THREE.RepeatWrapping;

// P23_设置纹理显示算法与mipmap
// texture.minFilter = THREE.NearestFilter; // 最接近的纹理值,
// texture.magFilter = THREE.NearestFilter; // 最接近的纹理值
texture.minFilter = THREE.LinearFilter; // 默认THREE.linearFilter 双线性插值
texture.magFilter = THREE.LinearFilter; // 默认THREE.linearFilter 双线性插值

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
});

const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

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
