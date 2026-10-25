import * as THREE from "three";
import { PlaceView } from "./PlaceView";
import { LineStrategy } from "./ArrangeStrategy";
import { Floor } from "./Floor";

export class FloorGenerator {
	#arrangeStrategy = new LineStrategy();
	#labelFactory;

	generate(places) {
		const floor = new Floor();
		const positions = this.#arrangeStrategy.arrange(places);

		for (const place of places) {
			const position = positions.get(place.id);

			const geometry = new THREE.BoxGeometry(place.width, 2, place.depth);
			const material = new THREE.MeshBasicMaterial();
			material.color.setRGB(place.color.r, place.color.g, place.color.b);

			const placeView = new PlaceView(place.id, geometry, material, position);
			floor.width = Math.max(floor.width, position.x + place.width);
			floor.depth = Math.max(floor.depth, position.z + place.depth);
			floor.addPlace(placeView);
		}
		return floor;
	}

	setLabelFactory(labelFactory) {
		this.#labelFactory = labelFactory;
	}

	setArrangeStrategy(arrangeStrategy) {
		this.#arrangeStrategy = arrangeStrategy;
	}
}
