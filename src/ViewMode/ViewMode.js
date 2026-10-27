import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class ViewMode {
	next = this;
	camera;
	controls;
	frustumSize = 30;

	constructor() {
		if (this.constructor == ViewMode) {
			throw new Error("Abstract class ViewMode can't be instantiated.");
		}
	}

	setupCamera() {
		throw new Error("Method setupCamera is not defined.");
	}

	updateCameraAspect(aspect) {
		throw new Error("Method updateCameraAspect is not defined.");
	}

	setupControls(renderer) {
		this.controls = new OrbitControls(this.camera, renderer.domElement);
	}

	updateCamera() {
		this.camera.updateProjectionMatrix();
	}

	updateControls() {
		this.controls.update();

		if (this.controls.target.y < 0) {
			this.controls.target.y = 0;
		}

		if (this.camera.position.y < 0) {
			this.camera.position.y = 0;
		}
	}
}

export class Mode2D extends ViewMode {
	constructor(renderer, aspect = 1) {
		super();
		this.setupCamera(aspect);
		this.setupControls(renderer);
	}

	setupCamera() {
		this.camera = new THREE.OrthographicCamera(
			this.frustumSize / -2,
			this.frustumSize / 2,
			this.frustumSize / 2,
			this.frustumSize / -2,
		);
		this.camera.position.set(0, 30, 0);
		this.camera.updateProjectionMatrix();
	}

	setupControls(renderer) {
		this.controls = new OrbitControls(this.camera, renderer.domElement);
		this.controls.maxPolarAngle = 0;
	}

	updateCameraAspect(aspect) {
		this.camera.left = (this.frustumSize * aspect) / -2;
		this.camera.right = (this.frustumSize * aspect) / 2;
		this.camera.updateProjectionMatrix();
	}
}

export class Mode3D extends ViewMode {
	constructor(renderer, aspect = 1) {
		super();
		this.setupCamera(aspect);
		this.setupControls(renderer);
	}

	setupCamera() {
		this.camera = new THREE.PerspectiveCamera();
		this.camera.fov = 60;
		this.camera.position.set(0, this.frustumSize * Math.sqrt(3), 0);
		this.camera.updateProjectionMatrix();
	}

	setupControls(renderer) {
		this.controls = new OrbitControls(this.camera, renderer.domElement);
		this.controls.maxPolarAngle = Math.PI / 2;
	}

	updateCameraAspect(aspect) {
		this.camera.aspect = aspect;
		this.camera.updateProjectionMatrix();
	}
}
