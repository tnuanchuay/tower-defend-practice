import * as Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;

export class DamageLabel extends GameObject {
    private readonly text: Text;

    constructor(scene: Scene, damage: number, x: number, y: number) {
        super(scene, 'damageLabel');

        this.text = this.scene.add.text(x, y, `${damage}`);
        this.text.setOrigin(0.5, 0.5);

        this.scene.tweens.add({
            targets: this.text,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.text.destroy(true);
                this.destroy(true);
            },
        });
    }
}