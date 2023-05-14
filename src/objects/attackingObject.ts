import {Physics, Scene} from "phaser";
import {Monster} from "./monster";
import Tween = Phaser.Tweens.Tween;
import {Slot} from "./slot";
import GameObject = Phaser.GameObjects.GameObject;

export class AttackingObject extends Physics.Arcade.Sprite {
    private readonly monster: Phaser.Physics.Arcade.Body;
    private readonly tower: Slot;

    constructor(scene: Scene, texture: string, tower: Slot, monster: Phaser.Physics.Arcade.Body) {
        const {x, y} = tower;
        super(scene, x, y, texture);

        this.monster = monster;
        this.tower = tower;
        this.setData("type", "attackingObject");

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.addToUpdateList();
    }

    override preUpdate = (time, delta) => {
        super.preUpdate(time, delta);

        if (this.scene.physics.overlap(this, this.monster.gameObject)){
            this.monster.gameObject.destroy(true);
            this.destroy(true);
            return
        }

        if(!this.monster.gameObject.active) {
            this.destroy(true);
            return
        }

        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.monster.x, this.monster.y);
        this.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
        this.setRotation(angle);
    }
}