import {Scene} from "phaser";
import Text = Phaser.GameObjects.Text;

export class HUD {
    private readonly scene: Scene;
    private readonly moneyText: Text;
    private readonly killText: Text;
    private readonly liveText: Text;
    private readonly waveText: Text;

    private lives: number;
    private money: number;
    private kills: number;
    private wave: number;

    constructor(scene: Scene) {
        this.scene = scene;
        this.liveText = this.scene.add.text(750, 610, "Lives: 5");
        this.killText = this.scene.add.text(620, 610, "Kills: 0");
        this.moneyText = this.scene.add.text(470, 610, "Money: 0");
        this.waveText = this.scene.add.text(15, 610, "Wave: 1");
    }

    update = () => {
        const lives = this.scene.data.get('lives');
        if(this.lives != lives){
            this.liveText.setText(`Lives: ${lives}`);
            this.lives = lives
        }

        const money = this.scene.data.get('money');
        if(this.money != money){
            this.moneyText.setText(`Money: ${money}`);
            this.money = money;
        }

        const kills = this.scene.data.get('kills');
        if(this.kills != kills){
            this.killText.setText(`Kills: ${kills}`);
            this.kills = kills;
        }

        const wave = this.scene.data.get('wave');
        if(this.wave != wave){
            this.waveText.setText(`Wave: ${wave}`);
            this.wave = wave;
        }
    }
}