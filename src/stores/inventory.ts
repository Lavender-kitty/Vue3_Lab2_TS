import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Recipe } from '../types'
import { createInitialRecipes } from '../data/alchemyData'

export const useInventoryStore = defineStore('inventory', () => {
  const pantry = ref<Record<string, number>>({
    red_root: 2,
    moon_mushroom: 1,
    fairy_dust: 1,
    frost_lotus: 1
  })

  const potionInventory = ref<Record<string, number>>({})
  const recipes = ref<Recipe[]>(createInitialRecipes())

  function getIngredientCount(id: string): number {
    return pantry.value[id] ?? 0
  }

  function addIngredient(id: string, count = 1) {
    pantry.value[id] = (pantry.value[id] ?? 0) + count
  }

  function removeIngredient(id: string, count = 1): boolean {
    const current = pantry.value[id] ?? 0
    if (current < count) return false
    pantry.value[id] = current - count
    return true
  }

  function getPotionCount(id: string): number {
    return potionInventory.value[id] ?? 0
  }

  function addPotion(id: string, count = 1) {
    potionInventory.value[id] = (potionInventory.value[id] ?? 0) + count
  }

  function removePotion(id: string, count = 1): boolean {
    const current = potionInventory.value[id] ?? 0
    if (current < count) return false
    potionInventory.value[id] = current - count
    return true
  }

  function discoverRecipe(potionId: string) {
    const matched = recipes.value.find(r => r.potionId === potionId)
    if (matched) {
      matched.discovered = true
    }
  }

  function resetInventory() {
    pantry.value = {
      red_root: 2,
      moon_mushroom: 1,
      fairy_dust: 1,
      frost_lotus: 1
    }
    potionInventory.value = {}
    recipes.value = createInitialRecipes()
  }

  function loadInventory(
    loadedPantry?: Record<string, number>,
    loadedPotions?: Record<string, number>,
    loadedRecipes?: Recipe[]
  ) {
    if (loadedPantry) pantry.value = loadedPantry
    if (loadedPotions) potionInventory.value = loadedPotions
    if (loadedRecipes) {
      const existingIds = new Set(loadedRecipes.map(r => r.id))
      const missing = createInitialRecipes().filter(r => !existingIds.has(r.id))
      recipes.value = [...loadedRecipes, ...missing]
    }
  }

  return {
    pantry,
    potionInventory,
    recipes,
    getIngredientCount,
    addIngredient,
    removeIngredient,
    getPotionCount,
    addPotion,
    removePotion,
    discoverRecipe,
    resetInventory,
    loadInventory
  }
})
