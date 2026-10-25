import * as THREE from "three";
import { DataGenerator } from "./DataGenerator";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class MallMapApp {
	constructor() {
		this.canvas = document.getElementById("canvas");
		if (!this.canvas) {
			throw new Error("Canvas elemen not found");
		}

		this.renderer = this.setupRenderer(this.canvas, window.devicePixelRatio);
		this.camera = this.setupCamera(this.canvas);
		this.controls = this.setupControls(this.camera, this.renderer);
		this.scene = this.setupScene();

		this.renderer.setAnimationLoop(() => this.animate());
		window.addEventListener("resize", () => this.onResize());

		this.dataGenerator = new DataGenerator();
		const data = this.dataGenerator.generate(100);
	}

	animate() {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	onResize() {
		this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(
			this.canvas.clientWidth,
			this.canvas.clientHeight,
			false,
		);
	}

	setupRenderer(canvas, dpr) {
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
		});
		renderer.setPixelRatio(dpr);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		return renderer;
	}

	setupCamera(canvas) {
		const camera = new THREE.PerspectiveCamera();
		camera.position.set(2, 5, 4);
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.fov = 60;
		camera.updateProjectionMatrix();
		return camera;
	}

	setupControls(camera, renderer) {
		return new OrbitControls(camera, renderer.domElement);
	}

	setupScene() {
		const scene = new THREE.Scene();
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshPhongMaterial({
			color: 0x00ff00,
			emissive: 0xffff00,
			emissiveIntensity: 0.1,
		});
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		return scene;
	}
}
