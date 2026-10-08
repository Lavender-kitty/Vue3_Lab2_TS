import type { Ingredient, Potion, Recipe } from '../types'

export const marketIngredients: Ingredient[] = [
  { id: 'red_root', name: 'Красный корень', rarity: 'common', rarityName: 'Обычный', price: 5, description: 'Древний корень с горьким терпким соком' },
  { id: 'moon_mushroom', name: 'Лунный гриб', rarity: 'uncommon', rarityName: 'Магический', price: 8, description: 'Светится мягким лазурным сиянием' },
  { id: 'fairy_dust', name: 'Пыльца феи', rarity: 'uncommon', rarityName: 'Магический', price: 12, description: 'Мерцающая пыльца лесных созданий' },
  { id: 'frost_lotus', name: 'Морозный лотос', rarity: 'rare', rarityName: 'Редкий', price: 15, description: 'Ледяной цветок с горных пиков мерзлоты' },
  { id: 'phoenix_feather', name: 'Перо феникса', rarity: 'rare', rarityName: 'Редкий', price: 20, description: 'Горячее пламенное перо бессмертной птицы' },
  { id: 'shadow_herb', name: 'Теневой вереск', rarity: 'epic', rarityName: 'Эпический', price: 25, description: 'Редкое соцветие из сумрачных полуночных чащ' },
  { id: 'dragon_tear', name: 'Слеза дракона', rarity: 'epic', rarityName: 'Эпический', price: 35, description: 'Кристаллизованная первородная магия' },
  { id: 'sun_amber', name: 'Солнечный янтарь', rarity: 'legendary', rarityName: 'Легендарный', price: 45, description: 'Окаменевшая смола древнейшего мирового древа' }
]

export const potions: Potion[] = [
  {
    id: 'health_potion',
    name: 'Зелье исцеления',
    type: 'health',
    rarity: 'common',
    rarityName: 'Обычное',
    restoreAmount: 40,
    basePrice: 18,
    description: 'Восстанавливает 40 HP'
  },
  {
    id: 'mana_potion',
    name: 'Зелье маны',
    type: 'mana',
    rarity: 'uncommon',
    rarityName: 'Магическое',
    restoreAmount: 40,
    basePrice: 22,
    description: 'Восстанавливает 40 MP'
  },
  {
    id: 'frost_brew',
    name: 'Ледяная эссенция',
    type: 'health',
    rarity: 'rare',
    rarityName: 'Редкое',
    restoreAmount: 65,
    basePrice: 50,
    description: 'Восстанавливает 65 HP морозной свежестью'
  },
  {
    id: 'strength_potion',
    name: 'Эликсир могущества',
    type: 'strength',
    rarity: 'rare',
    rarityName: 'Редкое',
    restoreAmount: 0,
    basePrice: 45,
    description: 'Концентрирует боевую ярость воина'
  },
  {
    id: 'shadow_elixir',
    name: 'Сумеречный эликсир',
    type: 'mana',
    rarity: 'epic',
    rarityName: 'Эпическое',
    restoreAmount: 65,
    basePrice: 60,
    description: 'Восстанавливает 65 MP темной энергией'
  },
  {
    id: 'phoenix_brew',
    name: 'Пламенная настойка',
    type: 'strength',
    rarity: 'legendary',
    rarityName: 'Легендарное',
    restoreAmount: 0,
    basePrice: 70,
    description: 'Легендарное зелье неистового пламени'
  },
  {
    id: 'solar_draught',
    name: 'Солнечный бальзам',
    type: 'strength',
    rarity: 'legendary',
    rarityName: 'Легендарное',
    restoreAmount: 0,
    basePrice: 95,
    description: 'Высший алхимический эликсир лучистой мощи'
  }
]

export const initialRecipes: Recipe[] = [
  {
    id: 'recipe_health',
    potionId: 'health_potion',
    ingredientIds: ['red_root', 'fairy_dust'],
    discovered: false
  },
  {
    id: 'recipe_mana',
    potionId: 'mana_potion',
    ingredientIds: ['moon_mushroom', 'fairy_dust'],
    discovered: false
  },
  {
    id: 'recipe_frost',
    potionId: 'frost_brew',
    ingredientIds: ['frost_lotus', 'moon_mushroom'],
    discovered: false
  },
  {
    id: 'recipe_strength',
    potionId: 'strength_potion',
    ingredientIds: ['red_root', 'phoenix_feather'],
    discovered: false
  },
  {
    id: 'recipe_shadow',
    potionId: 'shadow_elixir',
    ingredientIds: ['shadow_herb', 'fairy_dust'],
    discovered: false
  },
  {
    id: 'recipe_phoenix',
    potionId: 'phoenix_brew',
    ingredientIds: ['phoenix_feather', 'dragon_tear'],
    discovered: false
  },
  {
    id: 'recipe_solar',
    potionId: 'solar_draught',
    ingredientIds: ['sun_amber', 'dragon_tear'],
    discovered: false
  }
]

export const createInitialRecipes = (): Recipe[] => initialRecipes.map(r => ({ ...r }))
