import { Helper } from "../utils/Helper";
import { centerX, centerY } from "../config";

export class GameScene extends Phaser.Scene {

	constructor() {
		super('GameScene');
	}

	create(): void {
		console.log("GameScene");
		Helper.drawDebugLines(this.add.graphics());
		this.add.text(centerX, centerY, "Game Scene", {
			color: 'black'
		})
		.setOrigin(0.5);
	}

	update(time: number, delta: number): void {
		const spaceTap = this.input.keyboard.addKey('SPACE');
		if (Phaser.Input.Keyboard.JustDown(spaceTap)) {
			console.log('Space!');
			this.scene.start('ExampleScene');
		}
	}
	
}