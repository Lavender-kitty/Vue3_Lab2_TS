import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ingredient, BrewResult } from '../types'

export const useCauldronStore = defineStore('cauldron', () => {
  const slot1 = ref<Ingredient | null>(null)
  const slot2 = ref<Ingredient | null>(null)
  const lastResult = ref<BrewResult | null>(null)

  function setSlot1(item: Ingredient | null) {
    slot1.value = item
  }

  function setSlot2(item: Ingredient | null) {
    slot2.value = item
  }

  function setResult(result: BrewResult | null) {
    lastResult.value = result
  }

  function clearSlots() {
    slot1.value = null
    slot2.value = null
  }

  function resetCauldron() {
    slot1.value = null
    slot2.value = null
    lastResult.value = null
  }

  return {
    slot1,
    slot2,
    lastResult,
    setSlot1,
    setSlot2,
    setResult,
    clearSlots,
    resetCauldron
  }
})
