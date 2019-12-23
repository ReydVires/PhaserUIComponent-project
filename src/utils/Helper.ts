export const MessageType = {
	WARN: 'warn',
	ERROR: 'error',
	NONE: 'none'
};

export class Helper {

	static exitApp(): void {
		const nav = navigator as any;
		if (nav.app) {
			nav.app.exitApp();
		}
		else if (nav.device) {
			nav.device.exitApp();
		}
		else {
			window.close();
		}
	}

	static log(messageType: string, message: string): void {
		switch (messageType) {
			case MessageType.WARN:
				console.warn(message);
				break;
			case MessageType.ERROR:
				console.error(message);
				break;
			default:
				console.log(message);
				break;
		}
	}

	static isOnPlatform(platformId: string): boolean {
		const win = window as any;
		if (win.cordova) {
			const currentPlatform = win.cordova.platformId;
			return currentPlatform === platformId;
		}
		return false;
	}

	static drawDebugLines(graphics: Phaser.GameObjects.Graphics, dimension: number = 32): void {
		const HEIGHT = Math.round(window.innerHeight / dimension);
		const WIDTH = Math.round(window.innerWidth / dimension);
		graphics.lineStyle(1, 0xecf0f1, 0.95);
		for (let i = 0; i < HEIGHT; i++) {
			graphics.moveTo(0, i * dimension);
			graphics.lineTo(window.innerWidth, i * dimension);
			for (let j = 0; j < WIDTH; j++) {
				graphics.moveTo(j * dimension, 0);
				graphics.lineTo(j * dimension, window.innerHeight);
			}
		}
		graphics.strokePath();
	}

}