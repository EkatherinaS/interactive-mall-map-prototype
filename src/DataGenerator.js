import { Place } from "./Place";

export class DataGenerator {
	maxWidth = 10;
	maxDepth = 10;

	generate(n = 0) {
		const placesData = [];

		for (let i = 0; i < n; i++) {
			const id = "id" + i;
			const name = "shop" + i;
			const width = Math.random() * this.maxWidth;
			const depth = Math.random() * this.maxDepth;
			const color = { r: Math.random(), g: Math.random(), b: Math.random() };
			placesData.push(new Place(id, name, width, depth, color));
		}

		return placesData;
	}
}
