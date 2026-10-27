class VisualStateStrategy {
	hoverAddColor = 0.5;
}

export class DefaultStrategy extends VisualStateStrategy {
	apply(placeView) {
		placeView.outlineMesh.visible = false;
		placeView.mesh.material.color.addScalar(-this.hoverAddColor);
	}
}

export class HoveredStrategy extends VisualStateStrategy {
	apply(placeView) {
		placeView.mesh.material.color.addScalar(this.hoverAddColor);
	}
}

export class SelectedStrategy extends VisualStateStrategy {
	apply(placeView) {
		placeView.outlineMesh.visible = true;
	}
}
