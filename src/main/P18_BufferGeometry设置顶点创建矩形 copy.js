/*
 * P18_BufferGeometry设置顶点创建矩形
 */

import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap';
// 导入dat.gui
import * as dat from 'dat.gui';

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
const geometry = new THREE.BufferGeometry();
// P18_BufferGeometry设置顶点创建矩形
const vertices = new Float32Array([
    -1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    1.0,
    1.0, // 三个点
    1.0,
    1.0,
    1.0,
    -1.0,
    1.0,
    1.0,
    -1.0,
    -1.0,
    1.0, // 三个点
]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xffff55 });
// 根据几何物体和材质创建物体
const mesh = new THREE.Mesh(geometry, material);

scence.add(mesh);

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
scence.add(axesHelper);

// 设置时钟, P11_通过Clock跟踪时间处理动画应用
const clock = new THREE.Clock();

window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement;
    // P15_调用js接口控制画面布局全屏和退出全屏
    if (!fullScreenElement) {
        // 双击全屏
        renderer.domElement.requestFullscreen();
    } else {
        // 双击退出全屏
        document.exitFullscreen();
    }
});

function render() {
    controls.update();
    renderer.render(scence, camera);
    requestAnimationFrame(render); // 每一帧执行一次
}

render();

// P14_ 监听画面变化, 更新渲染画面
window.addEventListener('resize', () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器像素比
    renderer.setPixelRatio(window.devicePixelRatio);
});
