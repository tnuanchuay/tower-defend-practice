import { Types, Game } from 'phaser';
import {GameScene} from "./scenes/gameScene";

export const config: Types.Core.GameConfig = {
    width: 840,
    height: 600,
    title: 'content',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scene: [new GameScene()]
};

export class MyGame extends Game {
    constructor() {
        super(config);
    }
}