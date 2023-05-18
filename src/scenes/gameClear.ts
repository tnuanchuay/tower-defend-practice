import {Scene} from "phaser";

export class GameClear extends Scene {
    constructor() {
        super('GameClear');
    }

    preload = () => {

    }

    create = () => {
        const {width, height} = this.game.canvas;
        this.add.text(width / 2, height / 2, 'Game Clear !', { fontSize: '48px' }).setOrigin(0.5);

        this.input.keyboard.on('keydown', function () {
            this.scene.start('BattleScene');
        }, this);
    }
}