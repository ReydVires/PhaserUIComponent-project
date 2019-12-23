/**
 * @author Ahmad Arsyel
 * @description TextField event component for UI.
 * @abstract
 */
export abstract class TextFieldComponent extends Phaser.GameObjects.Sprite {

	protected textFieldDOM: Phaser.GameObjects.DOMElement;

	/**
     * An abstract class TextFieldComponent of event component.
     * @param scene Phaser scene that will be reference.
     * @param x Gameobject position in axis-x.
     * @param y Gameobject position in axis-y.
     * @param texture Key texture to make this base text field rendered.
     * @param name Object name or type.
     */
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, name: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		this.setName(name);
	}

	/**
     * Initialize the DOM element on text field.
     * @param x Gameobject DOM position in axis-x.
     * @param y Gameobject DOM position in axis-y.
     * @param config Set some additional configuration that need to be filled.
     */
	protected abstract initializeElement(x: number, y: number, config: PhaserUIComponent.TextField.Config): void;

	/**
     * Set initialize style on CSS of TextField.
     * @param style The style property for TextField.
     * @return Get this TextField object.
     */
	public abstract setStyle(style: PhaserUIComponent.TextField.Style): this;

	/**
     * Reset TextField input value.
     * @return Get this TextField object.
     */
	public abstract resetValue(): this;

	/**
     * Get text value from TextField input.
     * @return Text value of TextField.
     */
	public abstract getValue(): string;

	/**
     * Get this activated element is selected.
     * @return Boolean of on focus.
     */
	public abstract onFocus(): boolean;

	/**
     * @override
     */
	public setPosition(x: number, y: number, z?: number, w?: number): this {
		super.setPosition(x, y, z, w);
		if (this.textFieldDOM) {
			this.textFieldDOM.setPosition(x, y, z, w);
		}
		return this;
	}

	/**
     * @override
     */
	public setX(value: number): this {
		super.setX(value);
		if (this.textFieldDOM) {
			this.textFieldDOM.x = value;
		}
		return this;
	}

	/**
     * @override
     */
	public setY(value: number): this {
		super.setY(value);
		if (this.textFieldDOM) {
			this.textFieldDOM.y = value;
		}
		return this;
	}

	/**
     * @override
     */
	public destroy(): any {
		this.textFieldDOM.destroy();
		super.destroy();
	}

	/**
     * @override
     */
	public setVisible(value: boolean): this {
		super.setVisible(value);
		this.textFieldDOM.setVisible(value);
		return this;
	}

}