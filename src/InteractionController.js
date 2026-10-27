import * as THREE from "three";
import { HoveredStrategy, SelectedStrategy } from "./VisualStateStrategy";

export class InteractionController {
	#selectedStrategy = new SelectedStrategy();
	#hoveredStrategy = new HoveredStrategy();
	#placeViewHovered = null;
	#placeViewSelected = null;

	constructor(objects, viewModeController) {
		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();
		this.objects = objects;
		this.viewModeController = viewModeController;
	}

	setPointerCoordinates(x, y) {
		this.pointer.x = x;
		this.pointer.y = y;
	}

	#getIntersection() {
		const camera = this.viewModeController.getCamera();
		this.raycaster.setFromCamera(this.pointer, camera);
		const intersects = this.raycaster.intersectObjects(this.objects, false);
		if (intersects.length > 0) {
			return intersects[0].object;
		}
		return null;
	}

	handleClick() {
		const intersected = this.#getIntersection();

		if (intersected && intersected.userData.placeView) {
			const placeView = intersected.userData.placeView;

			if (this.#placeViewSelected && placeView != this.#placeViewSelected) {
				this.#placeViewSelected.resetStrategy();
			}

			console.log(
				"SELECTED:",
				intersected.userData.placeView.place.id,
				intersected.userData.placeView.place.name,
				intersected.userData.placeView.view3D.position,
			);

			this.#placeViewHovered = null;
			this.#placeViewSelected = placeView;
			this.#placeViewSelected.setVisualStateStrategy(this.#selectedStrategy);
		}
	}

	updateHover() {
		const intersected = this.#getIntersection();

		if (intersected && intersected.userData.placeView) {
			const placeView = intersected.userData.placeView;

			if (
				placeView != this.#placeViewSelected &&
				placeView != this.#placeViewHovered
			) {
				if (
					this.#placeViewHovered &&
					this.#placeViewHovered != this.#placeViewSelected
				) {
					this.#placeViewHovered.resetStrategy();
				}

				this.#placeViewHovered = placeView;
				this.#placeViewHovered.setVisualStateStrategy(this.#hoveredStrategy);
			}
		}
	}
}
