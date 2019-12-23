import { VirtualControlComponent } from "../VirtualControlComponent";

/**
 * @author Ahmad Arsyel
 * @description VirtualControlComponent VirtualJoystick for interactable UI.
 */
export class VirtualJoystick extends VirtualControlComponent {

	private touchStart: boolean = false;
	private threshold: number = 45;
	private controller: Phaser.GameObjects.Sprite;
	private controlled: any;
	private currentPointer: Phaser.Geom.Point;
	private direction: Phaser.Geom.Point;
	private touchConfig: any;
	private selected: boolean = false;
	private isPhysics: boolean;

	constructor(scene: Phaser.Scene, x: number, y: number, config: PhaserUIComponent.Virtual.Control.ObjectConfig) {
		super(scene, x, y, config.container, "VirtualJoystick");
		this.controller = scene.add.sprite(x, y, config.texture);
		this.controlled = config.controlled;
		this.isPhysics = config.isPhysics || false;
		this.controlSpeed = 200;
		this.touchConfig = {
			useHandCursor: true,
			draggable: true
		};
		this.interactiveControl();
		return this;
	}

	/**
     * Object to simulate control movement with VirtualJoystick.
     * @param {number} delta Delta time value is get from preUpdate.
     */
	private simulateObjectToControl(delta: number): void {
		if (this.controlled) {
			if (this.isPhysics) {
				this.controlled.body.setVelocityX(this.direction.x * this.controlSpeed);
				this.controlled.body.setVelocityY(this.direction.y * this.controlSpeed);
			}
			else {
				const dt = delta / 1000;
				this.controlled.x += this.direction.x * (this.controlSpeed * dt);
				this.controlled.y += this.direction.y * (this.controlSpeed * dt);
			}
		}
	}

	/**
     * Stop controlled object physics movement.
     */
	private stopControlSimulate(): void {
		if (this.controlled && this.isPhysics) {
			this.controlled.body.setVelocity(0);
		}
	}
	
	/**
     * @override
     */
	protected interactiveControl(): void {
		this.controller.setInteractive(this.touchConfig)
		.on('pointerdown', () => { this.selected = true; })
		.on('pointerout', () => { this.selected = false; });

		this.scene.input.on('dragstart', (pointer: MouseEvent) => {
			this.touchStart = true;
			this.currentPointer = new Phaser.Geom.Point(pointer.x, pointer.y);
		})
		.on('drag', (pointer: MouseEvent) => {
			if (this.selected) {
				this.currentPointer = new Phaser.Geom.Point(pointer.x, pointer.y);
			}
		})
		.on('dragend', () => {
			this.touchStart = false;
			this.stopControlSimulate();
			this.controller.setPosition(this.originalPos.x, this.originalPos.y);
		});
	}

	/**
     * @override 
     */
	protected preUpdate(time: number, delta: number): void {
		if (this.touchStart && this.selected) {
			let deltaPos = {
				x: this.currentPointer.x - this.originalPos.x,
				y: this.currentPointer.y - this.originalPos.y
			} as Phaser.Geom.Point;

			this.direction = new Phaser.Geom.Point(deltaPos.x, deltaPos.y);
			Phaser.Geom.Point.SetMagnitude(this.direction, 1); // Normalized

			const magnitude = Phaser.Geom.Point.GetMagnitude(deltaPos);
			if (magnitude > this.threshold) {
				Phaser.Geom.Point.SetMagnitude(deltaPos, this.threshold);
			}

			deltaPos = {
				x: deltaPos.x + this.originalPos.x,
				y: deltaPos.y + this.originalPos.y
			} as Phaser.Geom.Point;

			this.controller.setPosition(deltaPos.x, deltaPos.y);
			this.simulateObjectToControl(delta);
		}
	}

	/**
	 * @override
	 */
	public enableControl(active: boolean = true): this {
		if (active) {
			this.controller.setInteractive();
		}
		else {
			this.controller.disableInteractive();
		}
		return this;
	}

	/**
     * @override
     */
	public setControlled(controlledObject: any, isPhysics: boolean = false): this {
		this.isPhysics = isPhysics;
		this.controlled = controlledObject;
		return this;
	}

	/**
     * @override
     */
	public setOriginalPos(x: number, y: number): this {
		this.setPosition(x, y);
		if (this.controller) {
			this.controller.setPosition(x, y);
		}
		return super.setOriginalPos(x, y);
	}

	/**
     * Set the sprite from spritesheet- zero for controller, one for base -in Virtual Joystick.
     * @param {string} key Key texture for Virtual Joystick.
     * @return This Virtual Joystick instance.
     */
	public setSpritesheetTexture(key: string): this {
		super.setTexture(key);
		if (this.texture.frameTotal > 2) {
			this.setFrame(1);
			this.controller.setTexture(key, 0);
			this.scene.input.setHitArea(this.controller, this.touchConfig);
		}
		return this;
	}
	
}