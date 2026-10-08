<script setup lang="ts">
import { potions } from '../data/alchemyData'
import { useInventoryStore } from '../stores/inventory'
import { useAlchemistStore } from '../stores/alchemist'
import { useMarket } from '../composables/useMarket'
import AlchemyIcon from './AlchemyIcon.vue'

const inventoryStore = useInventoryStore()
const alchemistStore = useAlchemistStore()
const { drinkPotion } = useMarket()
</script>

<template>
  <div class="panel showcase-panel">
    <div class="panel-header">
      <div class="title-with-icon">
        <AlchemyIcon name="health_potion" :size="20" class="header-icon-svg" />
        <h3>Витрина зелий</h3>
      </div>
      <span class="sub-badge">Готовые снадобья мастера</span>
    </div>

    <div class="potions-grid">
      <div
        v-for="potion in potions"
        :key="potion.id"
        class="potion-card"
        :class="[
          'rarity-' + (potion.rarity || 'common'),
          { available: (inventoryStore.potionInventory[potion.id] ?? 0) > 0 }
        ]"
      >
        <div class="potion-top-row">
          <div class="potion-identity">
            <div class="potion-icon-wrapper" :class="'tier-' + (potion.rarity || 'common')">
              <AlchemyIcon :name="potion.id" :size="22" class="potion-svg-icon" />
            </div>
            <div class="potion-title-group">
              <span class="potion-name">{{ potion.name }}</span>
              <span class="rarity-badge" :class="'badge-' + (potion.rarity || 'common')">
                {{ potion.rarityName || 'Обычное' }}
              </span>
            </div>
          </div>
          <span
            class="potion-count-badge"
            :class="{ 'has-stock': (inventoryStore.potionInventory[potion.id] ?? 0) > 0 }"
          >
            {{ inventoryStore.potionInventory[potion.id] ?? 0 }} шт.
          </span>
        </div>

        <p class="potion-desc">{{ potion.description }}</p>

        <div class="potion-actions">
          <button
            v-if="potion.type === 'health' || potion.type === 'mana'"
            class="btn btn-consume"
            :class="potion.type === 'health' ? 'btn-health' : 'btn-mana'"
            :disabled="
              alchemistStore.isDead ||
              !((inventoryStore.potionInventory[potion.id] ?? 0) > 0) ||
              (potion.type === 'health' && alchemistStore.hp >= alchemistStore.maxHp) ||
              (potion.type === 'mana' && alchemistStore.mp >= alchemistStore.maxMp)
            "
            @click="drinkPotion(potion)"
          >
            Выпить
          </button>
          <span v-else class="trade-only-tag">Товар на продажу</span>
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

.potions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.potion-card {
  background: rgba(26, 22, 36, 0.6);
  border: 1px solid rgba(224, 186, 117, 0.12);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.potion-card:hover {
  transform: translateY(-2px);
  border-color: rgba(224, 186, 117, 0.35);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

.potion-card.available {
  background: rgba(36, 30, 48, 0.85);
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.1);
}

.potion-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.potion-identity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.potion-icon-wrapper {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(18, 15, 24, 0.7);
  border: 1px solid rgba(224, 186, 117, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tier-common { color: #cbd5e1; }
.tier-uncommon { color: #86efac; border-color: rgba(74, 222, 128, 0.3); }
.tier-rare { color: #93c5fd; border-color: rgba(96, 165, 250, 0.3); }
.tier-epic { color: #d8b4fe; border-color: rgba(192, 132, 252, 0.3); }
.tier-legendary { color: #fde047; border-color: rgba(250, 204, 21, 0.4); }

.potion-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.potion-name {
  font-size: 0.98rem;
  font-weight: 700;
  font-family: 'El Messiri', sans-serif;
  color: #f8fafc;
}

.rarity-badge {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 5px;
  width: fit-content;
}

.badge-common { background: rgba(148, 163, 184, 0.12); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.25); }
.badge-uncommon { background: rgba(74, 222, 128, 0.12); color: #86efac; border: 1px solid rgba(74, 222, 128, 0.3); }
.badge-rare { background: rgba(96, 165, 250, 0.12); color: #93c5fd; border: 1px solid rgba(96, 165, 250, 0.3); }
.badge-epic { background: rgba(192, 132, 252, 0.12); color: #d8b4fe; border: 1px solid rgba(192, 132, 252, 0.3); }
.badge-legendary { background: rgba(250, 204, 21, 0.15); color: #fde047; border: 1px solid rgba(250, 204, 21, 0.4); }

.potion-count-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 3px 7px;
  border-radius: 6px;
  flex-shrink: 0;
}

.potion-count-badge.has-stock {
  color: #86efac;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.potion-desc {
  font-size: 0.8rem;
  color: #a1a1aa;
  margin: 0;
  line-height: 1.35;
}

.potion-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.trade-only-tag {
  font-size: 0.74rem;
  color: #d4b584;
  padding: 4px 8px;
  background: rgba(224, 186, 117, 0.1);
  border: 1px solid rgba(224, 186, 117, 0.2);
  border-radius: 6px;
}

.btn {
  padding: 6px 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'El Messiri', sans-serif;
  font-size: 0.84rem;
}

.btn-health {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  color: white;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.btn-health:hover:not(:disabled) {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  transform: translateY(-1px);
}

.btn-mana {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  border: 1px solid rgba(56, 189, 248, 0.4);
}

.btn-mana:hover:not(:disabled) {
  background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none !important;
}
</style>
