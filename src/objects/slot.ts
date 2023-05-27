import {Scene} from 'phaser';
import {BaseTower} from "./towers/baseTower";
import {MiddleAgeTower} from "./towers/middleAgeTower";
import {Data} from "../constants/gameData";
import {SceneName} from "../constants/sceneName";
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.GameObjects.Sprite;

export class Slot extends GameObject {
    private tower: BaseTower;
    private sprite: Sprite;
    private x: number;
    private y: number;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, "Slot");
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(x, y, 'available_slot');
        this.sprite.setOrigin(0, 0);
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => {
            const money = this.scene.data.get(Data.Money);
            if (money < 300 || this.tower) {
                return;
            }

            this.scene.scene.launch(SceneName.BuyingTowerScene, {slot: this});

            this.tower = new MiddleAgeTower(this.scene, x, y);
            this.scene.data.inc(Data.Money, -300);
        });
    }

    setTower = <T extends BaseTower>(c: { new(Scene, x: number, y: number): T }) => {
        this.tower = new c(this.scene, this.x, this.y);
    }
}
