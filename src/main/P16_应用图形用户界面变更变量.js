/*
 * P16_应用图形用户界面变更变量
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
const cubeGemetry = new THREE.BoxGeometry(1, 1, 1);
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

// P16_应用图形用户界面变更变量
const gui = new dat.GUI();
gui.add(cube.position, 'x')
    .min(0)
    .max(5)
    .step(0.1)
    .name('X轴')
    .onChange((value) => {
        console.log('修改值', value);
    })
    .onFinishChange((value) => {
        console.log('完全停下来', value);
    });
gui.add(cube.position, 'y').min(0).max(5).name('Y轴');

//P16_应用图形用户界面变更变量, 修改颜色
const params = {
    color: '#000000',
    fn: () => {
        // 运动起来
        gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 }); // 往返运动
    },
};
gui.addColor(params, 'color').onChange((value) => {
    cube.material.color.set(value);
    console.log(value);
});
// 设置选项框
gui.add(cube, 'visible').name('是否显示');
// 点击触发某个事件
gui.add(params, 'fn').name('点击此处开始运动');
// 菜单折叠
var folder = gui.addFolder('设置立方体菜单(更多)');
folder.add(cube.material, 'wireframe');
folder.add(params, 'fn').name('点击此处开始运动');

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
