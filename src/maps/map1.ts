import {Waypoint} from "../game/waypoint";
import {AvailableSlot} from "../game/slot";
import {Map} from "./map";
import {Slot} from "../objects/slot";
import {Scene} from "phaser";
import {Wave} from "../game/wave";
import GameObject = Phaser.GameObjects.GameObject;
import {EnemyGenerator} from "../game/enemyGenerator";


export class Map1 extends GameObject implements Map {
    waypoints: Waypoint[] = [
        {x: -32, y: 76},
        {x: 316, y: 76},
        {x: 316, y: 376},
        {x: 76, y: 376},
        {x: 76, y: 496},
        {x: 736, y: 496},
        {x: 736, y: 376},
        {x: 496, y: 376},
        {x: 496, y: 76},
        {x: 736, y: 76},
        {x: 840, y: 76},
    ];
    availableSlots: AvailableSlot[] = [

        // 1
        {
            x: 0,
            y: 0
        },
        {
            x: 60,
            y: 0
        },
        {
            x: 120,
            y: 0
        },
        {
            x: 180,
            y: 0
        },
        {
            x: 240,
            y: 0
        },
        {
            x: 300,
            y: 0
        },
        {
            x: 360,
            y: 0
        },
        {
            x: 420,
            y: 0
        },
        {
            x: 480,
            y: 0
        },
        {
            x: 540,
            y: 0
        },
        {
            x: 600,
            y: 0
        },
        {
            x: 660,
            y: 0
        },
        {
            x: 720,
            y: 0
        },
        {
            x: 780,
            y: 0
        },

        // 2
        {
            x: 360,
            y: 60
        },
        {
            x: 420,
            y: 60
        },

        // 3
        {
            x: 0,
            y: 120
        },
        {
            x: 60,
            y: 120
        },
        {
            x: 120,
            y: 120
        },
        {
            x: 180,
            y: 120
        },
        {
            x: 240,
            y: 120
        },
        {
            x: 360,
            y: 120
        },
        {
            x: 420,
            y: 120
        },
        {
            x: 540,
            y: 120
        },
        {
            x: 600,
            y: 120
        },
        {
            x: 660,
            y: 120
        },
        {
            x: 720,
            y: 120
        },
        {
            x: 780,
            y: 120
        },

        // 4
        {
            x: 240,
            y: 180
        },
        {
            x: 360,
            y: 180
        },
        {
            x: 420,
            y: 180
        },
        {
            x: 540,
            y: 180
        },

        // 5
        {
            x: 240,
            y: 240
        },
        {
            x: 360,
            y: 240
        },
        {
            x: 420,
            y: 240
        },
        {
            x: 540,
            y: 240
        },

        // 6
        {
            x: 0,
            y: 300
        },
        {
            x: 60,
            y: 300
        },
        {
            x: 120,
            y: 300
        },
        {
            x: 180,
            y: 300
        },
        {
            x: 240,
            y: 300
        },
        {
            x: 360,
            y: 300
        },
        {
            x: 420,
            y: 300
        },
        {
            x: 540,
            y: 300
        },
        {
            x: 600,
            y: 300
        },
        {
            x: 660,
            y: 300
        },
        {
            x: 720,
            y: 300
        },
        {
            x: 780,
            y: 300
        },

        // 7
        {
            x: 0,
            y: 360
        },
        {
            x: 360,
            y: 360
        },
        {
            x: 420,
            y: 360
        },
        {
            x: 780,
            y: 360
        },

        // 8
        {
            x: 0,
            y: 420
        },
        {
            x: 120,
            y: 420
        },
        {
            x: 180,
            y: 420
        },
        {
            x: 240,
            y: 420
        },
        {
            x: 300,
            y: 420
        },
        {
            x: 360,
            y: 420
        },
        {
            x: 420,
            y: 420
        },
        {
            x: 480,
            y: 420
        },
        {
            x: 540,
            y: 420
        },
        {
            x: 600,
            y: 420
        },
        {
            x: 660,
            y: 420
        },
        {
            x: 780,
            y: 420
        },

        // 9
        {
            x: 0,
            y: 480
        },
        {
            x: 780,
            y: 480
        },

        // 10
        {
            x: 0,
            y: 540
        },
        {
            x: 60,
            y: 540
        },
        {
            x: 120,
            y: 540
        },
        {
            x: 180,
            y: 540
        },
        {
            x: 240,
            y: 540
        },
        {
            x: 300,
            y: 540
        },
        {
            x: 360,
            y: 540
        },
        {
            x: 420,
            y: 540
        },
        {
            x: 480,
            y: 540
        },
        {
            x: 540,
            y: 540
        },
        {
            x: 600,
            y: 540
        },
        {
            x: 660,
            y: 540
        },
        {
            x: 720,
            y: 540
        },
        {
            x: 780,
            y: 540
        },
    ]
    slots: Slot[] = [];

    enemyGenerator: EnemyGenerator;

    private waves: Wave[] = [
        {
            enemies: [
                {type: "simple1", quantity: 50, spawnInterval: 600},
                {type: "simple1", quantity: 30, spawnInterval: 200}
            ]
        },
        {
            enemies: [
                {type: "simple1", quantity: 50, spawnInterval: 600},
                {type: "simple2", quantity: 30, spawnInterval: 250}]
        },
        {
            enemies: [
                {type: "simple3", quantity: 50, spawnInterval: 500},
                {type: "speed1", quantity: 10, spawnInterval: 200},
                {type: "simple3", quantity: 50, spawnInterval: 500},
                {type: "simple2", quantity: 30, spawnInterval: 200}
            ]
        },
        {
            enemies: [
                {type: "simple3", quantity: 70, spawnInterval: 500},
                {type: "speed1", quantity: 10, spawnInterval: 200},
                {type: "simple3", quantity: 70, spawnInterval: 500},
                {type: "speed2", quantity: 10, spawnInterval: 200},
                {type: "simple3", quantity: 100, spawnInterval: 200}
            ]
        },
        {
            enemies: [
                {type: "speed2", quantity: 20, spawnInterval: 200},
                {type: "simple3", quantity: 70, spawnInterval: 500},
                {type: "speed2", quantity: 50, spawnInterval: 200},
                {type: "simple3", quantity: 70, spawnInterval: 200},
                {type: "speed2", quantity: 50, spawnInterval: 200},
            ]
        },
        {
            enemies: [{type: "boss1", quantity: 2, spawnInterval: 100}]
        },
    ];

    constructor(scene: Scene) {
        super(scene, "map1")

        const terrain = scene.add.sprite(0, 0, 'terrain');
        terrain.setOrigin(0, 0);
        this.slots = this.availableSlots.map(i => new Slot(scene, i.x, i.y));
        this.enemyGenerator = new EnemyGenerator(scene, this.waves, this.waypoints);
    }
}