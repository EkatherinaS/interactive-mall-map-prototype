import * as THREE from "three";
import { PlaceView } from "./PlaceView";
import { LineStrategy } from "./ArrangeStrategy";
import { Floor } from "./Floor";
import { LabelTroikaFactory } from "./LabelFactory";

export class FloorGenerator {
	#arrangeStrategy;
	#labelFactory;
	#height;

	constructor() {
		this.#height = 2;
		this.#arrangeStrategy = new LineStrategy();
		this.#labelFactory = new LabelTroikaFactory();
		this.#labelFactory.moveY(this.#height / 2 + 0.1);
	}

	generate(places) {
		const floor = new Floor();
		const positions = this.#arrangeStrategy.arrange(places);

		for (const place of places) {
			const position = positions.get(place.id);
			const label = this.#labelFactory.getLabel(place.name);

			const geometry = new THREE.BoxGeometry(
				place.width,
				this.#height,
				place.depth,
			);
			const material = new THREE.MeshBasicMaterial();
			material.color.setRGB(place.color.r, place.color.g, place.color.b);

			const placeView = new PlaceView(
				place.id,
				geometry,
				material,
				position,
				label,
			);

			floor.width = Math.max(floor.width, position.x + place.width);
			floor.depth = Math.max(floor.depth, position.z + place.depth);
			floor.addPlace(placeView);
		}
		return floor;
	}

	setLabelFactory(labelFactory) {
		this.#labelFactory = labelFactory;
		this.#labelFactory.moveY(this.#height / 2 + 0.1);
	}

	setArrangeStrategy(arrangeStrategy) {
		this.#arrangeStrategy = arrangeStrategy;
	}

	setHeight(height) {
		this.#height = height;
	}
}
