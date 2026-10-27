import { TweenCamera } from "./TweenCamera";
import { Mode2D, Mode3D } from "./ViewMode";

export class ViewModeController {
	#aspect = 1;
	#tweenCamera;
	#isTweening = false;

	constructor(renderer) {
		const mode2d = new Mode2D(renderer, this.#aspect);
		const mode3d = new Mode3D(renderer, this.#aspect);

		mode2d.next = mode3d;
		mode3d.next = mode2d;
		this.viewMode = mode3d;

		this.#tweenCamera = new TweenCamera();
	}

	updateCameraAspect(aspect) {
		this.#aspect = aspect;
		this.#tweenCamera.updateCameraAspect(aspect);
		this.viewMode.updateCameraAspect(this.#aspect);
		this.viewMode.updateCamera();
	}

	switchMode() {
		this.viewMode.next.camera.position.copy(this.viewMode.camera.position);
		this.viewMode.next.controls.target.copy(this.viewMode.controls.target);

		this.#tweenCamera.setupFromCameras(
			this.viewMode.camera,
			this.viewMode.next.camera,
		);
		this.#tweenCamera.lookAt(this.viewMode.controls.target);
		this.#isTweening = true;

		this.viewMode = this.viewMode.next;
		this.viewMode.updateCameraAspect(this.#aspect);
		this.viewMode.updateCamera();
		this.viewMode.updateControls();

		setTimeout(() => {
			this.#isTweening = false;
		}, this.#tweenCamera.duration);
	}

	getCamera() {
		return this.#isTweening ? this.#tweenCamera.camera : this.viewMode.camera;
	}

	updateControls() {
		this.#isTweening
			? this.#tweenCamera.update()
			: this.viewMode.updateControls();
	}
}
