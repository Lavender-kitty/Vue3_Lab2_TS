<script setup lang="ts">
import { marketIngredients } from '../data/alchemyData'
import { useInventoryStore } from '../stores/inventory'
import { useEconomyStore } from '../stores/economy'
import { useAlchemistStore } from '../stores/alchemist'
import { useBrewing } from '../composables/useBrewing'
import { useMarket } from '../composables/useMarket'
import AlchemyIcon from './AlchemyIcon.vue'

const inventoryStore = useInventoryStore()
const economyStore = useEconomyStore()
const alchemistStore = useAlchemistStore()
const { putInCauldron } = useBrewing()
const { buyIngredient } = useMarket()
</script>

<template>
  <div class="panel storage-panel">
    <!-- Кладовая алхимика (вверху для быстрого доступа к котлу) -->
    <div class="section-block">
      <div class="section-header">
        <div class="title-with-icon">
          <AlchemyIcon name="pantry" :size="20" class="header-icon-svg" />
          <h3>Кладовая алхимика</h3>
        </div>
        <span class="sub-badge">Кликните по запасам для котла</span>
      </div>

      <div class="pantry-grid">
        <div
          v-for="item in marketIngredients"
          :key="'pantry-' + item.id"
          class="pantry-card"
          :class="[
            'rarity-' + (item.rarity || 'common'),
            { empty: !((inventoryStore.pantry[item.id] ?? 0) > 0) }
          ]"
          :title="(inventoryStore.pantry[item.id] ?? 0) > 0 ? 'Нажмите, чтобы положить в котел' : 'Запасы пусты'"
          @click="(inventoryStore.pantry[item.id] ?? 0) > 0 && !alchemistStore.isDead && putInCauldron(item.id)"
        >
          <div class="pantry-card-top">
            <AlchemyIcon :name="item.id" :size="22" class="pantry-svg-icon" />
            <span class="pantry-count">{{ inventoryStore.pantry[item.id] ?? 0 }} шт.</span>
          </div>
          <div class="pantry-name">{{ item.name }}</div>
          <div class="pantry-status">
            {{ (inventoryStore.pantry[item.id] ?? 0) > 0 ? 'В наличии' : 'Закончилось' }}
          </div>
        </div>
      </div>
    </div>

    <div class="section-divider"></div>

    <!-- Рынок сырья (под кладовой) -->
    <div class="section-block">
      <div class="section-header">
        <div class="title-with-icon">
          <AlchemyIcon name="market" :size="20" class="header-icon-svg" />
          <h3>Рынок сырья</h3>
        </div>
        <span class="sub-badge">Покупка трав и эссенций</span>
      </div>

      <div class="market-list">
        <div
          v-for="item in marketIngredients"
          :key="'market-' + item.id"
          class="market-row"
          :class="'row-rarity-' + (item.rarity || 'common')"
        >
          <div class="item-main">
            <div class="item-icon-wrapper" :class="'icon-tier-' + (item.rarity || 'common')">
              <AlchemyIcon :name="item.id" :size="24" class="item-svg-icon" />
            </div>
            <div class="item-text">
              <div class="item-title-row">
                <span class="item-name">{{ item.name }}</span>
                <span class="rarity-badge" :class="'badge-' + (item.rarity || 'common')">
                  {{ item.rarityName || 'Обычный' }}
                </span>
              </div>
              <span class="item-desc">{{ item.description }}</span>
            </div>
          </div>

          <div class="item-purchase">
            <div class="price-badge">
              <AlchemyIcon name="coin" :size="16" class="coin-icon-svg" />
              <span class="coin-amount">{{ item.price }}</span>
            </div>

            <div class="buy-actions">
              <button
                class="btn btn-buy"
                :disabled="economyStore.gold < item.price || alchemistStore.isDead"
                title="Купить 1 штуку"
                @click="buyIngredient(item, 1)"
              >
                Купить
              </button>
              <button
                v-if="economyStore.gold >= item.price * 5"
                class="btn btn-buy-multi"
                :disabled="alchemistStore.isDead"
                title="Купить 5 штук сразу"
                @click="buyIngredient(item, 5)"
              >
                +5x
              </button>
            </div>
          </div>
        </div>
      </div>
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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Алхимические золоченые виньетки по углам карточек */
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

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
  letter-spacing: 0.01em;
}

.sub-badge {
  font-size: 0.78rem;
  color: #a89f91;
}

.section-divider {
  height: 1px;
  background: rgba(224, 186, 117, 0.12);
}

/* Сетка запасов */
.pantry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 10px;
}

