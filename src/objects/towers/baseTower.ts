import {Physics, Scene} from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import {AttackingObject} from "../attackingObject";
import Sprite = Phaser.GameObjects.Sprite;
import {Slot} from "../slot";

export abstract class BaseTower extends GameObject {
    private readonly radius: number;
    private readonly damage: number;
    private readonly texture: string;

    public readonly x: number;
    public readonly y: number;

    private sprite: Sprite;

    protected constructor(scene: Scene, type: string, texture: string, x: number, y: number, radius: number, damage: number, attackSpeed:number) {
        super(scene, type);

        this.radius = radius;
        this.damage = damage;
        this.texture = texture;

        this.sprite = this.scene.add.sprite(x, y, texture);
        this.sprite.setOrigin(0, 0);
        this.x = x;
        this.y = y;

        this.scene.time.addEvent({
            startAt: 0,
            delay: attackSpeed,
            callback: this.attack,
            callbackScope: this,
            loop: true
        });
    }

    attack = () => {
        const objectInRange = this.scene.physics.overlapCirc(this.sprite.x, this.sprite.y, this.radius, true, false) as Physics.Arcade.Body[];
        for (let i = 0; i < objectInRange.length; i++) {
            const t = objectInRange[i].gameObject.getData("type") || "";
            if (t === "monster") {
                new AttackingObject(this.scene, 'arrow', this, objectInRange[i], this.damage);
                return
            }
        }
    }
}