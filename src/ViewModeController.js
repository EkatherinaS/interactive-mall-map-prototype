import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { TweenCamera } from "./TweenCamera";

class ViewMode {
	next = this;
	camera;
	controls;

	constructor() {
		if (this.constructor == ViewMode) {
			throw new Error("Abstract class ViewMode can't be instantiated.");
		}
	}

	updateCameraAspect(aspect) {
		throw new Error("Method updateCameraAspect is not defined.");
	}

	setupCamera(aspect) {
		throw new Error("Method setupCamera is not defined.");
	}

	setupControls(renderer) {
		this.controls = new OrbitControls(this.camera, renderer.domElement);
	}

	updateCamera() {
		this.camera.updateProjectionMatrix();
	}

	updateControls() {
		this.controls.update();
	}
}

class Mode2D extends ViewMode {
	frustumSize = 30;

	constructor(renderer, aspect = 1) {
		super();
		this.setupCamera(aspect);
		this.setupControls(renderer);
	}

	setupCamera(aspect) {
		this.camera = new THREE.OrthographicCamera(
			(this.frustumSize * aspect) / -2,
			(this.frustumSize * aspect) / 2,
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
	}
}

class Mode3D extends ViewMode {
	constructor(renderer, aspect = 1) {
		super();
		this.setupCamera(aspect);
		this.setupControls(renderer);
	}

	setupCamera(aspect) {
		this.camera = new THREE.PerspectiveCamera();
		this.camera.fov = 60;
		this.camera.position.set(0, 30, 0);
		this.camera.aspect = aspect;
		this.camera.updateProjectionMatrix();
	}

	setupControls(renderer) {
		this.controls = new OrbitControls(this.camera, renderer.domElement);
		this.controls.maxPolarAngle = Math.PI / 2;
	}

	updateCameraAspect(aspect) {
		this.camera.aspect = aspect;
	}
}

export class ViewModeController {
	aspect = 1;
	position;
	rotation;
	tweenCamera;
	isTweening = false;

	constructor(renderer) {
		this.mode2d = new Mode2D(renderer, this.aspect);
		this.mode3d = new Mode3D(renderer, this.aspect);

		this.mode2d.next = this.mode3d;
		this.mode3d.next = this.mode2d;

		this.viewMode = this.mode3d;

		this.position = this.viewMode.camera.position;
		this.rotation = this.viewMode.camera.rotation;

		this.tweenCamera = new TweenCamera();
	}

	updateCameraAspect(aspect) {
		this.aspect = aspect;
		this.tweenCamera.updateCameraAspect(aspect);
		this.viewMode.updateCameraAspect(this.aspect);
		this.viewMode.updateCamera();
	}

	switchMode() {
		this.viewMode.next.camera.position.copy(this.viewMode.camera.position);
		this.viewMode.next.controls.target.copy(this.viewMode.controls.target);

		this.tweenCamera.setupFromCameras(
			this.viewMode.camera,
			this.viewMode.next.camera,
		);
		this.tweenCamera.lookAt(this.viewMode.controls.target);
		this.isTweening = true;

		this.viewMode = this.viewMode.next;
		this.viewMode.updateCameraAspect(this.aspect);
		this.viewMode.updateCamera();
		this.viewMode.updateControls();

		setTimeout(() => {
			this.isTweening = false;
		}, this.tweenCamera.duration);
	}

	getCamera() {
		return this.isTweening ? this.tweenCamera.camera : this.viewMode.camera;
	}

	updateControls() {
		this.isTweening
			? this.tweenCamera.update()
			: this.viewMode.updateControls();
	}
}
