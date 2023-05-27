import {Scene} from 'phaser';
import {BaseTower} from "./baseTower";
import {DataKey} from "../constants/gameData";
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
        this.sprite = scene.add.sprite(x, y, 'available_slot')
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.tower) {
                    return;
                }

                this.scene.scene.launch(SceneName.BuyingTowerScene, {slot: this});
            });
    }

    setTower = (data: TowerData) => {
        this.tower = new BaseTower(this.scene, data.type, data.sprite, this.x, this.y, data.attackRange, data.attackDamage, data.attackSpeed);
    }
}
