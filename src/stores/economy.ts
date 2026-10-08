import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEconomyStore = defineStore('economy', () => {
  const gold = ref<number>(50)

  function canAfford(cost: number): boolean {
    return gold.value >= cost
  }

  function spendGold(amount: number): boolean {
    if (gold.value < amount) return false
    gold.value -= amount
    return true
  }

  function addGold(amount: number) {
    gold.value += Math.max(0, amount)
  }

  function setGold(amount: number) {
    gold.value = Math.max(0, amount)
  }

  function resetEconomy(initialGold = 50) {
    gold.value = initialGold
  }

  return {
    gold,
    canAfford,
    spendGold,
    addGold,
    setGold,
    resetEconomy
  }
})
