export interface TowerData {
    type: string;
    sprite: string;
    attackDamage: number;
    attackSpeed: number;
    attackRange: number;
    cost: number;
    attackObjectSprite: string;
}

export const TowerModels: TowerData[] = [
    // Ancient
    {
        type: "AncientTower",
        sprite: 'tower',
        attackDamage: 1,
        attackSpeed: 800,
        attackRange: 100,
        cost: 300,
        attackObjectSprite: 'arrow'
    },
    // Medieval
    {
        type: "Medieval",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1000,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
    }
]