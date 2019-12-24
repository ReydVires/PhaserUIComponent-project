import { PhaserUIComponent } from "../../components/PhaserUIComponent";
import { TextFieldComponent } from "../../components/TextFieldComponent";

export class ExampleScene extends Phaser.Scene {

	textField: TextFieldComponent;

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

		const joystickConfig = <PhaserUIComponent.Virtual.Control.ObjectConfig> {
			type: 'Joystick',
			spritesheetTexture: 'vj',
			controlled: null
		};
		const joystick = PhaserUIComponent.create.VirtualControl(this, 180, 520, joystickConfig);

		const tfConfig = <PhaserUIComponent.TextField.Config> {
			id: 'name',
			placeholder: 'Input Name',
		};
		this.textField = PhaserUIComponent.create.TextField(this, 180, 160, tfConfig);
	}

	update(time: number, delta: number): void {
		if (this.textField.onFocus()) {
			this.input.keyboard.disableGlobalCapture();
		}
		const enterKey = this.input.keyboard.addKey('ENTER');
		if (Phaser.Input.Keyboard.JustDown(enterKey) && this.textField.onFocus()) {
			if (this.textField.getValue().length > 0) {
				console.log(this.textField.getValue());
				this.textField.resetValue();
			}
		}
	}

}
