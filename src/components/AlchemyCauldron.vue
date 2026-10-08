<script setup lang="ts">
import { useCauldronStore } from '../stores/cauldron'
import { useAlchemistStore } from '../stores/alchemist'
import { useBrewing } from '../composables/useBrewing'
import AlchemyIcon from './AlchemyIcon.vue'

const cauldronStore = useCauldronStore()
const alchemistStore = useAlchemistStore()
const { removeFromSlot, brew } = useBrewing()
</script>

<template>
  <div class="panel cauldron-panel" :class="{ 'cauldron-ready': cauldronStore.slot1 && cauldronStore.slot2 }">
    <div class="card-header">
      <div class="title-with-icon">
        <AlchemyIcon name="cauldron" :size="22" class="header-icon-svg" />
        <h3>Котел синтеза</h3>
      </div>
      <span class="cost-badge">Расход: 15 MP</span>
    </div>

    <p class="card-hint">Выберите ингредиенты из кладовой, чтобы поместить в слоты</p>

    <div class="slots-row">
      <div
        class="slot-box"
        :class="[
          { filled: cauldronStore.slot1 !== null },
          cauldronStore.slot1 ? 'rarity-' + (cauldronStore.slot1.rarity || 'common') : ''
        ]"
        :title="cauldronStore.slot1 ? 'Кликните, чтобы вернуть ингредиент в запасы' : 'Пустой слот'"
        @click="cauldronStore.slot1 && removeFromSlot(1)"
      >
        <span class="slot-tag">Компонент I</span>
        <div v-if="cauldronStore.slot1" class="slot-filled-content">
          <AlchemyIcon :name="cauldronStore.slot1.id" :size="26" class="slot-svg-icon" />
          <span class="filled-name">{{ cauldronStore.slot1.name }}</span>
          <span class="filled-action">Клик — убрать</span>
        </div>
        <div v-else class="slot-empty-content">
          <span class="empty-plus">+</span>
          <span class="empty-label">Пустой слот</span>
        </div>
      </div>

      <div class="slots-separator">✦</div>

      <div
        class="slot-box"
        :class="[
          { filled: cauldronStore.slot2 !== null },
          cauldronStore.slot2 ? 'rarity-' + (cauldronStore.slot2.rarity || 'common') : ''
        ]"
        :title="cauldronStore.slot2 ? 'Кликните, чтобы вернуть ингредиент в запасы' : 'Пустой слот'"
        @click="cauldronStore.slot2 && removeFromSlot(2)"
      >
        <span class="slot-tag">Компонент II</span>
        <div v-if="cauldronStore.slot2" class="slot-filled-content">
          <AlchemyIcon :name="cauldronStore.slot2.id" :size="26" class="slot-svg-icon" />
          <span class="filled-name">{{ cauldronStore.slot2.name }}</span>
          <span class="filled-action">Клик — убрать</span>
        </div>
        <div v-else class="slot-empty-content">
          <span class="empty-plus">+</span>
          <span class="empty-label">Пустой слот</span>
        </div>
      </div>
    </div>

    <button
      class="btn btn-brew"
      :class="{ 'btn-ready-pulse': cauldronStore.slot1 && cauldronStore.slot2 && alchemistStore.mp >= 15 && !alchemistStore.isDead }"
      :disabled="!cauldronStore.slot1 || !cauldronStore.slot2 || alchemistStore.mp < 15 || alchemistStore.isDead"
      @click="brew"
    >
      <AlchemyIcon name="cauldron" :size="18" />
      <span v-if="cauldronStore.slot1 && cauldronStore.slot2">Сварить зелье</span>
      <span v-else>Заполните оба слота котла</span>
    </button>

    <Transition name="fade-res">
      <div
        v-if="cauldronStore.lastResult"
        class="result-message"
        :class="cauldronStore.lastResult.success ? 'result-success' : 'result-danger'"
      >
        {{ cauldronStore.lastResult.message }}
      </div>
    </Transition>
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
  gap: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
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

.panel.cauldron-ready {
  border-color: rgba(168, 85, 247, 0.45);
  box-shadow: 0 8px 28px rgba(147, 51, 234, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.card-hint {
  margin: -6px 0 0 0;
  font-size: 0.8rem;
  color: #a89f91;
}

.cost-badge {
  font-size: 0.78rem;
  background: rgba(147, 51, 234, 0.15);
  color: #d8b4fe;
  border: 1px solid rgba(168, 85, 247, 0.35);
  padding: 3px 10px;
  border-radius: 10px;
  font-weight: 600;
}

.slots-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.slot-box {
  flex: 1;
  min-height: 96px;
  background: rgba(18, 15, 24, 0.6);
  border: 1px dashed rgba(224, 186, 117, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slot-box:hover {
  transform: translateY(-2px);
  border-color: rgba(224, 186, 117, 0.5);
  background: rgba(28, 24, 38, 0.8);
}

.slot-box.filled {
  border-style: solid;
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(48, 30, 70, 0.35);
  box-shadow: 0 4px 14px rgba(147, 51, 234, 0.15);
}

.slot-tag {
  font-size: 0.68rem;
  text-transform: uppercase;
  color: #a89f91;
  letter-spacing: 0.04em;
  margin-bottom: 2px;
}

.slot-empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.empty-plus {
  font-size: 1.4rem;
  color: #71717a;
  line-height: 1;
}

.empty-label {
  font-size: 0.78rem;
  color: #a1a1aa;
}

.slot-filled-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2px;
}

.slot-svg-icon {
  color: #e2b755;
  filter: drop-shadow(0 0 4px rgba(226, 183, 85, 0.3));
}

.filled-name {
  font-size: 0.98rem;
  font-weight: 700;
  font-family: 'El Messiri', sans-serif;
  color: #f8fafc;
}

.filled-action {
  font-size: 0.68rem;
  color: #d8b4fe;
}

.slots-separator {
  font-size: 1.2rem;
  color: #e2b755;
  user-select: none;
}

.btn {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'El Messiri', sans-serif;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-brew {
  width: 100%;
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  color: white;
  border: 1px solid rgba(168, 85, 247, 0.4);
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
}

.btn-brew:hover:not(:disabled) {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
}

.btn-ready-pulse {
  animation: pulseBrew 2s infinite ease-in-out;
}

@keyframes pulseBrew {
  0%, 100% {
    box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
  }
  50% {
    box-shadow: 0 6px 24px rgba(168, 85, 247, 0.65);
  }
}

.btn-brew:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
  transform: none !important;
}

.result-message {
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.88rem;
  text-align: center;
  line-height: 1.35;
  font-family: 'El Messiri', sans-serif;
}

.result-success {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.5);
  color: #6ee7b7;
}

.result-danger {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.5);
  color: #fca5a5;
}

.fade-res-enter-active,
.fade-res-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-res-enter-from,
.fade-res-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
