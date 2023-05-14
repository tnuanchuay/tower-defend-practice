import {Physics, Scene} from 'phaser';
import {Monster} from "./monster";
import {AttackingObject} from "./attackingObject";
import TimerEvent = Phaser.Time.TimerEvent;
import GameObject = Phaser.GameObjects.GameObject;

export interface ISlot {
    IsAvailable: () => boolean;
}

export enum Building {
    None,
    Tower,
}

export class Slot extends Physics.Arcade.Sprite implements ISlot {
    private building: Building;
    private attackTimer: TimerEvent;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'available_slot');
        this.building = Building.None;
        this.setOrigin(0, 0);
        this.setData("type", "slot");
    }

    IsAvailable(): boolean {
        return this.building == Building.None;
    }

    create = () => {
        this.setTexture('available_slot');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setInteractive();
        this.on('pointerdown', () => {
            this.setTexture('tower');
            this.building = Building.Tower;
            this.scene.add.circle(this.x + (60 * 0.5), this.y + (60 * 0.5), 150, 0xff0000, 0.1);

            this.attackTimer = this.scene.time.addEvent({
                startAt: 0,
                delay: 1000,  // 1 second cooldown
                callback: this.attack,
                callbackScope: this,
                loop: true
            });
        });
    }

    attack = () => {
        const objectInRange = this.scene.physics.overlapCirc(this.x, this.y, 150, true, false) as Physics.Arcade.Body[];
        for(let i = 0; i < objectInRange.length; i++) {
            const t = objectInRange[i].gameObject.getData("type") || "";
            if (t === "monster") {
                new AttackingObject(this.scene, 'arrow', this, objectInRange[i]);
                return
            }
        }
    }
}
