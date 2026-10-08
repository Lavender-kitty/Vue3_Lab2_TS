import { watch, onMounted } from 'vue'
import { useAlchemistStore } from '../stores/alchemist'
import { useEconomyStore } from '../stores/economy'
import { useInventoryStore } from '../stores/inventory'
import { useCauldronStore } from '../stores/cauldron'
import { useToastStore } from '../stores/toast'
import { useCustomerQueue } from './useCustomerQueue'

const STORAGE_KEY = 'alchemist_lab_state'

export function useGamePersistence() {
  const alchemistStore = useAlchemistStore()
  const economyStore = useEconomyStore()
  const inventoryStore = useInventoryStore()
  const cauldronStore = useCauldronStore()
  const toastStore = useToastStore()
  const customerQueue = useCustomerQueue()

  function saveState() {
    try {
      const state = {
        alchemist: alchemistStore.exportStats(economyStore.gold),
        gold: economyStore.gold,
        pantry: inventoryStore.pantry,
        potionInventory: inventoryStore.potionInventory,
        recipes: inventoryStore.recipes
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }

  function loadState(): boolean {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false

    try {
      const parsed = JSON.parse(raw)
      if (parsed.alchemist) {
        alchemistStore.loadStats(parsed.alchemist)
        if (parsed.alchemist.gold !== undefined) {
          economyStore.setGold(parsed.alchemist.gold)
        }
      }
      if (parsed.gold !== undefined) {
        economyStore.setGold(parsed.gold)
      }
      inventoryStore.loadInventory(parsed.pantry, parsed.potionInventory, parsed.recipes)
      return true
    } catch {
      return false
    }
  }

  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}

    alchemistStore.resetAlchemist()
    economyStore.resetEconomy(50)
    inventoryStore.resetInventory()
    cauldronStore.resetCauldron()
    customerQueue.nextCustomer()
    toastStore.showToast('Сброс', 'Прогресс сброшен к начальному состоянию.', 'info')
  }

  onMounted(() => {
    loadState()
    customerQueue.initQueue()
  })

  watch(
    [
      () => alchemistStore.hp,
      () => alchemistStore.maxHp,
      () => alchemistStore.mp,
      () => alchemistStore.maxMp,
      () => alchemistStore.level,
      () => alchemistStore.xp,
      () => alchemistStore.xpToNextLevel,
      () => alchemistStore.masterRank,
      () => alchemistStore.isDead,
      () => economyStore.gold,
      () => inventoryStore.pantry,
      () => inventoryStore.potionInventory,
      () => inventoryStore.recipes
    ],
    () => {
      saveState()
    },
    { deep: true }
  )

  watch(
    () => alchemistStore.isDead,
    (dead) => {
      if (dead) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
        toastStore.showToast(
          'Смерть алхимика',
          'Алхимик тяжело ранен взрывом. Работа приостановлена.',
          'danger'
        )
      }
    }
  )

  return {
    saveState,
    loadState,
    resetAll
  }
}
