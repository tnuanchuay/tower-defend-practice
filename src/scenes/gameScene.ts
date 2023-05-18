import {Scene} from 'phaser';
import {HUD} from "../objects/hud";
import {Map} from '../maps/map';
import {Map1} from "../maps/map1";

export class GameScene extends Scene{
    private hud: HUD;
    private map: Map;

    constructor() {
        super('BattleScene');
    }

    preload = () => {
        this.load.spritesheet('terrain', 'assets/terrain.png', {frameWidth: 840, frameHeight: 600});
        this.load.spritesheet('available_slot', 'assets/available.png', {frameWidth: 60, frameHeight: 60});
        this.load.spritesheet('tower', 'assets/tower.png', {frameWidth: 60, frameHeight: 60});
        this.load.spritesheet('monster1', 'assets/monster1.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('arrow', 'assets/arrow.png', {frameWidth: 12, frameHeight: 5});
    }

    create = () => {
        this.hud = new HUD(this);
        this.map = new Map1(this);

        this.data.set("lives", 5);
        this.data.set("money", 300);
        this.data.set("kills", 0);
    }

    update = () => {
        this.hud.update();
        const lives = this.data.get('lives');
        if(lives <= 0){
            this.scene.start('GameOver');
        }
    }
}