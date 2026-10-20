import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function setUpScene() {
	const canvas = document.getElementById("canvas");

	const renderer = new THREE.WebGLRenderer({
		canvas: canvas,
		antialias: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	document.body.appendChild(renderer.domElement);

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera();
	camera.position.set(2, 5, 4);
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	camera.fov = 60;
	camera.updateProjectionMatrix();

	const controls = new OrbitControls(camera, renderer.domElement);

	function animate() {
		controls.update();
		renderer.render(scene, camera);
	}

	window.onresize = function () {
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
	};

	scene.add(camera);
	renderer.setAnimationLoop(animate);

	return scene;
}

const scene = setUpScene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
