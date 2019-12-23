import { Helper } from "../utils/Helper";

export class GameScene extends Phaser.Scene {

	constructor() {
		super('GameScene');
	}

	create(): void {
		console.log("GameScene");
		Helper.drawDebugLines(this.add.graphics());
	}

	update(time: number, delta: number): void {
		const spaceTap = this.input.keyboard.addKey('SPACE');
		if (Phaser.Input.Keyboard.JustDown(spaceTap)) {
			console.log('Space!');
		}
	}
	
}