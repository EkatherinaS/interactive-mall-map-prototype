import { LabelSprite, LabelTroika } from "./Label";

export class LabelFactory {
	up = 0;

	getLabel() {}
	moveUp(value) {}
}

export class LabelTroikaFactory extends LabelFactory {
	getLabel(text) {
		const label = new LabelTroika(text);
		label.setPosition(0, this.up, 0);
		return label;
	}

	moveUp(value) {
		this.up = value;
	}
}

export class LabelSpriteFactory extends LabelFactory {
	getLabel(text) {
		const label = new LabelSprite(text);
		label.setPosition(0, this.up, 0);
		return label;
	}

	moveUp(value) {
		this.up = value;
	}
}
