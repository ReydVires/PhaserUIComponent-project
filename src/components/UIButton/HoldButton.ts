import { ButtonComponent } from "../ButtonComponent";

/**
 * @author Ahmad Arsyel
 * @description ButtonComponent HoldButton for interactable UI.
 */
export class HoldButton extends ButtonComponent {

	private tap: boolean = false;
	private allowCallbackOnUp: boolean;
	
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, allowCallbackOnUp: boolean = false) {
		super(scene, x, y, texture, 'HoldButton');
		this.interactiveEvent();
		this.allowCallbackOnUp = allowCallbackOnUp;
		return this;
	}
	
	private onTap(): void {
		if (!this.tap) {
			this.tap = true;
			this.setAlpha(0.8);
		}
	}

	private onUp(): void {
		if (this.tap) {
			this.tap = false;
			this.setAlpha(1);
			if (this.allowCallbackOnUp) {
				this.callback(this.argument);
			}
		}
	}

	/**
     * @override
     */
	protected interactiveEvent(): void {
		this.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				this.pressed = true;
				this.onTap();
			})
			.on('pointerup', () => {
				this.pressed = false;
				this.onUp();
			})
			.on('pointerout', () => {
				this.pressed = false;
				this.onUp();
			});
	}
	
	/**
     * @override
     */
	protected onClick(): void {
		this.callback(this.argument);
	}

	/**
     * @override
     */
	protected preUpdate(time: number, delta: number): void {
		if (!this.deactive && this.pressed) {
			this.onClick();
		}
	}
	
}