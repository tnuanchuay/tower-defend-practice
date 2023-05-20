import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;

export class BuyingTowerScene extends Scene {
    constructor() {
        super("BuyingTowerScene");
    }

    preload = () => {

    }

    create = () => {
        const {width, height} = this.game.canvas;
        this.game.scene.pause('BattleScene');
        const rec = this.add.rectangle(width/2, (height-30)/2, width-100, height-130, 0x000000, 0.8);
        rec.setOrigin(0.5, 0.5);
    }

    update = () => {

    }
}