import { LabelSprite, LabelTroika } from "./Label";

export class LabelFactory {
	posY = 0;

	getLabel() {}
	moveY(value) {}
}

export class LabelTroikaFactory extends LabelFactory {
	getLabel(text) {
		const label = new LabelTroika(text);
		label.setPosition(0, this.posY, 0);
		return label;
	}

	moveY(value) {
		this.posY = value;
	}
}

export class LabelSpriteFactory extends LabelFactory {
	getLabel(text) {
		const label = new LabelSprite(text);
		label.setPosition(0, this.posY, 0);
		return label;
	}

	moveY(value) {
		this.posY = value;
	}
}
