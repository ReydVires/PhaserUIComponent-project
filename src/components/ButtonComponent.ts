/**
 * @author Ahmad Arsyel
 * @description Button event component for UI.
 * @abstract
 */
export abstract class ButtonComponent extends Phaser.GameObjects.Sprite {

	private _isDeactive: boolean = false;
	protected pressed: boolean = false;
	protected argument: any;
	protected callback: Function;

	/**
     * An abstract class ButtonComponent of event component.
     * @param {Phaser.Scene} scene Phaser scene that will be reference.
     * @param {number} x Gameobject position in axis-x.
     * @param {number} y Gameobject position in axis-y.
     * @param {string} texture Key for rendered texture in scene.
     * @param {string} name Object name or type.
     */
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, name: string) {
		super(scene, x, y, texture);
		scene.add.existing(this);
		this.setName(name);
	}

	/**
     * Trigger when an object interact with input.
     */
	protected abstract interactiveEvent(): void;

	/**
     * Interact when button is clicked.
     */
	protected abstract onClick(): void;

	/**
     * Check if the callback is function.
     * @return Boolean value of callback-function comparison.
     */
	protected isAnyCallback(): boolean {
		return (typeof this.callback === 'function');
	}

	/**
     * Set the callback event for button.
     * @param {Function} callback Event that fire after clicked.
     * @param {any} arg Parameter or argument to be passed.
     * @return This button component instance.
     */
	public setCallback(callback: Function, arg?: any): this {
		this.callback = (typeof callback !== 'function') ? () => { console.log('Clicked button'); } : callback;
		this.argument = arg;
		return this;
	}

	/**
     * Get event interactive status.
     */
	public get deactive(): boolean {
		return this._isDeactive;
	}

	/**
     * Set interactive mode to deactive.
     * @param {boolean} value The value of active or deactive event.
     */
	public set deactive(value: boolean) {
		if (value) {
			this.disableInteractive();
			this._isDeactive = true;
		}
		else if (value !== this._isDeactive) {
			this.interactiveEvent();
			this._isDeactive = false;
		}
	}

	/**
	 * Get a status of this pressed button.
	 * @return Boolean pressed value.
	 */
	public get isPressed(): boolean {
		return this.pressed;
	}

}