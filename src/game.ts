import {Types, Game} from 'phaser';
import {GameScene} from "./scenes/gameScene";
import {GameOver} from "./scenes/gameOver";
import {GameClear} from "./scenes/gameClear";
import {BuyingTowerScene} from "./scenes/buyTower";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

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
    plugins: {
        scene: [
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ]
    },
    scene: [new GameScene(), new GameOver(), new GameClear(), new BuyingTowerScene()]
};

export class MyGame extends Game {
    constructor() {
        super(config);
        this.scale.setZoom(1.5);
    }
}