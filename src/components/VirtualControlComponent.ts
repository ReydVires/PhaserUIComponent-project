/**
 * @author Ahmad Arsyel
 * @description VirtualControl event component for UI.
 * @abstract
 */
export abstract class VirtualControlComponent extends Phaser.GameObjects.Sprite {

	protected controlSpeed: number;
	protected originalPos: Phaser.Geom.Point;

	/**
     * An abstract class VirtualControlComponent of event component.
     * @param {Phaser.Scene} scene Phaser scene that will be reference.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {string} texture Key texture to make this base Virtual Control rendered.
     * @param {string} name Object name or type.
     */
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, name: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		this.setName(name);
		this.setOriginalPos(x, y);
	}

	/**
     * Set object to be interactive with input and draggable.
     */
	protected abstract interactiveControl(): void;

	/**
	 * Specific method for call whether active or deactivate the current control.
	 * @param {boolean} active Set enable or disable interaction this virtual control.
	 * @return This Virtual Control component instance.
	 */
	public abstract enableControl(active?: boolean): this;

	/**
     * Set object to be controlled with Virtual Control.
     * @param {any} controlledObject An object, need have position or coordinat properties.
	 * @param {boolean} isPhysics Control the object with body.
     * @return This Virtual Control component instance.
     */
	public abstract setControlled(controlledObject: any, isPhysics?: boolean): this;

	/**
     * Set position of Virtual Control component.
     * @param x Set x-axis Virtual Control original position.
     * @param y Set y-axis Virtual Control original position.
     * @return This Virtual Control instance.
     */
	public setOriginalPos(x: number, y: number): this {
		this.originalPos = new Phaser.Geom.Point(x ,y);
		return this;
	}

	/**
	 * Set the speed of controlled object.
	 * @param value The value of relative speed to object.
	 * @return This Virtual Control instance.
	 */
	public setControlSpeed(value: number): this {
		this.controlSpeed = value;
		return this;
	}

}