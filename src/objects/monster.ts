import {Physics, Scene} from "phaser";
import {Waypoint} from "../scenes/waypoint";
import Tween = Phaser.Tweens.Tween;

export class Monster extends Physics.Arcade.Sprite {
    private readonly waypoints: Waypoint[];
    private currentWayPointIndex: number;
    private latestTween: Tween;

    constructor(scene: Scene, waypoints: Waypoint[]) {
        const {x, y} = waypoints[0];
        super(scene, x + (60*0.25), y + (60*0.25), 'monster1');
        this.waypoints = waypoints;
        this.currentWayPointIndex = 0;
        this.setData("type", "monster");
        this.addToUpdateList();

        this.setTexture('monster1');
        this.scene.physics.add.existing(this, false);
        this.scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.moveToNextWaypoint();
        this.on('destroy', () => {
            this.latestTween.stop();
        });
    }

    moveToNextWaypoint = () => {
        this.currentWayPointIndex = this.currentWayPointIndex + 1;

        if(this.currentWayPointIndex >= this.waypoints.length){
            this.scene.data.inc("lives", -1);
            this.destroy(true);
            return
        }

        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.waypoints[this.currentWayPointIndex].x, this.waypoints[this.currentWayPointIndex].y);
        const duration = distance / 0.1;
        this.latestTween = this.scene.tweens.add({
            targets: this,
            x: this.waypoints[this.currentWayPointIndex].x + (60 * 0.25),
            y: this.waypoints[this.currentWayPointIndex].y + (60 * 0.25),
            duration: duration,
            onComplete: this.moveToNextWaypoint,
        });
    }
}