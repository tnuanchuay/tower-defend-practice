import {Scene} from "phaser";
import {SceneName} from "../constants/sceneName";

export class GameOver extends Scene {
    constructor() {
        super(SceneName.GameOverScene);
    }

    preload = () => {

    }

    create = () => {
        const {width, height} = this.game.canvas;
        this.add.text(width / 2, height / 2, 'Game Over', { fontSize: '48px' }).setOrigin(0.5);

        this.input.keyboard.on('keydown', function () {
            this.scene.start(SceneName.BattleScene);
        }, this);
    }
}