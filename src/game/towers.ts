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
    {
        type: "AncientTower",
        sprite: 'ancient_tower',
        attackDamage: 5,
        attackSpeed: 500,
        attackRange: 100,
        cost: 100,
        attackObjectSprite: 'rock'
    },
    {
        type: "Medieval",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1000,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
    },
    {
        type: "Catapult",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1500,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
    }
]