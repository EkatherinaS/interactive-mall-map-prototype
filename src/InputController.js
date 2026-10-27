export class InputController {
	constructor(viewModeController, interactionController) {
		this.viewModeController = viewModeController;
		this.interactionController = interactionController;

		document.addEventListener("keydown", (event) => this.onSpaceDown(event));
		document.addEventListener("pointermove", (event) =>
			this.onPointerMove(event),
		);
		document.addEventListener("pointerdown", (event) =>
			this.onPointerDown(event),
		);
	}

	onSpaceDown(event) {
		if (event.code == "Space") {
			this.viewModeController.switchMode();
		}
	}

	onPointerDown(event) {
		this.interactionController.handleClick();
	}

	onPointerMove(event) {
		const pointerX = (event.clientX / window.innerWidth) * 2 - 1;
		const pointerY = -(event.clientY / window.innerHeight) * 2 + 1;
		this.interactionController.setPointerCoordinates(pointerX, pointerY);
	}
}
