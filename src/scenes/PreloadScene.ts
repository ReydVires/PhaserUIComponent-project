import { SCREEN_WIDTH, centerX, centerY } from "../config";

export class PreloadScene extends Phaser.Scene {

	private barWidth: number;
	private barHeight: number;
	private xStart: number;
	private yStart: number;
	private progressBar: Phaser.GameObjects.Graphics;

	constructor() {
		super('PreloadScene');
	}

	init(): void {
		console.log("PreloadScene");
	}

	preload(): void {
		this.createProgressbar(centerX, centerY, 12, 32);

		// All Assets & Audio: .pack(key, path, keyField)
		this.load.pack('assetsPack', 'assets/manifest.json', 'assetsPack');
		this.load.pack('imagePack', 'assets/manifest.json', 'imagePack');
	}
	
	create(): void {

	}

	private registerAnimate(jsonAnimate: any): void {
		for (const anim of jsonAnimate) {
			this.anims.create(anim as Phaser.Types.Animations.Animation);
		}
	}

	private createProgressbar(x: number, y: number, height: number = 10, barPadding: number = 16): void {
		this.createLoadingText(x, y, height, 'LOADING');

		// Size and position
		this.barWidth = SCREEN_WIDTH - barPadding;
		this.barHeight = height;
		this.xStart = x - this.barWidth / 2;
		this.yStart = y - this.barHeight / 2;

		// Border size
		const borderOffset = 2;

		const borderRect = new Phaser.Geom.Rectangle(
			this.xStart - borderOffset,
			this.yStart - borderOffset,
			this.barWidth + borderOffset * 2,
			this.barHeight + borderOffset * 2
		);

		const border = this.add.graphics({
			lineStyle: {
				width: 2,
				color: 0x636e72
			}
		});
		border.strokeRectShape(borderRect);

		// Create background bar
		const bgBar = this.add.graphics();
		bgBar.fillStyle(0xdfe6e9, 0.95);
		bgBar.fillRect(
			this.xStart - 1,
			this.yStart - 1,
			this.barWidth + borderOffset,
			this.barHeight + borderOffset
		);

		this.progressBar = this.add.graphics();

		// Event
		this.load.on('progress', this.updateProgressbar.bind(this));
		this.load.once('complete', () => {
			this.load.off('progress', this.updateProgressbar.bind(this));
			this.scene.start('MenuScene');
			this.progressBar.destroy();
		});
	}

	private createLoadingText(x: number, y: number, height: number, text: string): void {
		const loadingText = {
			x: x,
			y: y - (height + 8),
			text: "LOADING",
			style: {
				fill: 'black'
			}
		};
		this.make
			.text(loadingText)
			.setOrigin(0.5);
	}

	private updateProgressbar(percentage: number): void {
		this.progressBar.clear();
		this.progressBar.fillStyle(0x00cec9, 1);
		this.progressBar.fillRect(this.xStart, this.yStart, percentage * this.barWidth, this.barHeight);
	}

}