import {Scene} from 'phaser';
import {BaseTower} from "./baseTower";
import {Data} from "../constants/gameData";
import {SceneName} from "../constants/sceneName";
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.GameObjects.Sprite;
import {TowerData} from "../game/towers";

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
            this.scene.data.inc(Data.Money, -300);
        });
    }

    setTower = (data: TowerData) => {
        this.tower = new BaseTower(this.scene, data.type, data.sprite, this.x, this.y, data.attackRange, data.attackDamage, data.attackSpeed);
    }
}
