<script setup lang="ts">
import { useInventoryStore } from '../stores/inventory'
import { marketIngredients, potions } from '../data/alchemyData'
import type { Ingredient, Potion } from '../types'
import AlchemyIcon from './AlchemyIcon.vue'

const inventoryStore = useInventoryStore()

function getIngredient(id: string): Ingredient | undefined {
  return marketIngredients.find(i => i.id === id)
}

function getPotion(id: string): Potion | undefined {
  return potions.find(p => p.id === id)
}
</script>

<template>
  <div class="panel grimoire-card">
    <div class="grimoire-header">
      <div class="header-title-box">
        <AlchemyIcon name="grimoire" :size="22" class="header-icon-svg" />
        <div class="header-titles">
          <h3>Гримуар рецептов</h3>
          <span class="header-desc">Открытые формулы и тайные пропорции</span>
        </div>
      </div>
      <span class="grimoire-count">
        Изучено: {{ inventoryStore.recipes.filter(r => r.discovered).length }} / {{ inventoryStore.recipes.length }}
      </span>
    </div>

    <div class="recipes-grid">
      <div
        v-for="recipe in inventoryStore.recipes"
        :key="recipe.id"
        class="recipe-card-box"
        :class="{ discovered: recipe.discovered }"
      >
        <div class="recipe-card-top">
          <div class="recipe-title-group" :title="recipe.discovered ? getPotion(recipe.potionId)?.name : 'Запечатанная формула'">
            <span v-if="recipe.discovered" class="recipe-potion-icon">
              <AlchemyIcon :name="recipe.potionId" :size="20" class="potion-icon-svg" />
            </span>
            <span
              class="recipe-title"
              :class="{ 'title-unknown': !recipe.discovered }"
            >
              {{ recipe.discovered ? getPotion(recipe.potionId)?.name : 'Запечатанная формула' }}
            </span>
          </div>
          <span
            class="status-indicator"
            :class="recipe.discovered ? 'status-known' : 'status-hidden'"
          >
            {{ recipe.discovered ? 'Изучено' : 'Тайна' }}
          </span>
        </div>

        <div class="recipe-divider"></div>

        <div class="recipe-formula-col">
          <template v-if="recipe.discovered">
            <div
              class="ingredient-chip"
              :title="getIngredient(recipe.ingredientIds[0])?.name ?? recipe.ingredientIds[0]"
            >
              <AlchemyIcon :name="recipe.ingredientIds[0]" :size="15" class="chip-svg-icon" />
              <span class="chip-text">{{ getIngredient(recipe.ingredientIds[0])?.name ?? recipe.ingredientIds[0] }}</span>
            </div>
            <div class="plus-symbol">+</div>
            <div
              class="ingredient-chip"
              :title="getIngredient(recipe.ingredientIds[1])?.name ?? recipe.ingredientIds[1]"
            >
              <AlchemyIcon :name="recipe.ingredientIds[1]" :size="15" class="chip-svg-icon" />
              <span class="chip-text">{{ getIngredient(recipe.ingredientIds[1])?.name ?? recipe.ingredientIds[1] }}</span>
            </div>
          </template>
          <template v-else>
            <div class="unknown-chip">???</div>
            <div class="plus-symbol">+</div>
            <div class="unknown-chip">???</div>
          </template>
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

.grimoire-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.header-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon-svg {
  color: #fbbf24;
}

.header-titles {
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #fce7b2;
  font-family: 'El Messiri', sans-serif;
}

.header-desc {
  font-size: 0.8rem;
  color: #a89f91;
}

.grimoire-count {
  font-size: 0.82rem;
  font-weight: 600;
  color: #fde68a;
  background: rgba(224, 186, 117, 0.12);
  padding: 4px 10px;
  border-radius: 10px;
  border: 1px solid rgba(224, 186, 117, 0.25);
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(285px, 1fr));
  gap: 14px;
}

.recipe-card-box {
  background: rgba(26, 22, 36, 0.6);
  border: 1px solid rgba(224, 186, 117, 0.12);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.recipe-card-box:hover {
  transform: translateY(-2px);
  border-color: rgba(224, 186, 117, 0.3);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.recipe-card-box.discovered {
  border-color: rgba(168, 85, 247, 0.4);
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.15) 0%, rgba(26, 22, 36, 0.85) 100%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}

.recipe-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 38px;
  gap: 8px;
  min-width: 0;
}

.recipe-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1;
}

.recipe-potion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.potion-icon-svg {
  color: #c084fc;
}

.recipe-title {
  font-size: 1rem;
  font-weight: 700;
  font-family: 'El Messiri', sans-serif;
  color: #f8fafc;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-unknown {
  color: #71717a;
  font-size: 0.95rem;
  font-weight: 500;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-indicator {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.status-known {
  background: rgba(168, 85, 247, 0.2);
  color: #e9d5ff;
  border: 1px solid rgba(168, 85, 247, 0.4);
}

.status-hidden {
  background: rgba(255, 255, 255, 0.05);
  color: #71717a;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.recipe-divider {
  height: 1px;
  background: rgba(224, 186, 117, 0.1);
  width: 100%;
}

.recipe-card-box.discovered .recipe-divider {
  background: rgba(168, 85, 247, 0.25);
}

.recipe-formula-col {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.ingredient-chip {
  flex: 1;
  min-width: 0;
  background: rgba(18, 15, 24, 0.65);
  border: 1px solid rgba(224, 186, 117, 0.16);
  border-radius: 10px;
  padding: 6px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: 'El Messiri', sans-serif;
  box-sizing: border-box;
}

.chip-svg-icon {
  color: #fbbf24;
  flex-shrink: 0;
}

.chip-text {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unknown-chip {
  flex: 1;
  min-width: 0;
  background: rgba(0, 0, 0, 0.25);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 6px 8px;
  font-size: 0.82rem;
  color: #52525b;
  text-align: center;
  letter-spacing: 0.1em;
  box-sizing: border-box;
}

.plus-symbol {
  font-size: 1.05rem;
  font-weight: bold;
  color: #e2b755;
  user-select: none;
  flex-shrink: 0;
}
</style>
