import {Physics, Scene} from "phaser";
import {Monster} from "./monster";
import {DamageLabel} from "./damageLabel";
import {BaseTower} from "./baseTower";

export class AttackingObject extends Physics.Arcade.Sprite {
    private readonly monster: Monster;
    private readonly tower: BaseTower;
    private readonly damage: number;

    constructor(scene: Scene, texture: string, tower: BaseTower, monster: Phaser.Physics.Arcade.Body, damage: number) {
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
            new DamageLabel(this.scene, this.damage, this.x, this.y);
            this.destroy(true);
            return
        }

        const angle = Phaser.Math.Angle.Between(this.x, this.y, this.monster.x, this.monster.y);
        this.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
        this.setRotation(angle);
    }
}