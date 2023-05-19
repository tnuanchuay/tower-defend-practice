import {Monster} from "../objects/monster";

export interface MonsterConfig {
    speed: number;
    hp: number;
}

export const monsterConfig: { [key: string]: MonsterConfig } = {
    "simple1": {
        speed: 0.1,
        hp: 10
    },
    "simple2": {
        speed: 0.09,
        hp: 30
    },
    "simple3": {
        speed: 0.08,
        hp: 50
    },
    "boss1": {
        speed: 0.06,
        hp: 1000
    },
    "speed1": {
        speed: 0.15,
        hp: 10
    },
    "speed2": {
        speed: 0.17,
        hp: 30
    }
}