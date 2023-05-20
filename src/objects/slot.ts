import {Scene} from 'phaser';
import {Tower} from "./towers/Tower";
import GameObject = Phaser.GameObjects.GameObject;
import {MiddleAgeTower} from "./towers/MiddleAgeTower";
import Sprite = Phaser.GameObjects.Sprite;

export class Slot extends GameObject {
    private tower: Tower;
    private sprite: Sprite;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, "Slot");
        this.sprite = scene.add.sprite(x, y, 'available_slot');
        this.sprite.setOrigin(0, 0);
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => {
            const money = this.scene.data.get("money");
            if (money < 300) {
                return;
            }

            this.tower = new MiddleAgeTower(this.scene, x, y);
            this.sprite.destroy(true);
            this.scene.data.inc('money', -300);
        });
    }
}
