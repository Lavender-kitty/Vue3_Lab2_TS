import { useCauldronStore } from '../stores/cauldron'
import { useAlchemistStore } from '../stores/alchemist'
import { useInventoryStore } from '../stores/inventory'
import { useToastStore } from '../stores/toast'
import { marketIngredients, potions } from '../data/alchemyData'
import type { BrewResult } from '../types'

export function useBrewing() {
  const cauldronStore = useCauldronStore()
  const alchemistStore = useAlchemistStore()
  const inventoryStore = useInventoryStore()
  const toastStore = useToastStore()

  function putInCauldron(ingredientId: string) {
    if (alchemistStore.isDead) return
    if (inventoryStore.getIngredientCount(ingredientId) <= 0) return

    const item = marketIngredients.find(i => i.id === ingredientId)
    if (!item) return

    if (!cauldronStore.slot1) {
      if (inventoryStore.removeIngredient(ingredientId, 1)) {
        cauldronStore.setSlot1(item)
      }
    } else if (!cauldronStore.slot2) {
      if (inventoryStore.removeIngredient(ingredientId, 1)) {
        cauldronStore.setSlot2(item)
      }
    }
  }

  function removeFromSlot(slotIndex: 1 | 2) {
    if (slotIndex === 1 && cauldronStore.slot1) {
      const id = cauldronStore.slot1.id
      inventoryStore.addIngredient(id, 1)
      cauldronStore.setSlot1(null)
    } else if (slotIndex === 2 && cauldronStore.slot2) {
      const id = cauldronStore.slot2.id
      inventoryStore.addIngredient(id, 1)
      cauldronStore.setSlot2(null)
    }
  }

  function brew() {
    if (
      alchemistStore.isDead ||
      !cauldronStore.slot1 ||
      !cauldronStore.slot2 ||
      alchemistStore.mp < 15
    ) {
      return
    }

    alchemistStore.spendMp(15)

    const ing1 = cauldronStore.slot1.id
    const ing2 = cauldronStore.slot2.id

    const matchedRecipe = inventoryStore.recipes.find(r => {
      return (
        (r.ingredientIds[0] === ing1 && r.ingredientIds[1] === ing2) ||
        (r.ingredientIds[0] === ing2 && r.ingredientIds[1] === ing1)
      )
    })

    if (matchedRecipe) {
      inventoryStore.discoverRecipe(matchedRecipe.potionId)
      const potion = potions.find(p => p.id === matchedRecipe.potionId)
      const potionName = potion ? potion.name : 'Зелье'
      inventoryStore.addPotion(matchedRecipe.potionId, 1)

      const result: BrewResult = {
        success: true,
        message: `Успех! Синтезировано: ${potionName}.`,
        createdPotionName: potionName
      }
      cauldronStore.setResult(result)
      toastStore.showToast(
        'Синтез успешен',
        `Получено «${potionName}». Рецепт открыт в гримуаре.`,
        'success'
      )
    } else {
      const roll = Math.random()
      let damage = 25
      let severityLabel = 'Взрыв котла'
      let severityType: 'normal' | 'heavy' | 'catastrophic' = 'normal'

      if (roll < 0.15) {
        damage = 75
        severityLabel = 'Катастрофический взрыв'
        severityType = 'catastrophic'
      } else if (roll < 0.4) {
        damage = 50
        severityLabel = 'Тяжелый взрыв'
        severityType = 'heavy'
      }

      const died = alchemistStore.takeDamage(damage)

      if (died) {
        cauldronStore.setResult({
          success: false,
          severity: severityType,
          damage,
          message: `${severityLabel}! Урон: ${damage} HP. Алхимик погиб от ран.`
        })
      } else {
        cauldronStore.setResult({
          success: false,
          severity: severityType,
          damage,
          message: `${severityLabel}! Урон: ${damage} HP.`
        })
        toastStore.showToast(severityLabel, `Неудачный состав! Потеряно ${damage} HP.`, 'danger')
      }
    }

    cauldronStore.clearSlots()
  }

  return {
    putInCauldron,
    removeFromSlot,
    brew
  }
}
