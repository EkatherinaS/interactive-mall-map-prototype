import * as THREE from "three";

export class PlaceView {
	view3D = new THREE.Group();

	constructor(id, geometry, material, position, label) {
		this.id = id;
		this.label = label;
		this.position = position;

		this.geometry = geometry;
		this.material = material;
		const mesh = new THREE.Mesh(this.geometry, this.material);

		this.view3D.add(mesh);
		this.view3D.add(this.label.view3D);
		this.view3D.position.copy(this.position);
	}

	setVisualStateStrategy(strategy) {}
}
