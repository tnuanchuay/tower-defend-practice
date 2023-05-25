import {Scene} from 'phaser';
import {HUD} from "../objects/hud";
import {Map} from '../maps/map';
import {Map1} from "../maps/map1";
import {SceneName} from "../constants/sceneName";
import {Data} from "../constants/gameData";

export class GameScene extends Scene{
    private hud: HUD;
    private map: Map;

    constructor() {
        super(SceneName.BattleScene);
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

        this.data.set(Data.Live, 5);
        this.data.set(Data.Money, 400);
        this.data.set(Data.Kill, 0);
        this.data.set(Data.Wave, 1);
    }

    update = () => {
        this.hud.update();
        const lives = this.data.get(Data.Live);
        if(lives <= 0){
            this.scene.start(SceneName.GameOverScene);
        }
    }
}