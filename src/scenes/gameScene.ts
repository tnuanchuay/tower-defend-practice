import {Scene} from 'phaser';
import {availableSlot} from "./slot";
import {Slot} from "../objects/slot";
import {Waypoint} from "./waypoint";
import {Monster} from "../objects/monster";
import {AttackingObject} from "../objects/attackingObject";

export class GameScene extends Scene {
    private slots: Slot[] = [];
    private readonly waypoints: Waypoint[] = [
        {x: -32, y: 76},
        {x: 316, y: 76},
        {x: 316, y: 376},
        {x: 76, y: 376},
        {x: 76, y: 496},
        {x: 736, y: 496},
        {x: 736, y: 376},
        {x: 496, y: 376},
        {x: 496, y: 76},
        {x: 736, y: 76},
        {x: 840, y: 76},
    ]

    constructor() {
        super('BlankScene');
    }

    preload = () => {
        this.load.spritesheet('terrain', 'assets/terrain.png', {frameWidth: 840, frameHeight: 600});
        this.load.spritesheet('available_slot', 'assets/available.png', {frameWidth: 60, frameHeight: 60});
        this.load.spritesheet('tower', 'assets/tower.png', {frameWidth: 60, frameHeight: 60});
        this.load.spritesheet('monster1', 'assets/monster1.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('arrow', 'assets/arrow.png', {frameWidth: 12, frameHeight: 5});
    }

    create = () => {
        const terrain = this.add.sprite(0, 0, 'terrain');
        terrain.setOrigin(0, 0);

        this.slots = availableSlot.map(i => new Slot(this, i.x, i.y));
        this.slots.forEach(i => i.create());
        new Monster(this, this.waypoints);

        this.time.addEvent({
            delay: 500,
            callback: () => {
                new Monster(this, this.waypoints);
            },
            callbackScope: this,
            loop: true,
        });
    }

    update = () => {
        // this.slots.forEach(i => i.update());
        // this.attackingObjects.forEach(i => i.update());
    }
}