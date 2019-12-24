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
			callback: () => console.log("Test Button")
		};
		const button = PhaserUIComponent.create.Button(this, 180, 300, btnConfig);

		const flatButton = PhaserUIComponent.create.Button(this, 180, 380, {
			texture: 'btn_flat',
			callback: () => console.log("Test FlatButton")
		});

		const holdButton = PhaserUIComponent.create.Button(this, 180, 220, {
			type: 'Hold',
			texture: 'btn_flat',
			callback: () => console.log("Test HoldButton"),
			callbackOnUp: true
		});

		const radioButton = PhaserUIComponent.create.Button(this, 180, 140, {
			type: 'Radio',
			texture: 'btn_flat',
			onToggleTexture: 'btn_flat_on',
			isToggleActive: false,
			callback: (isOn: boolean) => console.log("Test RadioButton", isOn)
		});

		const joystickConfig = <PhaserUIComponent.Virtual.Control.ObjectConfig> {
			type: 'Joystick',
			spritesheetTexture: 'vj',
			controlled: null
		};
		const joystick = PhaserUIComponent.create.VirtualControl(this, 90, 520, joystickConfig);

		const arowConfig = <PhaserUIComponent.Virtual.Control.ArrowConfig> {
			down: false,
		};
		const dpadConfig = <PhaserUIComponent.Virtual.Control.ObjectConfig> {
			type: 'DPAD',
			spritesheetTexture: 'btn_arrow',
			arrowConfig: arowConfig,
			width: 72,
			height: 72
		};
		const dpad = PhaserUIComponent.create.VirtualControl(this, 255, 535, dpadConfig);

		const tfConfig = <PhaserUIComponent.TextField.Config> {
			id: 'name',
			placeholder: 'Input Name',
		};
		this.textField = PhaserUIComponent.create.TextField(this, 180, 16, tfConfig);
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
