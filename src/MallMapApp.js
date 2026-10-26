import * as THREE from "three";
import { DataGenerator } from "./DataGenerator";
import { InputController } from "./InputController";
import { GridStrategy } from "./ArrangeStrategy";
import { FloorGenerator } from "./FloorGenerator";
import { ViewModeController } from "./ViewModeController";
import { LabelSpriteFactory, LabelTroikaFactory } from "./LabelFactory";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class MallMapApp {
	constructor() {
		this.canvas = document.getElementById("canvas");
		if (!this.canvas) {
			throw new Error("Canvas elemen not found");
		}

		this.renderer = this.setupRenderer(this.canvas);
		this.scene = this.setupScene();
		this.stats = this.setupStats();

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
		const labelFactory = new LabelTroikaFactory();
		const floorGenerator = new FloorGenerator();
		floorGenerator.setArrangeStrategy(arrangeStrategy);
		floorGenerator.setLabelFactory(labelFactory);

		const floor = floorGenerator.generate(data);
		this.scene.add(floor.view3D);
	}

	animate() {
		this.viewModeController.updateControls();
		this.renderer.render(this.scene, this.viewModeController.getCamera());
		this.stats.update();
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

	setupRenderer(canvas) {
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		return renderer;
	}

	setupScene() {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0xfff4de);
		return scene;
	}

	setupStats() {
		const stats = Stats();
		document.body.appendChild(stats.dom);
		return stats;
	}
}
