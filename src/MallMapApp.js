import * as THREE from "three";
import { DataGenerator } from "./DataGenerator";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { FloorGenerator } from "./FloorGenerator";
import { GridStrategy } from "./ArrangeStrategy";

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

		const arrangeStrategy = new GridStrategy();
		const floorGenerator = new FloorGenerator();
		floorGenerator.setArrangeStrategy(arrangeStrategy);

		const floor = floorGenerator.generate(data);
		this.scene.add(floor.view3D);
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
		camera.position.set(0, 30, 20);
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
		scene.background = new THREE.Color(0xfff4de);
		return scene;
	}
}
