<script setup lang="ts">
import { potions } from '../data/alchemyData'
import { useCustomerStore } from '../stores/customer'
import { useInventoryStore } from '../stores/inventory'
import { useAlchemistStore } from '../stores/alchemist'
import { useCustomerQueue } from '../composables/useCustomerQueue'
import type { Potion } from '../types'
import AlchemyIcon from './AlchemyIcon.vue'

const customerStore = useCustomerStore()
const inventoryStore = useInventoryStore()
const alchemistStore = useAlchemistStore()
const { serveCustomer, dismissCustomer } = useCustomerQueue()

function getWantedPotion(potionId: string): Potion | undefined {
  return potions.find(p => p.id === potionId)
}
</script>

<template>
  <div class="panel customer-panel">
    <div class="panel-header">
      <div class="title-with-icon">
        <AlchemyIcon name="counter" :size="20" class="header-icon-svg" />
        <h3>Прилавок лавки</h3>
      </div>
      <span class="sub-badge">Посетители и заказы</span>
    </div>

    <div v-if="customerStore.currentCustomer" class="customer-box">
      <!-- Профиль посетителя -->
      <div class="customer-header">
        <div class="customer-avatar-box">
          <AlchemyIcon :name="customerStore.currentCustomer.name" :size="24" class="customer-avatar-svg" />
        </div>
        <div class="customer-identity">
          <div class="customer-name">{{ customerStore.currentCustomer.name }}</div>
          <div class="customer-tag">Посетитель лавки</div>
        </div>
      </div>

      <!-- Живая реплика посетителя -->
      <div v-if="customerStore.currentCustomer.dialogue" class="speech-bubble">
        <span class="quote-mark">“</span>
        <p class="dialogue-text">{{ customerStore.currentCustomer.dialogue }}</p>
      </div>

      <!-- Детали запроса -->
      <div class="order-card">
        <div class="order-item-row">
          <span class="order-label">Требуется зелье:</span>
          <span class="order-potion-value">
            <AlchemyIcon :name="customerStore.currentCustomer.wantedPotionId" :size="18" class="potion-mini-svg" />
            <span class="potion-name-text">{{ getWantedPotion(customerStore.currentCustomer.wantedPotionId)?.name ?? 'Редкое снадобье' }}</span>
          </span>
        </div>

        <div class="order-item-row">
          <span class="order-label">Предлагает плату:</span>
          <div class="offer-price-badge">
            <AlchemyIcon name="coin" :size="16" class="coin-icon-svg" />
            <span class="coin-amount">{{ customerStore.currentCustomer.offerPrice }}</span>
          </div>
        </div>

        <div class="order-item-row">
          <span class="order-label">Наличие на складе:</span>
          <span
            class="stock-pill"
            :class="(inventoryStore.potionInventory[customerStore.currentCustomer.wantedPotionId] ?? 0) > 0 ? 'stock-yes' : 'stock-no'"
          >
            {{ (inventoryStore.potionInventory[customerStore.currentCustomer.wantedPotionId] ?? 0) > 0 ? `${inventoryStore.potionInventory[customerStore.currentCustomer.wantedPotionId]} шт. (Готово)` : 'Нет в наличии' }}
          </span>
        </div>
      </div>

      <!-- Действия -->
      <div class="customer-actions">
        <button
          class="btn btn-sell"
          :disabled="alchemistStore.isDead || !((inventoryStore.potionInventory[customerStore.currentCustomer.wantedPotionId] ?? 0) > 0)"
          title="Продать зелье посетителю"
          @click="serveCustomer"
        >
          <AlchemyIcon name="coin" :size="16" class="btn-coin-svg" />
          <span>Продать за {{ customerStore.currentCustomer.offerPrice }}</span>
        </button>
        <button
          class="btn btn-dismiss"
          :disabled="alchemistStore.isDead"
          title="Вежливо отказать и принять следующего"
          @click="dismissCustomer"
        >
          Вежливо отказать
        </button>
      </div>
    </div>

    <div v-else class="no-customer">
      <AlchemyIcon name="cauldron" :size="28" class="waiting-icon-svg" />
      <p>Ожидание следующего путника у прилавка...</p>
    </div>
  </div>
</template>

<style scoped>
.panel {
  position: relative;
  background: var(--card-bg, rgba(22, 19, 31, 0.88));
  border: 1px solid var(--border-color, rgba(224, 186, 117, 0.16));
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.panel::before,
.panel::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  pointer-events: none;
}

.panel::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(224, 186, 117, 0.45);
  border-left: 2px solid rgba(224, 186, 117, 0.45);
  border-top-left-radius: 10px;
}

.panel::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid rgba(224, 186, 117, 0.45);
  border-right: 2px solid rgba(224, 186, 117, 0.45);
  border-bottom-right-radius: 10px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon-svg {
  color: #e2b755;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #fce7b2;
  font-family: 'El Messiri', sans-serif;
}

.sub-badge {
  font-size: 0.78rem;
  color: #a89f91;
}

.customer-box {
  background: rgba(26, 22, 36, 0.65);
  border: 1px solid rgba(224, 186, 117, 0.14);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-avatar-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(38, 32, 54, 0.9);
  border: 1px solid rgba(224, 186, 117, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.customer-avatar-svg {
  color: #e2b755;
}

.customer-identity {
  display: flex;
  flex-direction: column;
}

.customer-name {
  font-size: 1.08rem;
  font-weight: 700;
  color: #f8fafc;
  font-family: 'El Messiri', sans-serif;
}

.customer-tag {
  font-size: 0.75rem;
  color: #a89f91;
}

/* Диалоговый пузырь с речью */
.speech-bubble {
  position: relative;
  background: rgba(36, 30, 48, 0.75);
  border-left: 3px solid #d97706;
  border-radius: 0 10px 10px 0;
  padding: 10px 14px 10px 16px;
  font-style: italic;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.quote-mark {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 1.2rem;
  color: rgba(217, 119, 6, 0.4);
  font-family: serif;
}

.dialogue-text {
  margin: 0;
  font-size: 0.88rem;
  color: #e2e8f0;
  line-height: 1.45;
}

/* Карточка условий сделки */
.order-card {
  background: rgba(18, 15, 24, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.86rem;
}

.order-label {
  color: #a1a1aa;
}

.order-potion-value {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #f1f5f9;
}

.potion-mini-svg {
  color: #e2b755;
}

.offer-price-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(18, 15, 24, 0.7);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(224, 186, 117, 0.18);
}

.coin-icon-svg {
  color: #fde047;
}

.coin-amount {
  font-family: 'El Messiri', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fde047;
}

.stock-pill {
  font-size: 0.78rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
}

.stock-yes {
  background: rgba(16, 185, 129, 0.15);
  color: #6ee7b7;
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.stock-no {
  background: rgba(239, 68, 68, 0.12);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.customer-actions {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.btn {
  flex: 1;
  padding: 9px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'El Messiri', sans-serif;
  font-size: 0.92rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.btn-sell {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.4);
  box-shadow: 0 2px 6px rgba(5, 150, 105, 0.3);
}

.btn-sell:hover:not(:disabled) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.45);
}

.btn-coin-svg {
  color: #fde047;
}

.btn-dismiss {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
}

.btn-dismiss:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
  transform: none !important;
}

.no-customer {
  padding: 30px 20px;
  text-align: center;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-style: italic;
}

.waiting-icon-svg {
  color: #e2b755;
  opacity: 0.7;
}
</style>
