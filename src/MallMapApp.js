import * as THREE from "three";
import { DataGenerator } from "./DataGenerator";
import { InputController } from "./InputController";
import { GridStrategy } from "./ArrangeStrategy";
import { FloorGenerator } from "./FloorGenerator";
import { ViewModeController } from "./ViewModeController";

export class MallMapApp {
	constructor() {
		this.canvas = document.getElementById("canvas");
		if (!this.canvas) {
			throw new Error("Canvas elemen not found");
		}

		this.renderer = this.setupRenderer();
		this.scene = this.setupScene();

		this.renderer.setAnimationLoop(() => this.animate());
		window.addEventListener("resize", () => this.onResize());

		this.viewModeController = new ViewModeController(this.renderer);
		this.inputController = new InputController(this.viewModeController);
		this.viewModeController.updateCameraAspect(
			this.canvas.clientWidth / this.canvas.clientHeight,
		);

		this.dataGenerator = new DataGenerator();
		const data = this.dataGenerator.generate(100);

		const arrangeStrategy = new GridStrategy();
		const floorGenerator = new FloorGenerator();
		floorGenerator.setArrangeStrategy(arrangeStrategy);

		const floor = floorGenerator.generate(data);
		this.scene.add(floor.view3D);
	}

	animate() {
		this.viewModeController.updateControls();
		this.renderer.render(this.scene, this.viewModeController.getCamera());
	}

	onResize() {
		this.viewModeController.updateCameraAspect(
			this.canvas.clientWidth / this.canvas.clientHeight,
		);
		this.renderer.setSize(
			this.canvas.clientWidth,
			this.canvas.clientHeight,
			false,
		);
	}

	setupRenderer() {
		const renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		return renderer;
	}

	setupScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xfff4de);
		return scene;
	}
}
