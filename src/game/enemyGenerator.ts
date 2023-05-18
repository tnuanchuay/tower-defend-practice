import {Wave} from "./wave";
import {Scene} from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import {Monster} from "../objects/monster";
import TimerEvent = Phaser.Time.TimerEvent;
import {Waypoint} from "./waypoint";

export class EnemyGenerator extends GameObject{
    private waves: Wave[]
    private waypoints: Waypoint[];
    private currentWave: number = 0;
    private currentSection: number = 0;
    currentTimeEvent: TimerEvent;

    constructor(scene: Scene, waves: Wave[], waypoints: Waypoint[]) {
        super(scene, 'enemyGenerator');
        this.waves = waves;
        this.waypoints = waypoints;
        this.addToUpdateList();
        this.createEnemies();
    }

    preUpdate = () => {
        if (this.currentTimeEvent.getOverallRemaining() != 0){
            return;
        }

        const enemies = this.scene.children.getChildren().filter(item => item instanceof Monster);

        if((this.currentWave === this.waves.length - 1) && this.currentSection === this.waves[this.currentWave].enemies.length - 1 && enemies.length === 0) {
            this.scene.scene.start('GameOver');
            return;
        }

        if(this.currentSection === this.waves[this.currentWave].enemies.length - 1 && enemies.length === 0) {
            this.nextLevel();
            return;
        }

        if(this.currentSection < this.waves[this.currentWave].enemies.length - 1){
            this.nextSection();
        }
    }

    nextSection = () => {
        this.currentSection = this.currentSection + 1;
        this.createEnemies();
    }

    nextLevel = () => {
        this.currentTimeEvent = this.scene.time.addEvent({
            delay: 5000,
            callback: () => {
                this.currentWave = this.currentWave + 1;
                this.currentSection = 0;
                this.createEnemies();
            },
            repeat: 0,
            loop: false,
        });
    }

    createEnemies = () => {
        console.log(this.currentWave, this.currentSection, this.waves[this.currentWave].enemies[this.currentSection].spawnInterval);
        this.currentTimeEvent = this.scene.time.addEvent({
            startAt: 0,
            delay: this.waves[this.currentWave].enemies[this.currentSection].spawnInterval,
            callback: () => {
                new Monster(this.scene, this.waypoints);
            },
            callbackScope: this,
            repeat: this.waves[this.currentWave].enemies[this.currentSection].quantity - 1,
        });
    }
}