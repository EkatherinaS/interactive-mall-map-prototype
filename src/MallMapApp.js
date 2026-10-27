import * as THREE from "three";
import { DataGenerator } from "./DataGenerator";
import { InputController } from "./InputController";
import { GridStrategy } from "./ArrangeStrategy";
import { FloorGenerator } from "./FloorGenerator";
import { ViewModeController } from "./ViewModeController";
import { LabelSpriteFactory, LabelTroikaFactory } from "./LabelFactory";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { InteractionController } from "./InteractionController";

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

		const dataGenerator = new DataGenerator();
		const data = dataGenerator.generate(100);

		const arrangeStrategy = new GridStrategy();
		const labelFactory = new LabelSpriteFactory();
		const floorGenerator = new FloorGenerator();
		floorGenerator.setArrangeStrategy(arrangeStrategy);
		floorGenerator.setLabelFactory(labelFactory);

		this.floor = floorGenerator.generate(data);
		this.scene.add(this.floor.view3D);

		this.viewModeController = new ViewModeController(this.renderer);
		this.interactionController = new InteractionController(
			this.floor.placeViews.map((view) => view.mesh),
			this.viewModeController,
		);
		this.inputController = new InputController(
			this.viewModeController,
			this.interactionController,
		);
		this.viewModeController.updateCameraAspect(
			this.canvas.clientWidth / this.canvas.clientHeight,
		);
	}

	animate() {
		this.viewModeController.updateControls();
		this.interactionController.updateHover();
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
