import {Physics, Scene} from "phaser";
import {Slot} from "./slot";
import {Monster} from "./monster";

export class AttackingObject extends Physics.Arcade.Sprite {
    private readonly monster: Monster;
    private readonly tower: Slot;
    private readonly damage: number;

    constructor(scene: Scene, texture: string, tower: Slot, monster: Phaser.Physics.Arcade.Body, damage: number) {
        const {x, y} = tower;
        super(scene, x, y, texture);

        this.monster = (monster.gameObject as Monster);
        this.tower = tower;
        this.damage = damage;

        this.setData("type", "attackingObject");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.addToUpdateList();
    }

    override preUpdate = () => {

        if(this.monster == undefined|| !this.monster.active) {
            this.destroy(true);
            return
        }

        if (this.scene.physics.overlap(this, this.monster)){
            this.monster.getDamage(this.damage);
            this.destroy(true);
            return
        }

        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.monster.x, this.monster.y);
        this.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
        this.setRotation(angle);
    }
}