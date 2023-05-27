import {Scene} from 'phaser';
import {HUD} from "../objects/hud";
import {Map} from '../game/models/map';
import {Map1} from "../maps/map1";
import {SceneName} from "../constants/sceneName";
import {DataKey} from "../constants/gameData";

export class GameScene extends Scene {
    private hud: HUD;
    private map: Map;

    constructor() {
        super(SceneName.BattleScene);
    }

    preload = () => {
        this.load
            .spritesheet('terrain', 'assets/terrain.png', {frameWidth: 840, frameHeight: 600})
            .spritesheet('available_slot', 'assets/available.png', {frameWidth: 60, frameHeight: 60})

            .spritesheet('tower', 'assets/tower.png', {frameWidth: 60, frameHeight: 60})
            .spritesheet('ancient_tower', 'assets/ancient_tower.png', {frameWidth: 60, frameHeight: 60})


            .spritesheet('arrow', 'assets/arrow.png', {frameWidth: 12, frameHeight: 5})
            .spritesheet('rock', 'assets/rock.png', {frameWidth: 5, frameHeight: 5})

            .spritesheet('monster1', 'assets/monster1.png', {frameWidth: 32, frameHeight: 32})
    }

    create = () => {
        this.hud = new HUD(this);
        this.map = new Map1(this);

        this.data
            .set(DataKey.Live, 5)
            .set(DataKey.Money, 400)
            .set(DataKey.Kill, 0)
            .set(DataKey.Wave, 1)
    }

    update = () => {
        this.hud.update();
        const lives = this.data.get(DataKey.Live);
        if (lives <= 0) {
            this.scene.start(SceneName.GameOverScene);
        }
    }
}