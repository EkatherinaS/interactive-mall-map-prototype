import * as THREE from "three";

export class Floor {
	placeViews = [];
	view3D = new THREE.Group();
	width = 0;
	depth = 0;

	addPlace(placeView) {
		this.placeViews.push(placeView);
		this.view3D.add(placeView.view3D);
		this.view3D.position.set(-this.width / 2, 0, -this.depth / 2);
	}
}
