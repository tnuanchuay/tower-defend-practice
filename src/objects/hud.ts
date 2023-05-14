import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;

export class HUD {
    private readonly scene: Scene;
    private readonly moneyText: Text;
    private readonly killText: Text;
    private readonly liveText: Text;

    constructor(scene: Scene) {
        this.scene = scene;
        this.liveText = this.scene.add.text(750, 610, "Lives: 5");
        this.killText = this.scene.add.text(620, 610, "Kills: 0");
        this.moneyText = this.scene.add.text(15, 610, "Money: 0");
    }

    update = () => {
        const live = this.scene.data.get('lives');
        const money = this.scene.data.get('money');
        const kills = this.scene.data.get('kills');

        this.liveText.setText(`Lives: ${live}`);
        this.killText.setText(`Kills: ${kills}`);
        this.moneyText.setText(`Money: ${money}`);
    }
}