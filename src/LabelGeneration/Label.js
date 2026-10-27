import { Text } from "troika-three-text";
import SpriteText from "three-spritetext";

export class Label {
	text = "";

	constructor(text) {
		this.text = this.partitionText(text);
	}

	setPosition(x, y, z) {}

	partitionText(text, maxLen = 10) {
		const words = text.split(" ");

		const lines = [];
		let line = "";

		for (const word of words) {
			if (line == "" || line.length + word.length + 1 < maxLen) {
				line = line + " " + word;
			} else {
				lines.push(line);
				line = word;
			}
		}

		if (line != "") lines.push(line);
		return lines.join("\n");
	}
}

export class LabelTroika extends Label {
	constructor(text) {
		super(text);

		this.view3D = new Text();
		this.view3D.text = this.text;
		this.view3D.fontSize = 2;
		this.view3D.color = "rgb(92, 49, 31)";
		this.view3D.rotation.x = -Math.PI / 2;
		this.view3D.anchorX = "center";
		this.view3D.anchorY = "middle";
		this.view3D.fontWeight = 600;
		this.view3D.raycast = () => null;
		this.view3D.sync();
	}

	setPosition(x, y, z) {
		this.view3D.position.set(x, y, z);
		this.view3D.sync();
	}
}

export class LabelSprite extends Label {
	constructor(text) {
		super(text);

		this.view3D = new SpriteText(this.text);
		this.view3D.textHeight = 2;
		this.view3D.color = "rgb(92, 49, 31)";
		this.view3D.fontFace = "Georgia";
		this.view3D.raycast = () => null;
	}

	setPosition(x, y, z) {
		const lineCount = this.text.split("\n").length;
		this.view3D.position.set(x, y + lineCount, z);
	}
}
