import {BaseTower} from "./baseTower";
import {Scene} from "phaser";

export class MiddleAgeTower extends BaseTower {
    constructor(scene: Scene, x: number, y: number) {
        super(scene, "MiddleAgeTower", 'tower', x, y, 150, 10, 1000);
    }
}