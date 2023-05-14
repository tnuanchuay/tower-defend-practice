import { Types, Game } from 'phaser';
import {GameScene} from "./scenes/gameScene";
import {GameOver} from "./scenes/gameOver";

export const config: Types.Core.GameConfig = {
    width: 840,
    height: 630,
    title: 'content',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    scene: [new GameScene(), new GameOver()]
};

export class MyGame extends Game {
    constructor() {
        super(config);
    }
}