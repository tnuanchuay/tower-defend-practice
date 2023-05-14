export interface Wave {
    enemies: EnemyWave[];
}

export interface EnemyWave {
    type: string;
    quantity: number;
    spawnInterval: number;
}