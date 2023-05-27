import {Scene} from "phaser";
import {SceneName} from "../constants/sceneName";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import UIPlugins from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import {TowerModels} from "../data/towers";
import {Slot} from "../objects/slot";
import {MiddleAgeTower} from "../objects/towers/middleAgeTower";

const COLOR_LIGHT = 0x999999;
const COLOR_SLIDER = 0x222222;
const COLOR_DARK = 0x000000;

export class BuyingTowerScene extends Scene {
    rexUI: RexUIPlugin;

    slot: Slot;

    constructor() {
        super(SceneName.BuyingTowerScene);
    }

    init = data => {
        this.slot = data.slot as Slot;
    }

    preload = () => {

    }

    create = () => {
        this.game.scene.pause(SceneName.BattleScene);
        const {width, height} = this.game.canvas;
        const scrollablePanel = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: height / 2,
            width: width * 0.7,
            height: height * 0.6,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_DARK),

            panel: {
                child: this.createGrid(),
                mask: {
                    padding: 1,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_SLIDER),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                text: this.add.text(0, 0, ['Construct a defend tower !']),
                align: 'center'
            }),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                header: 10,
                footer: 10,
            }
        })
            .layout();

        scrollablePanel
            .setChildrenInteractive({})
            .on('child.click', (child, pointer, event) => {
                this.slot.setTower(MiddleAgeTower);
                this.game.scene.resume(SceneName.BattleScene);
                this.scene.stop();
            });
    }

    createGrid = () => {
        // Create table body
        const sizer = this.rexUI.add.fixWidthSizer({
            space: {
                left: 3,
                right: 3,
                top: 3,
                bottom: 3,
                item: 8,
                line: 8,
            },
            align: 'center'
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK))

        TowerModels.map(model => {
            const text = [`$${model.cost}`, `ATK: ${model.attackDamage}`, `RANGE: ${model.attackRange}`, `SPEED: ${model.attackSpeed/1000}s`]
            return this.rexUI.add.label({
                width: 150, height: 150,

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
                text: this.add.text(0, 0, text, {
                    fontSize: 18
                }),

                align: 'center',
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            })
        })
            .forEach(label => sizer.add(label));

        return sizer;
    }

    createTowerLabel = (): UIPlugins.Label => {
        return this.rexUI.add.label({})
    }

    update = () => {

    }
}