import {Scene} from "phaser";
import {SceneName} from "../constants/sceneName";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import {TowerData, TowerModels} from "../game/towers";
import {Slot} from "../objects/slot";
import {Label, FixWidthSizer} from "phaser3-rex-plugins/templates/ui/ui-components";
import {DataKey} from "../constants/gameData";

const colorLabel = 0x999999;
const colorSlider = 0x222222;
const colorDark = 0x000000;

const keyTowerDataModel = "tower_model"

const configGrid: FixWidthSizer.IConfig = {
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
        this.load.spritesheet('towerBg', 'assets/towerBg.png', {frameWidth: 60, frameHeight: 60});
    }

    create = () => {
        this.game.scene.pause(SceneName.BattleScene);
        const {width, height} = this.game.canvas;
        this.add.rectangle(0, 0, width, height, 0x000000, 0)
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.resumeGame();
            });

        const scrollablePanel = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: height / 2,
            width: width * 0.7,
            height: height * 0.6,

            scrollMode: 0,

            background: this.add.rectangle(0, 0, 2, 2, colorDark).setInteractive(),

            panel: {
                child: this.createGrid(),
                mask: {
                    padding: 1,
                }
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, colorSlider),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, colorLabel),
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
            }).setInteractive(),

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
                const money = this.scene.get(SceneName.BattleScene).data.get(DataKey.Money);
                const label = child as Label;
                const data = label.data.get(keyTowerDataModel) as TowerData;

                if (money < data.cost) {
                    return;
                }

                this.slot.setTower(data);
                this.scene.get(SceneName.BattleScene).data.inc(DataKey.Money, data.cost * -1);
                this.resumeGame();
            });
    }

    createGrid = () => {
        const sizer = this.rexUI.add.fixWidthSizer(configGrid)
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, colorDark));

        TowerModels
            .map(model =>
                this.rexUI.add.label(this.getTowerLabelConfig(model))
                    .setData(keyTowerDataModel, model)
            )
            .forEach(label => sizer.add(label));

        return sizer;
    }

    getTowerLabelConfig = (model: TowerData): Label.IConfig => {
        const container = this.add.container()
            .add(this.add.image(0, -30, model.sprite).setOrigin(0.5, 0.5))
            .add(this.add.text(0, 30, [`$${model.cost}`, `ATK: ${model.attackDamage}`, `RANGE: ${model.attackRange}`, `SPEED: ${model.attackSpeed / 1000}s`], {
                fontSize: 18,
                align: 'center'
            }).setOrigin(0.5, 0.5));

        return {
            width: 150,
            height: 150,

            background: this.add.image(0, 0, 'towerBg').setScale(1.2, 1.2),
            text: container,

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