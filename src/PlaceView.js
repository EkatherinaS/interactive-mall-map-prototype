import * as THREE from "three";

export class PlaceView {
	view3D = new THREE.Group();

	constructor(id, geometry, material, position) {
		this.id = id;
		this.geometry = geometry;
		this.material = material;

		this.view3D = new THREE.Mesh(this.geometry, this.material);
		this.view3D.position.set(position.x, position.y, position.z);
	}

	setVisualStateStrategy(strategy) {}
}
