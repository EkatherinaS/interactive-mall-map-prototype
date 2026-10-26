export class InputController {
	constructor(viewModeController) {
		this.viewModeController = viewModeController;

		document.addEventListener("keydown", (event) => {
			if (event.code == "Space") {
				this.viewModeController.switchMode();
			}
		});
	}
}
