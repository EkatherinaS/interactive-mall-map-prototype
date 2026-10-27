import { Place } from "./Place";

export class DataGenerator {
	minWidth = 2;
	minDepth = 2;
	maxWidth = 10;
	maxDepth = 10;

	generate(n = 0) {
		const placesData = [];

		for (let i = 0; i < n; i++) {
			const id = "id" + i;
			const name = "shop" + i;
			const width =
				this.minWidth + Math.random() * (this.maxWidth - this.minWidth);
			const depth =
				this.minDepth + Math.random() * (this.maxDepth - this.minDepth);
			const color = { r: Math.random(), g: Math.random(), b: Math.random() };
			placesData.push(new Place(id, name, width, depth, color));
		}

		return placesData;
	}
}
