/*
 * P10_应用requestAnimationFrame
 */

import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 1.创建场景
const scence = new THREE.Scene();

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
scence.add(camera);

// 添加物体
// 创建几何体
const cubeGemetry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff55 }); // 基础的网格材质

// THREE.Mesh(几何体,材质)创建物体
const cube = new THREE.Mesh(cubeGemetry, cubeMaterial);

// P9_缩放(方法)
cube.scale.set(3, 2, 1);
// P9_缩放(属性)
cube.scale.x = 2;

// P9_旋转 x, y z, 顺序
cube.rotation.set(Math.PI / 4, Math.PI, Math.PI / 2, 'XYZ');
// 将几何体添加到场景中
scence.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器, 将相机场景渲染进来
// renderer.render(scence, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scence.add(axesHelper);

function render(time) {
    // P10_应用requestAnimationFrame
    let t = (time / 1000) % 5;
    cube.position.x = t * 1;
    if (cube.position.x > 5) {
        cube.position.x = 0;
    }
    renderer.render(scence, camera);
    requestAnimationFrame(render); // 每一帧执行一次
}

render();
