import {Scene} from "phaser";
import {SceneName} from "../constants/sceneName";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import {TowerData, TowerModels} from "../game/towers";
import {Slot} from "../objects/slot";
import {Label, FixWidthSizer} from "phaser3-rex-plugins/templates/ui/ui-components";
import {DataKey} from "../constants/gameData";

const ColorLabel = 0x999999;
const ColorSlider = 0x222222;
const ColorDark = 0x000000;

const KeyTowerDataModel = "tower_model"

const ConfigGrid: FixWidthSizer.IConfig = {
    space: {
        left: 3,
        right: 3,
        top: 3,
        bottom: 3,
        item: 8,
        line: 8,
    },
    align: 'center'
}

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
        this.add.rectangle(0, 0, width, height, 0x000000, 0.1)
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerup', () => {
                this.resumeGame();
            });

        const scrollablePanel = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: height / 2,
            width: width * 0.7,
            height: height * 0.6,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, ColorDark),

            panel: {
                child: this.createGrid(),
                mask: {
                    padding: 1,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, ColorSlider),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, ColorLabel),
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
                const label = child as Label;
                const data = label.data.get(KeyTowerDataModel) as TowerData;
                this.slot.setTower(data);
                this.scene.get(SceneName.BattleScene).data.inc(DataKey.Money, data.cost * -1);
                this.resumeGame();
            });
    }

    createGrid = () => {
        // Create table body
        const sizer = this.rexUI.add.fixWidthSizer(ConfigGrid)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, ColorDark));

        TowerModels
            .map(model =>
                this.rexUI.add.label(this.towerLabelConfig(model))
                    .setData(KeyTowerDataModel, model)
            )
            .forEach(label => sizer.add(label));

        return sizer;
    }

    towerLabelConfig = (model: TowerData): Label.IConfig => {
        return {
            width: 150,
            height: 150,

            background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, ColorLabel),
            text: this.add.text(0, 0, [`$${model.cost}`, `ATK: ${model.attackDamage}`, `RANGE: ${model.attackRange}`, `SPEED: ${model.attackSpeed / 1000}s`], {
                fontSize: 18
            }),

            align: 'center',
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
            },
        }
    }

    resumeGame = () => {
        this.game.scene.resume(SceneName.BattleScene);
        this.scene.stop();
    }

    update = () => {

    }
}