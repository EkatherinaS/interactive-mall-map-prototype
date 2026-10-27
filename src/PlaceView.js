import * as THREE from "three";
import { DefaultStrategy } from "./VisualState/VisualStateStrategy";

export class PlaceView {
	view3D = new THREE.Group();
	#defaultVisualStateStrategy = new DefaultStrategy();

	constructor(place, position, label, height) {
		this.place = place;
		this.label = label;

		const geometry = new THREE.BoxGeometry(place.width, height, place.depth);
		const material = new THREE.MeshBasicMaterial();
		material.color.setHSL(place.color.h, place.color.s, place.color.l);

		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.userData.placeView = this;

		const edges = new THREE.EdgesGeometry(geometry);
		const lineMaterial = new THREE.LineBasicMaterial({
			color: 0xffa11f,
		});

		this.outlineMesh = new THREE.LineSegments(edges, lineMaterial);
		this.outlineMesh.visible = false;

		this.view3D.add(this.mesh);
		this.view3D.add(this.outlineMesh);
		this.view3D.add(this.label.view3D);
		this.view3D.position.copy(position);

		this.visualStateStrategy = this.#defaultVisualStateStrategy;
	}

	setVisualStateStrategy(strategy) {
		this.visualStateStrategy = strategy;
		this.visualStateStrategy.apply(this);
	}

	resetStrategy() {
		this.visualStateStrategy = this.#defaultVisualStateStrategy;
		this.visualStateStrategy.apply(this);
	}
}
