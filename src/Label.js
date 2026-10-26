import { Text } from "troika-three-text";
import SpriteText from "three-spritetext";

export class Label {}

export class LabelTroika extends Label {
	constructor(text) {
		super();

		this.view3D = new Text();
		this.view3D.text = text;
		this.view3D.fontSize = 2;
		this.view3D.color = "rgb(92, 49, 31)";
		this.view3D.rotation.x = -Math.PI / 2;
		this.view3D.anchorX = "center";
		this.view3D.anchorY = "middle";
		this.view3D.fontWeight = 600;
		this.view3D.sync();
	}

	setPosition(x, y, z) {
		this.view3D.position.set(x, y, z);
		this.view3D.sync();
	}
}

export class LabelSprite extends Label {
	constructor(text) {
		super();

		this.view3D = new SpriteText(text);
		this.view3D.textHeight = 2;
		this.view3D.color = "rgb(92, 49, 31)";
		this.view3D.fontFace = "Georgia";
	}

	setPosition(x, y, z) {
		this.view3D.position.set(x, y + 1, z);
	}
}
