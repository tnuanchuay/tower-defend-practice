import {Physics, Scene} from 'phaser';

export interface ISlot {
    IsAvailable: () => boolean;
}

export enum Building {
    None,
    Tower,
}

export class Slot extends Physics.Arcade.Sprite implements ISlot {
    private building: Building;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'available_slot');
        this.building = Building.None;
        this.setOrigin(0, 0);
    }

    IsAvailable(): boolean {
        return this.building == Building.None;
    }

    create = () => {
        this.setTexture('available_slot');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', () => {
            this.setTexture('tower');
        })
    }

    update = () => {

    }
}
