import * as THREE from "three";
import { Tween, Easing, Group } from "@tweenjs/tween.js";

export class TweenCamera {
	constructor() {
		this.camera = new THREE.PerspectiveCamera();
		this.duration = 1000;
	}

	#rad(value) {
		return value * (Math.PI / 180);
	}

	#deg(value) {
		return value * (180 / Math.PI);
	}

	lookAt(target) {
		this.target = target;
		this.camera.lookAt(target);
		this.camera.updateProjectionMatrix();
	}

	updateCameraAspect(aspect) {
		this.camera.aspect = aspect;
	}

	setupFromCameras(cameraFrom, cameraTo) {
		if (cameraFrom.isOrthographicCamera && cameraTo.isPerspectiveCamera) {
			this.fromOrthographicToPerspective(cameraFrom, cameraTo);
		} else if (
			cameraFrom.isPerspectiveCamera &&
			cameraTo.isOrthographicCamera
		) {
			this.fromPerspectiveToOrthographic(cameraFrom, cameraTo);
		} else {
			throw new Error("Camera combination is not supported.");
		}
	}

	fromOrthographicToPerspective(cameraFrom, cameraTo) {
		const viewHeightFrom =
			(cameraFrom.top - cameraFrom.bottom) / cameraFrom.zoom;
		const viewHeightTo =
			Math.sin(this.#rad(cameraTo.fov / 2)) * cameraTo.position.y * 2;
		this.viewHeight = { value: viewHeightFrom };

		const maxY = this.camera.far;
		const minFov = this.#rad(Math.asin(this.viewHeight / (2 * maxY))) * 2;

		this.camera.fov = minFov;
		this.camera.position.set(
			cameraFrom.position.x,
			maxY,
			cameraFrom.position.z,
		);
		this.camera.rotation.copy(cameraFrom.rotation);
		const positionTo = cameraTo.position;

		const tweenPosition = new Tween(this.camera.position)
			.to(positionTo, this.duration)
			.easing(Easing.Sinusoidal.Out)
			.start();
		const tweenViewHeight = new Tween(this.viewHeight)
			.to({ value: viewHeightTo }, this.duration)
			.easing(Easing.Sinusoidal.In)
			.start();

		this.tween = new Group();
		this.tween.add(tweenPosition);
		this.tween.add(tweenViewHeight);
	}

	fromPerspectiveToOrthographic(cameraFrom, cameraTo) {
		const viewHeightTo = (cameraTo.top - cameraTo.bottom) / cameraTo.zoom;
		const viewHeightFrom =
			Math.sin(this.#rad(cameraFrom.fov / 2)) * cameraFrom.position.y * 2;

		this.viewHeight = { value: viewHeightFrom };

		const maxY = this.camera.far;

		this.camera.fov = cameraFrom.fov;
		this.camera.position.copy(cameraFrom.position);
		this.camera.rotation.copy(cameraFrom.rotation);
		const positionTo = new THREE.Vector3(
			cameraTo.position.x,
			maxY,
			cameraTo.position.z,
		);

		const tweenPosition = new Tween(this.camera.position)
			.to(positionTo, this.duration)
			.easing(Easing.Sinusoidal.In)
			.start();
		const tweenViewHeight = new Tween(this.viewHeight)
			.to({ value: viewHeightTo }, this.duration)
			.easing(Easing.Sinusoidal.In)
			.start();

		this.tween = new Group();
		this.tween.add(tweenPosition);
		this.tween.add(tweenViewHeight);
	}

	update() {
		this.tween.update();

		const posY = this.camera.position.y;
		const vh = this.viewHeight.value;

		this.camera.fov = this.#deg(Math.asin(vh / (2 * posY))) * 2;
		this.camera.lookAt(this.target);
		this.camera.updateProjectionMatrix();
	}
}