.pantry-card {
  background: rgba(26, 22, 36, 0.65);
  border: 1px solid rgba(224, 186, 117, 0.14);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.pantry-card:hover:not(.empty) {
  transform: translateY(-2px);
  border-color: rgba(245, 158, 11, 0.5);
  background: rgba(38, 32, 54, 0.85);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.pantry-card.empty {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: rgba(255, 255, 255, 0.05);
  background: rgba(18, 15, 24, 0.5);
}

.pantry-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pantry-svg-icon {
  color: #e2b755;
  filter: drop-shadow(0 0 4px rgba(226, 183, 85, 0.2));
}

.pantry-card.rarity-uncommon .pantry-svg-icon { color: #86efac; }
.pantry-card.rarity-rare .pantry-svg-icon { color: #93c5fd; }
.pantry-card.rarity-epic .pantry-svg-icon { color: #d8b4fe; }
.pantry-card.rarity-legendary .pantry-svg-icon { color: #fde047; }

.pantry-name {
  font-size: 0.92rem;
  font-weight: 600;
  font-family: 'El Messiri', sans-serif;
  color: #f1f5f9;
}

.pantry-count {
  font-size: 0.82rem;
  font-weight: 700;
  color: #fde68a;
  background: rgba(245, 158, 11, 0.15);
  padding: 2px 6px;
  border-radius: 6px;
}

.pantry-status {
  font-size: 0.72rem;
  color: #94a3b8;
}

/* Редкость в кладовой */
.pantry-card.rarity-uncommon:not(.empty) { border-color: rgba(74, 222, 128, 0.25); }
.pantry-card.rarity-rare:not(.empty) { border-color: rgba(96, 165, 250, 0.25); }
.pantry-card.rarity-epic:not(.empty) { border-color: rgba(192, 132, 252, 0.25); }
.pantry-card.rarity-legendary:not(.empty) { border-color: rgba(250, 204, 21, 0.35); }

/* Рынок */
.market-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.market-row {
  background: rgba(26, 22, 36, 0.6);
  border: 1px solid rgba(224, 186, 117, 0.12);
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.market-row:hover {
  transform: translateY(-1px);
  border-color: rgba(224, 186, 117, 0.3);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
}

.item-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(18, 15, 24, 0.7);
  border: 1px solid rgba(224, 186, 117, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-tier-common { color: #cbd5e1; border-color: rgba(148, 163, 184, 0.25); }
.icon-tier-uncommon { color: #86efac; border-color: rgba(74, 222, 128, 0.3); }
.icon-tier-rare { color: #93c5fd; border-color: rgba(96, 165, 250, 0.3); }
.icon-tier-epic { color: #d8b4fe; border-color: rgba(192, 132, 252, 0.3); }
.icon-tier-legendary { color: #fde047; border-color: rgba(250, 204, 21, 0.4); }

.item-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.item-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.item-name {
  font-size: 1.02rem;
  font-weight: 700;
  font-family: 'El Messiri', sans-serif;
  color: #f8fafc;
}

.rarity-badge {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.badge-common { background: rgba(148, 163, 184, 0.12); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.25); }
.badge-uncommon { background: rgba(74, 222, 128, 0.12); color: #86efac; border: 1px solid rgba(74, 222, 128, 0.3); }
.badge-rare { background: rgba(96, 165, 250, 0.12); color: #93c5fd; border: 1px solid rgba(96, 165, 250, 0.3); }
.badge-epic { background: rgba(192, 132, 252, 0.12); color: #d8b4fe; border: 1px solid rgba(192, 132, 252, 0.3); }
.badge-legendary { background: rgba(250, 204, 21, 0.15); color: #fde047; border: 1px solid rgba(250, 204, 21, 0.4); }

.item-desc {
  font-size: 0.78rem;
  color: #a1a1aa;
}

.item-purchase {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(18, 15, 24, 0.7);
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid rgba(224, 186, 117, 0.18);
}

.coin-icon-svg {
  color: #fde047;
  filter: drop-shadow(0 0 4px rgba(250, 204, 21, 0.35));
}

.coin-amount {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fde047;
  font-family: 'El Messiri', sans-serif;
}

.buy-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn {
  padding: 7px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'El Messiri', sans-serif;
  font-size: 0.88rem;
}

.btn-buy {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  color: #ffffff;
  border: 1px solid rgba(245, 158, 11, 0.35);
  box-shadow: 0 2px 6px rgba(180, 83, 9, 0.3);
}

.btn-buy:hover:not(:disabled) {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(180, 83, 9, 0.4);
}

.btn-buy:active:not(:disabled) {
  transform: translateY(1px);
}

.btn-buy-multi {
  background: rgba(224, 186, 117, 0.12);
  color: #fde68a;
  border: 1px solid rgba(224, 186, 117, 0.3);
  padding: 7px 10px;
}

.btn-buy-multi:hover:not(:disabled) {
  background: rgba(224, 186, 117, 0.22);
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: none !important;
}
</style>
