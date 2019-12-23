import { TextFieldComponent } from "../TextFieldComponent";

/**
 * @author Ahmad Arsyel
 * @description TextFieldComponent TextField for interactable UI.
 */
export class TextField extends TextFieldComponent {

	private inputElement: HTMLInputElement;
	private id: string;

	constructor(scene: Phaser.Scene, x: number, y: number, config: PhaserUIComponent.TextField.Config) {
		super(scene, x, y, config.texture, 'TextField');
		this.initializeElement(x, y, config);
		this.id = config.id;
		this.registerBlur();
		return this;
	}

	/**
     * Register blur in input when the mouse up.
     * @param id Set blur input on this id.
     */
	private registerBlur(): void {
		this.scene.input
			.on('pointerdown', () => {
				this.inputElement.blur();
			})
			.on('pointerup', () => {
				this.inputElement.blur();
			});
	}
	
	/**
     * @override
     */
	protected initializeElement(x: number, y: number, config: PhaserUIComponent.TextField.Config): void {
		config = Object.assign({
			texture: '',
			placeholder: '',
			inputWidth: '10'
		}, config);

		this.inputElement = document.createElement('input');
		this.inputElement.setAttribute('id', config.id);
		this.inputElement.setAttribute('size', config.inputWidth);
		this.inputElement.setAttribute('placeholder', config.placeholder);
		this.textFieldDOM = this.scene.add
			.dom(x, y, this.inputElement)
			.setOrigin(0.5);
	}
	
	/**
     * @override
     */
	public setStyle(style: PhaserUIComponent.TextField.Style): this {
		style = Object.assign({
			padding: 6,
			bgColor: 'white',
			textAlign: 'left',
			textColor: 'black',
			height: '',
		}, style);
		this.textFieldDOM.setX(this.textFieldDOM.x - style.padding);

		const styleElement = document.createElement('style');
		styleElement.setAttribute('type', 'text/css');
		styleElement.innerHTML = `
			#${this.id} {
				padding: ${style.padding}px;
				box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.33);
				border: 1px solid #000;
				border-radius: 6px;
				text-align: ${style.textAlign};
				color: ${style.textColor};
				line-height: ${style.height}px;
				font-size: ${style.fontSize}px;
				background-color: ${style.bgColor};
			}`;

		document.getElementsByTagName('head')[0].appendChild(styleElement);

		return this;
	}

	/**
     * @override
     */
	public resetValue(): this {
		this.inputElement.value = "";
		return this;
	}

	/**
     * @override
     */
	public getValue(): string {
		return this.inputElement.value ? this.inputElement.value : "";
	}

	/**
     * @override
     */
	public onFocus(): boolean {
		return document.activeElement === this.inputElement;
	}
	
}