import * as Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import {Scene} from "phaser";

export class DamageLabel extends GameObject {
    constructor(scene: Scene, damage: number, x: number, y: number) {
        super(scene, 'damageLabel');
        const text = this.scene.add.text(x, y, `${damage}`);
        text.setOrigin(0.5, 0.5);
        this.scene.tweens.add({
            targets: text,
            alpha: 0,
            duration: 500,
            destroy: 500,
            onComplete: () => {
                this.destroy(true);
            }
        });
    }
}