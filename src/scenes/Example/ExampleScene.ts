import { PhaserUIComponent } from "../../components/PhaserUIComponent";

export class ExampleScene extends Phaser.Scene {

	constructor() {
		super('ExampleScene');
	}

	init(): void {
		console.log('ExampleScene is active!');
	}

	create(): void {
		const btnConfig = <PhaserUIComponent.Button.Config> {
			type: 'Button',
			spritesheetTexture: 'btn_ui',
			callback: () => console.log("Hello!")
		};
		const playButton = PhaserUIComponent.create.Button(this, 180, 320, btnConfig);
	}

	update(time: number, delta: number): void {

	}

}
