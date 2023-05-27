import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;
import {SceneName} from "../constants/sceneName";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

const COLOR_PRIMARY = 0x000000;
const COLOR_LIGHT = 0x999999;
const COLOR_DARK = 0x000000;

export class BuyingTowerScene extends Scene {
    rexUI: RexUIPlugin;

    constructor() {
        super(SceneName.BuyingTowerScene);
    }

    preload = () => {

    }

    create = () => {
        this.game.scene.pause(SceneName.BattleScene);
        const {width, height} = this.game.canvas;
        const scrollablePanel = this.rexUI.add.scrollablePanel({
            x: width / 2,
            y: height / 2,
            width: 410,
            height: height * 0.9,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_PRIMARY, 0.8),

            panel: {
                child: this.createGrid(),
                mask: {
                    padding: 1,
                }
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            header: this.rexUI.add.label({
                height: 30,

                orientation: 0,
                text: this.add.text(0, 0, 'Construct a defend tower !'),
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
            .on('child.click', function (child, pointer, event) {
                console.log(`Click ${child.text}`);
            })
            .on('child.pressstart', function (child, pointer, event) {
                console.log(`Press ${child.text}`);
            })
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

        for (let i = 0; i < 30; i++) {
            sizer.add(this.rexUI.add.label({
                width: 120, height: 120,

                background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
                text: this.add.text(0, 0, `${i}`, {
                    fontSize: 18
                }),

                align: 'center',
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                }
            }));
        }

        return sizer;
    }

    createBackdrop = () => {
        const {width, height} = this.game.canvas;
        this.game.scene.pause(SceneName.BattleScene);
        const rec = this.add.rectangle(width / 2, (height - 30) / 2, width - 100, height - 130, 0x000000, 0.8);
        rec.setOrigin(0.5, 0.5);
    }

    update = () => {

    }
}