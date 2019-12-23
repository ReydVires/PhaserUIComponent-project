import * as Phaser from 'phaser';
import { Config } from './config';
import { Helper } from './utils/Helper';

const TARGET_BUILD = 'android';
declare const AndroidFullScreen: any;

export class Game extends Phaser.Game {

	constructor(gameConfig: Phaser.Types.Core.GameConfig) {
		super(gameConfig);
		console.log("Game is running");
	}

}

function onDeviceReady(platform?: string): void {
	switch (platform) {
		case 'android':
			const win = window as any;
			keepAwakeAndroid(win);
			fullScreenAndroid();
			break;
		case 'ios':
			break;
		default:
			break;
	}
	new Game(Config);
}

function keepAwakeAndroid(win: any): void {
	win.plugins.insomnia.keepAwake();
}

function fullScreenAndroid(): void {
	if (typeof AndroidFullScreen !== 'undefined' ) {
		AndroidFullScreen.isSupported(AndroidFullScreen.immersiveMode, (err: any) => {
			alert(err);
		});
	}
}

window.addEventListener("load", () => {
	const onPlatform = Helper.isOnPlatform(TARGET_BUILD);
	if (onPlatform) {
		document.addEventListener('deviceready', onDeviceReady.bind(this, TARGET_BUILD));
	}
	else {
		onDeviceReady();
	}
});
