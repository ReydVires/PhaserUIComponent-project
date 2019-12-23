import { ButtonComponent } from "../ButtonComponent";

/**
 * @author Ahmad Arsyel
 * @description ButtonComponent Button for interactable UI.
 */
export class Button extends ButtonComponent {

	private label: Phaser.GameObjects.Text;
	private labelOffsetY: number = 5;

	constructor(scene: Phaser.Scene, x: number, y: number, texture?: string, label?: string) {
		super(scene, x, y, texture, 'Button');
		this.interactiveEvent();
		if (label) {
			this.setLabel(label);
		}
		return this;
	}

	/**
     * Behavior of pointerdown and set frame.
     */
	private onDown(): void {
		if (this.texture.frameTotal > 2) {
			this.setFrame(1);
		}
		if (this.label) {
			this.label.y += this.labelOffsetY;
		}
	}

	/**
     * Behavior of pointerup or pointerout and reset frame.
     */
	private onUp(): void {
		this.setFrame(0);
		if (this.label) {
			const resetLabelY = this.y - this.labelOffsetY;
			if (this.label.y !== resetLabelY) {
				this.label.y = resetLabelY;
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
			this.onDown();
		})
		.on('pointerup', () => {
			if (this.pressed) {
				this.onClick();
			}
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
		this.scene.time.addEvent({
			delay: 25,
			callback: () => {
				if (this.isAnyCallback()) {
					this.callback(this.argument);
				}
			}
		});
	}

	/**
     * Set text label for button.
     * @param {string} text Text for button.
     * @return This button instance.
     */
	public setLabel(text: string, style?: Phaser.Types.GameObjects.Text.TextStyle): this {
		style = Object.assign({
			color: 'black',
			fontSize: '28px'
		}, style);
		
		this.label = this.scene.add.text(this.x, this.y - this.labelOffsetY, text, style)
			.setOrigin(0.5);
		return this;
	}

}