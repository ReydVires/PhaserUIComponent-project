import { ButtonComponent } from "./ButtonComponent";
import { Button } from "./UIButton/Button";
import { FlatButton } from "./UIButton/FlatButton";
import { VirtualControlComponent } from "./VirtualControlComponent";
import { VirtualJoystick } from "./UIVirtual/VirtualJoystick";
import { TextFieldComponent } from "./TextFieldComponent";
import { TextField } from "./UITextField/TextField";
import { HoldButton } from "./UIButton/HoldButton";
import { RadioButton } from "./UIButton/RadioButton";
import { VirtualArrow } from "./UIVirtual/VirtualArrow";

/**
 * @author Ahmad Arsyel
 * @description
 * Implementation of PhaserUIComponent with Factory design pattern
 * with Singleton pattern.
 */
export class PhaserUIComponent {

	private static instance: PhaserUIComponent;

	private constructor() {}

	/**
     * Get a single instance of PhaserUIComponent.
     */
	static get create(): PhaserUIComponent {
		if (!PhaserUIComponent.instance) {
			PhaserUIComponent.instance = new PhaserUIComponent();
		}
		return PhaserUIComponent.instance;
	}
	
	/**
     * Button component implementation.
     * @param {Phaser.Scene} scene Scene that will be reference for this component.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {PhaserUIComponent.Button.Config} config Button component configuration.
     * @return Object of ButtonComponent.
     */
	Button(scene: Phaser.Scene, x: number, y: number, config: PhaserUIComponent.Button.Config): ButtonComponent {
		const {
			type,
			texture,
			label,
			callback,
			arg,
			style,
			callbackOnUp,
			onToggleTexture,
			isToggleActive,
			spritesheetTexture
		} = config;
		let btn = null;
		switch (type) {
			case 'Radio':
				btn = new RadioButton(scene, x, y, isToggleActive, texture, onToggleTexture);
				break;
			case 'Hold':
				btn = new HoldButton(scene, x, y, texture, callbackOnUp);
				break;
			case 'Button':
				btn = new Button(scene, x, y, spritesheetTexture)
					.setLabel(label, style);
				break;
			case 'Flat':
			default:
				btn = new FlatButton(scene, x, y, texture);
				break;
		}
		btn.setCallback(callback, arg);
		return btn;
	}
	
	/**
     * VirtualJoystick component implementation.
     * @param {Phaser.Scene} scene Scene that will be reference for this component.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {PhaserUIComponent.Virtual.Control.ObjectConfig} config VirtualJoystick component configuration.
     * @return Object of VirtualControlComponent.
     */
	VirtualControl(scene: Phaser.Scene, x: number, y: number, config: PhaserUIComponent.Virtual.Control.ObjectConfig): VirtualControlComponent {
		const {
			type,
			spritesheetTexture,
			callback,
			argument,
			width,
			height,
			arrowConfig
		} = config;
		let virtualControl = null;
		switch (type) {
			case 'Arrow':
			case 'DPAD':
				virtualControl = new VirtualArrow(scene, x, y, spritesheetTexture, width, height, arrowConfig)
					.setControlled(config.controlled);
				if (callback) {
					virtualControl.setCallback(callback, argument);
				}
				break;
			case 'Joystick':
			default:
				virtualControl = new VirtualJoystick(scene, x, y, config);
				if (spritesheetTexture) {
					virtualControl.setSpritesheetTexture(spritesheetTexture);
				}
				break;
		}
		return virtualControl;
	}

	/**
     * TextField component implementation.
     * @param {Phaser.Scene} scene Scene that will be reference for this component.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {PhaserUIComponent.TextField.Config} config TextField component configuration.
     * @param {PhaserUIComponent.TextField.Style} style TextField styling properties.
     * @return Object of TextFieldComponent.
     */
	TextField(scene: Phaser.Scene, x: number, y: number, config: PhaserUIComponent.TextField.Config, style?: PhaserUIComponent.TextField.Style): TextFieldComponent {
		const { type } = config;
		let textField = null;
		switch (type) {
			case 'Flat':
			default:
				textField = new TextField(scene, x, y, config)
					.setStyle(style);
				break;
		}
		return textField;
	}
	
}