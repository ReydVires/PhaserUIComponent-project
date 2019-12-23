export class BootScene extends Phaser.Scene {

	constructor() {
		super('BootScene');
	}

	init(): void {
		console.log("BootScene");
	}

	create(): void {
		this.scene.start('PreloadScene');
	}

}