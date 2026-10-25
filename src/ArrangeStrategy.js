export class ArrangeStrategy {
	arrange(places) {
		const positions = new Map();
		for (const place of places) {
			positions.set(place.id, { x: 0, y: 0, z: 0 });
		}
		return positions;
	}
}

export class LineStrategy {
	stride = 1;

	arrange(places) {
		let posX = 0;
		const positions = new Map();
		for (const place of places) {
			posX += place.width / 2;
			positions.set(place.id, { x: posX, y: 0, z: 0 });
			posX += place.width / 2 + this.stride;
		}
		return positions;
	}
}

export class GridStrategy {
	stride = 1;

	arrange(places) {
		const length = places.length;
		const gridWidth = Math.ceil(Math.sqrt(length));
		const gridDepth = Math.ceil(length / gridWidth);

		let cellWidth = 0;
		let cellDepth = 0;

		for (const place of places) {
			cellWidth = Math.max(place.width, cellWidth);
			cellDepth = Math.max(place.depth, cellDepth);
		}

		cellWidth += this.stride;
		cellDepth += this.stride;

		const positions = new Map();
		for (let i = 0; i < gridDepth; i++) {
			for (let j = 0; j < gridWidth; j++) {
				const ind = i * gridWidth + j;
				if (ind >= length) break;
				const posX = j * cellWidth + cellWidth / 2;
				const posZ = i * cellDepth + cellDepth / 2;
				positions.set(places[ind].id, { x: posX, y: 0, z: posZ });
			}
		}

		return positions;
	}
}
