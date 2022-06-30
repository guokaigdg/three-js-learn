/*
 * P19_生成酷炫三角形科技物体
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

// P19_生成酷炫三角形科技物体
// 创建50个图形
for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArr = new Float32Array(9);
    // 每一个三角形需要3个顶点,每个顶点需要三个值
    for (let j = 0; j < 9; j++) {
        positionArr[j] = Math.random() * 5 * (Math.random() > 0.5 ? 1 : -1);
    }
    // P18_BufferGeometry设置顶点创建矩形
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArr, 3)
    );
    //  随机颜色
    let newColor = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
        color: newColor,
        transparent: true,
        opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scence.add(mesh);
}

// 根据几何物体和材质创建物体

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
