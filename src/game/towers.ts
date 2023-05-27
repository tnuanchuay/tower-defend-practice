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
        cost: 100,
        attackObjectSprite: 'arrow'
    },
    // Medieval
    {
        type: "Catapult",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1500,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
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
    // Ancient
    {
        type: "AncientTower",
        sprite: 'tower',
        attackDamage: 1,
        attackSpeed: 800,
        attackRange: 100,
        cost: 100,
        attackObjectSprite: 'arrow'
    },
    // Medieval
    {
        type: "Catapult",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1500,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
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
    // Ancient
    {
        type: "AncientTower",
        sprite: 'tower',
        attackDamage: 1,
        attackSpeed: 800,
        attackRange: 100,
        cost: 100,
        attackObjectSprite: 'arrow'
    },
    // Medieval
    {
        type: "Catapult",
        sprite: 'tower',
        attackDamage: 10,
        attackSpeed: 1500,
        attackRange: 150,
        cost: 300,
        attackObjectSprite: 'arrow'
    },
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