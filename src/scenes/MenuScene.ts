export class MenuScene extends Phaser.Scene {

	constructor() {
		super('MenuScene');
	}

	create(): void {
		console.log("MenuScene");
		this.scene.start('GameScene');
	}

}