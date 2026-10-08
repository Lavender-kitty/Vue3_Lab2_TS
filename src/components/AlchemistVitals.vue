<script setup lang="ts">
import { useAlchemistStore } from '../stores/alchemist'
import { useEconomyStore } from '../stores/economy'
import AlchemyIcon from './AlchemyIcon.vue'

const alchemistStore = useAlchemistStore()
const economyStore = useEconomyStore()
</script>

<template>
  <div class="panel vitals-card" :class="{ dead: alchemistStore.isDead }">
    <div class="panel-header">
      <h2>Состояние алхимика</h2>
      <div v-if="alchemistStore.masterRank > 0" class="badge master-badge">
        Мастер ранга {{ alchemistStore.masterRank }} (+{{ alchemistStore.masterRank * 5 }}% к ценам)
      </div>
    </div>

    <Transition name="fade-slide">
      <div v-if="alchemistStore.isDead" class="permadeath-banner">
        <div class="death-title">Алхимик тяжело ранен взрывом</div>
        <p class="death-desc">
          Синтез приостановлен. Возрождение восстановит жизненные силы и сбросит уровень к 1, сохранив открытые формулы и запасы.
        </p>
        <button class="btn btn-danger" @click="alchemistStore.revive()">
          Возродить алхимика
        </button>
      </div>

      <div v-else class="vitals-grid">
        <div class="stat-box">
          <div class="stat-label">Здоровье (HP)</div>
          <div class="stat-bar-wrapper">
            <div
              class="stat-bar hp-bar"
              :style="{ width: `${Math.max(0, Math.min(100, (alchemistStore.hp / alchemistStore.maxHp) * 100))}%` }"
            ></div>
          </div>
          <div class="stat-value">{{ alchemistStore.hp }} / {{ alchemistStore.maxHp }}</div>
        </div>

        <div class="stat-box">
          <div class="stat-label">Мана (MP)</div>
          <div class="stat-bar-wrapper">
            <div
              class="stat-bar mp-bar"
              :style="{ width: `${Math.max(0, Math.min(100, (alchemistStore.mp / alchemistStore.maxMp) * 100))}%` }"
            ></div>
          </div>
          <div class="stat-value">{{ alchemistStore.mp }} / {{ alchemistStore.maxMp }}</div>
        </div>

        <div class="stat-box">
          <div class="stat-label">Опыт (XP) — Уровень {{ alchemistStore.level }}</div>
          <div class="stat-bar-wrapper">
            <div
              class="stat-bar xp-bar"
              :style="{ width: `${Math.max(0, Math.min(100, (alchemistStore.xp / alchemistStore.xpToNextLevel) * 100))}%` }"
            ></div>
          </div>
          <div class="stat-value">{{ alchemistStore.xp }} / {{ alchemistStore.xpToNextLevel }}</div>
        </div>

        <div class="stat-box gold-box">
          <div class="stat-label">Казна лавки</div>
          <div class="gold-value">
            <AlchemyIcon name="coin" :size="24" class="gold-coin-svg" />
            <span class="gold-amount">{{ economyStore.gold }}</span>
          </div>
        </div>
      </div>
    </Transition>

    <Teleport to="body">
      <Transition name="modal-pop">
        <div v-if="alchemistStore.showLevelUpModal && !alchemistStore.isDead" class="modal-overlay">
          <div class="modal-card">
            <h3>Повышение уровня!</h3>
            <p>Выберите улучшение характеристик персонажа:</p>
            <div class="modal-actions">
              <button class="btn btn-hp" @click="alchemistStore.selectLevelBonus('hp')">
                +15 Макс. HP
              </button>
              <button class="btn btn-mp" @click="alchemistStore.selectLevelBonus('mp')">
                +15 Макс. MP
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.dead {
  border-color: rgba(239, 68, 68, 0.55);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-main, #f7fafc);
  font-family: 'El Messiri', sans-serif;
}

.badge {
  padding: 4px 12px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 600;
}

.master-badge {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fbbf24;
  letter-spacing: 0.02em;
}

.vitals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #cbd5e1;
}

.stat-bar-wrapper {
  height: 10px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-bar {
  height: 100%;
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hp-bar {
  background: linear-gradient(90deg, #b91c1c, #ef4444);
}

.mp-bar {
  background: linear-gradient(90deg, #1d4ed8, #38bdf8);
}

.xp-bar {
  background: linear-gradient(90deg, #6d28d9, #a855f7);
}

.stat-value {
  font-size: 0.85rem;
  font-family: 'Kelly Slab', monospace;
  text-align: right;
  color: #e2e8f0;
}

.gold-box {
  justify-content: center;
}

.gold-value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gold-coin-svg {
  color: #fde047;
  filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.4));
}

.gold-amount {
  font-family: 'El Messiri', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #fde047;
  text-shadow: 0 0 10px rgba(250, 204, 21, 0.25);
  letter-spacing: 0.02em;
}

.permadeath-banner {
  background: rgba(220, 38, 38, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.death-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fca5a5;
  margin-bottom: 8px;
  font-family: 'El Messiri', sans-serif;
}

.death-desc {
  font-size: 0.9rem;
  color: #fecaca;
  margin-bottom: 14px;
  line-height: 1.4;
}

.btn {
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'El Messiri', sans-serif;
}

.btn-danger {
  background: #dc2626;
  color: white;
}

.btn-danger:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal-card {
  background: #16131f;
  border: 1px solid rgba(224, 186, 117, 0.35);
  border-radius: 10px;
  padding: 28px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  position: relative;
}

.modal-card::before,
.modal-card::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  pointer-events: none;
}

.modal-card::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(224, 186, 117, 0.45);
  border-left: 2px solid rgba(224, 186, 117, 0.45);
  border-top-left-radius: 10px;
}

.modal-card::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid rgba(224, 186, 117, 0.45);
  border-right: 2px solid rgba(224, 186, 117, 0.45);
  border-bottom-right-radius: 10px;
}

.modal-card h3 {
  font-family: 'El Messiri', sans-serif;
  margin-top: 0;
  font-size: 1.45rem;
  color: #e9d5ff;
}

.modal-card p {
  font-size: 0.92rem;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  justify-content: center;
}

.btn-hp {
  background: #dc2626;
  color: white;
}

.btn-hp:hover {
  background: #b91c1c;
  transform: translateY(-2px);
}

.btn-mp {
  background: #2563eb;
  color: white;
}

.btn-mp:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-pop-leave-active {
  transition: all 0.2s ease-in;
}

.modal-pop-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(-15px);
}

.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
