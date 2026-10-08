import { useEconomyStore } from '../stores/economy'
import { useInventoryStore } from '../stores/inventory'
import { useAlchemistStore } from '../stores/alchemist'
import { useToastStore } from '../stores/toast'
import type { Ingredient, Potion } from '../types'

export function useMarket() {
  const economyStore = useEconomyStore()
  const inventoryStore = useInventoryStore()
  const alchemistStore = useAlchemistStore()
  const toastStore = useToastStore()

  function buyIngredient(ingredient: Ingredient, count = 1) {
    const totalCost = ingredient.price * count
    if (alchemistStore.isDead || !economyStore.canAfford(totalCost)) return

    if (economyStore.spendGold(totalCost)) {
      inventoryStore.addIngredient(ingredient.id, count)
      toastStore.showToast(
        'Покупка',
        `Куплен «${ingredient.name}» ${count > 1 ? `x${count} ` : ''}(${totalCost} монет).`,
        'info'
      )
    }
  }

  function drinkPotion(potion: Potion) {
    const currentCount = inventoryStore.getPotionCount(potion.id)
    if (alchemistStore.isDead || currentCount <= 0) return

    if (potion.type === 'health' && alchemistStore.hp < alchemistStore.maxHp) {
      alchemistStore.heal(potion.restoreAmount)
      inventoryStore.removePotion(potion.id, 1)
      toastStore.showToast('Зелье выпито', `Восстановлено ${potion.restoreAmount} HP.`, 'success')
    } else if (potion.type === 'mana' && alchemistStore.mp < alchemistStore.maxMp) {
      alchemistStore.restoreMp(potion.restoreAmount)
      inventoryStore.removePotion(potion.id, 1)
      toastStore.showToast('Зелье выпито', `Восстановлено ${potion.restoreAmount} MP.`, 'success')
    }
  }

  return {
    buyIngredient,
    drinkPotion
  }
}
