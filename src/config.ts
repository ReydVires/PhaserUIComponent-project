import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';

export const SCREEN_WIDTH: number = 360;
export const SCREEN_HEIGHT: number = 640;
export const centerX: number = SCREEN_WIDTH / 2;
export const centerY: number = SCREEN_HEIGHT / 2;

export const Config: Phaser.Types.Core.GameConfig = {
	title: 'GameSample',
	version: '0.1.0',
	type: Phaser.AUTO,
	parent: 'phaser-game',
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
	dom: {
		createContainer: true
	},
	scene: [
		BootScene,
		PreloadScene,
		MenuScene,
		GameScene,
	],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
	backgroundColor: '#fafafa',
	render: {
		antialias: false,
		pixelArt: false,
	},
};
