import { useCustomerStore } from '../stores/customer'
import { useAlchemistStore } from '../stores/alchemist'
import { useEconomyStore } from '../stores/economy'
import { useInventoryStore } from '../stores/inventory'
import { useToastStore } from '../stores/toast'
import { customerArchetypes } from '../data/customerData'
import { potions } from '../data/alchemyData'
import type { Customer } from '../types'

export function useCustomerQueue() {
  const customerStore = useCustomerStore()
  const alchemistStore = useAlchemistStore()
  const economyStore = useEconomyStore()
  const inventoryStore = useInventoryStore()
  const toastStore = useToastStore()

  function generateCustomer(): Customer {
    const archetype =
      customerArchetypes[Math.floor(Math.random() * customerArchetypes.length)] ??
      customerArchetypes[0]!
    const randomPotion =
      potions[Math.floor(Math.random() * potions.length)] ?? potions[0]!

    const variance = 0.85 + Math.random() * 0.3
    const masterBonus = 1 + alchemistStore.masterRank * 0.05
    const price = Math.round(randomPotion.basePrice * variance * masterBonus)

    const defaultQuote = `«Мастер, мне срочно требуется ${randomPotion.name}! Заплачу звонкой монетой.»`
    const dialogue = archetype.quotes[randomPotion.id] ?? defaultQuote

    return {
      id: String(Date.now()),
      name: archetype.name,
      dialogue,
      wantedPotionId: randomPotion.id,
      offerPrice: Math.max(1, price)
    }
  }

  function nextCustomer() {
    customerStore.setCustomer(generateCustomer())
  }

  function serveCustomer(): boolean {
    if (!customerStore.currentCustomer || alchemistStore.isDead) return false

    const potionId = customerStore.currentCustomer.wantedPotionId
    const count = inventoryStore.getPotionCount(potionId)
    if (count <= 0) return false

    const earnedGold = customerStore.currentCustomer.offerPrice
    const customerName = customerStore.currentCustomer.name

    inventoryStore.removePotion(potionId, 1)
    economyStore.addGold(earnedGold)

    toastStore.showToast(
      'Сделка закрыта',
      `${customerName} приобрел зелье за ${earnedGold} монет (+35 XP).`,
      'gold'
    )

    alchemistStore.gainXp(35)
    nextCustomer()
    return true
  }

  function dismissCustomer() {
    if (alchemistStore.isDead) return
    toastStore.showToast('Покупатель ушел', 'Клиент покинул лавку.', 'info')
    nextCustomer()
  }

  function initQueue() {
    if (!customerStore.currentCustomer) {
      nextCustomer()
    }
  }

  return {
    currentCustomer: customerStore.currentCustomer,
    generateCustomer,
    nextCustomer,
    serveCustomer,
    dismissCustomer,
    initQueue
  }
}
