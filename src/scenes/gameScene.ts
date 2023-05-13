import {Scene} from 'phaser';
import {availableSlot} from "./slot";
import {Slot} from "../objects/slot";
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
import {Waypoint} from "./waypoint";

export class GameScene extends Scene {
    private slots: Slot[];
    private monster: SpriteWithDynamicBody;
    private currentWayPointIndex = 0;

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
    }

    create = () => {
        const {width, height} = this.game.canvas;
        const terrain = this.add.sprite(0, 0, 'terrain');
        terrain.setOrigin(0, 0);

        this.slots = availableSlot.map(i => new Slot(this, i.x, i.y));
        this.slots.forEach(i => i.create());
        this.monster = this.physics.add.sprite(this.waypoints[0].x, this.waypoints[0].y, 'monster1');
        this.monster.setOrigin(0, 0);
        this.moveToNextWaypoint();
    }

    update = () => {

    }

    moveToNextWaypoint = () => {
        this.currentWayPointIndex = this.currentWayPointIndex + 1;
        if(this.currentWayPointIndex >= this.waypoints.length){
            return
        }

        const distance = Phaser.Math.Distance.Between(this.monster.x, this.monster.y, this.waypoints[this.currentWayPointIndex].x, this.waypoints[this.currentWayPointIndex].y);
        const duration = distance / 0.2;
        this.tweens.add({
            targets: this.monster,
            x: this.waypoints[this.currentWayPointIndex].x,
            y: this.waypoints[this.currentWayPointIndex].y,
            duration: duration,
            onComplete: this.moveToNextWaypoint
        });
    }
}