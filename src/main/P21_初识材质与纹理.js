/*
 * P21_初识材质与纹理
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
const doorColorTexture = textureLoader.load(
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.mphome.cn%2Fup%2Fimg%2F22%2Fb13066833576414.jpg&refer=http%3A%2F%2Fwww.mphome.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659261314&t=c2e794f4422fde2b05e13aeef6ab141f'
);

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);

// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: doorColorTexture,
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
