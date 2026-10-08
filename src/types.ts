export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export interface Ingredient {
  id: string
  name: string
  price: number
  description: string
  rarity?: ItemRarity
  rarityName?: string
}

export type PotionType = 'health' | 'mana' | 'strength'

export interface Potion {
  id: string
  name: string
  type: PotionType
  restoreAmount: number
  basePrice: number
  description: string
  rarity?: ItemRarity
  rarityName?: string
}

export interface Recipe {
  id: string
  potionId: string
  ingredientIds: [string, string]
  discovered: boolean
}

export interface Customer {
  id: string
  name: string
  wantedPotionId: string
  offerPrice: number
  dialogue?: string
}

export interface AlchemistStats {
  hp: number
  maxHp: number
  mp: number
  maxMp: number
  gold: number
  level: number
  xp: number
  xpToNextLevel: number
  masterRank: number
  isDead: boolean
}

export type ExplosionSeverity = 'normal' | 'heavy' | 'catastrophic'

export interface BrewResult {
  success: boolean
  message: string
  severity?: ExplosionSeverity
  damage?: number
  createdPotionName?: string
}
