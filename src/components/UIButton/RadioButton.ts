import { ButtonComponent } from "../ButtonComponent";

type TexturesType = 'ON' | 'OFF';
/**
 * @author Ahmad Arsyel
 * @description ButtonComponent HoldButton for interactable UI.
 */
export class RadioButton extends ButtonComponent {

	private isToggleActive: boolean = false;
	private textures: Record<TexturesType, string>;

	constructor(scene: Phaser.Scene, x: number, y: number, isActive: boolean, texture: string, responseTexture: string) {
		super(scene, x, y, texture, 'RadioButton');
		this.isToggleActive = isActive;
		this.interactiveEvent();
		if (isActive) {
			this.textures = {
				ON: texture,
				OFF: responseTexture
			};
		}
		else {
			this.textures = {
				ON: responseTexture,
				OFF: texture
			};
		}
		return this;
	}

	/**
	 * 
	 */
	private toggleAction(): void {
		this.isToggleActive = !this.isToggleActive;
		const texture = this.isToggleActive ? this.textures.ON : this.textures.OFF;
		this.setTexture(texture);
	}

	/**
	 * @override
	 */
	protected interactiveEvent(): void {
		this.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => { this.pressed = true; })
			.on('pointerup', () => {
				if (this.pressed) {
					this.onClick();
				}
			})
			.on('pointerout', () => {
				if (this.pressed) {
					this.onClick();
				}
				else {
					this.pressed = false;
				}
			});
	}

	/**
	 * @override
	 */
	protected onClick(): void {
		this.toggleAction();
		this.callback(this.isToggleActive, this.argument);
		this.pressed = false;
	}

}