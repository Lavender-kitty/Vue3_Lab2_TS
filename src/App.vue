<script setup lang="ts">

import { useToastStore } from './stores/toast'
import { useTheme } from './composables/useTheme'
import { useGamePersistence } from './composables/useGamePersistence'

import AlchemistVitals from './components/AlchemistVitals.vue'
import MarketPantry from './components/MarketPantry.vue'
import AlchemyCauldron from './components/AlchemyCauldron.vue'
import PotionShowcase from './components/PotionShowcase.vue'
import CustomerQueue from './components/CustomerQueue.vue'
import RecipeGrimoire from './components/RecipeGrimoire.vue'

const baseUrl = import.meta.env.BASE_URL

const toastStore = useToastStore()
const { transparentMode } = useTheme()
const { resetAll } = useGamePersistence()
</script>

<template>
  <div class="app-layout" :class="{ 'page-transparent': transparentMode }">
    <!-- Стек уведомлений -->
    <div class="toast-stack">
      <TransitionGroup name="toast-anim">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="toast-popup"
          :class="`toast-${toast.type}`"
          @click="toastStore.dismissToast(toast.id)"
        >
          <div class="toast-body">
            <div class="toast-title">{{ toast.title }}</div>
            <div class="toast-desc">{{ toast.message }}</div>
          </div>
          <button class="toast-close" @click.stop="toastStore.dismissToast(toast.id)">✕</button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Заголовок и панель управления -->
    <header class="app-header">
      <div class="header-main">
        <h1>Лавка алхимика</h1>
        <p class="subtitle">Синтез зелий, торговля и опыт мастера</p>
      </div>
      <div class="header-controls">
        <button
          class="ctrl-btn ctrl-theme"
          :class="{ active: transparentMode }"
          title="Режим прозрачности для Zen Browser"
          @click="transparentMode = !transparentMode"
        >
          <span class="ctrl-icon">{{ transparentMode ? '✧' : '✦' }}</span>
          <span>Прозрачность для Zen</span>
        </button>
        <button
          class="ctrl-btn ctrl-reset"
          title="Начать новую смену и очистить лавку"
          @click="resetAll"
        >
          <span class="ctrl-icon">↺</span>
          <span>Новая смена</span>
        </button>
      </div>
    </header>

    <main class="main-content">
      <section class="section-vitals">
        <AlchemistVitals />
      </section>

      <div class="workspace-grid">
        <div class="col-left">
          <MarketPantry />

          <div class="panel pashalka-panel">
            <div class="pashalka-frame">
              <div class="pashalka">
                <img :src="`${baseUrl}ne_baluysya.webp`" alt="Не балуйся" class="pashalka-img"/>
              </div>
            </div>
          </div>
        </div>

        <div class="col-right">
          <AlchemyCauldron />
          <CustomerQueue />
          <PotionShowcase />
        </div>
      </div>

      <section class="section-grimoire">
        <RecipeGrimoire />
      </section>
    </main>
  </div>
</template>
<style>
:root {
  --bg-main: #121017;
  --card-bg: rgba(22, 19, 31, 0.88);
  --border-color: rgba(224, 186, 117, 0.16);
  --border-radius: 10px;
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-main, #121017);
  color: #f8fafc;
  font-family: 'El Messiri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  letter-spacing: 0.01em;
  transition: background-color 0.25s ease;
}

html.page-transparent,
body.page-transparent,
html.page-transparent body,
html.page-transparent #app {
  background-color: transparent !important;
  background: transparent !important;
  background-image: none !important;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  padding: 24px 20px 40px;
  max-width: 1240px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
}

.app-layout.page-transparent {
  background: transparent !important;
}

/* Стек уведомлений */
.toast-stack {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 380px;
  pointer-events: none;
}

.toast-popup {
  pointer-events: auto;
  background: rgba(15, 23, 42, 0.94);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.toast-popup:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.55);
}

.toast-success {
  border: 1px solid rgba(16, 185, 129, 0.55);
}

.toast-danger {
  border: 1px solid rgba(239, 68, 68, 0.55);
}

.toast-gold {
  border: 1px solid rgba(245, 158, 11, 0.55);
}

.toast-info {
  border: 1px solid rgba(56, 189, 248, 0.55);
}

.toast-body {
  flex: 1;
}

.toast-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #f8fafc;
  font-family: 'El Messiri', sans-serif;
  margin-bottom: 2px;
}

.toast-desc {
  font-size: 0.8rem;
  color: #94a3b8;
  line-height: 1.35;
}

.toast-close {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.88rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
}

.toast-close:hover {
  color: #f1f5f9;
}

.toast-anim-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-anim-leave-active {
  transition: all 0.2s ease-in;
}

.toast-anim-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.92);
}

.toast-anim-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.92);
}

/* Шапка */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(224, 186, 117, 0.16);
}

h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #fce7b2;
  font-family: 'El Messiri', sans-serif;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 0.92rem;
  color: #b8aba0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ctrl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'El Messiri', sans-serif;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid rgba(224, 186, 117, 0.2);
  background: rgba(26, 22, 36, 0.75);
  color: #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
}

.ctrl-btn:hover {
  background: rgba(38, 32, 54, 0.9);
  border-color: rgba(224, 186, 117, 0.45);
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
}

.ctrl-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.ctrl-btn.active {
  background: rgba(224, 186, 117, 0.16);
  border-color: rgba(224, 186, 117, 0.55);
  color: #fde68a;
}

.ctrl-icon {
  font-size: 0.95rem;
  line-height: 1;
}

/* Сетка интерфейса */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.section-vitals,
.section-grimoire {
  width: 100%;
}

.workspace-grid {
  display: flex;
  gap: 18px;
  align-items: stretch;
}

.col-left,
.col-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.pashalka-panel {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--card-bg, rgba(22, 19, 31, 0.88));
  border: 1px solid var(--border-color, rgba(224, 186, 117, 0.16));
  border-radius: 10px;
  padding: 16px;
  box-sizing: border-box;
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.pashalka-panel::before,
.pashalka-panel::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  pointer-events: none;
}

.pashalka-panel::before {
  top: -1px;
  left: -1px;
  border-top: 2px solid rgba(224, 186, 117, 0.45);
  border-left: 2px solid rgba(224, 186, 117, 0.45);
  border-top-left-radius: 10px;
}

.pashalka-panel::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid rgba(224, 186, 117, 0.45);
  border-right: 2px solid rgba(224, 186, 117, 0.45);
  border-bottom-right-radius: 10px;
}

.pashalka-panel:hover {
  border-color: rgba(224, 186, 117, 0.3);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
}

.pashalka-frame {
  width: 100%;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  background: rgba(12, 10, 18, 0.6);
  border: 1px solid rgba(224, 186, 117, 0.12);
  border-radius: 10px;
  padding: 0;
  display: flex;
  overflow: hidden;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.pashalka {
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
  position: relative;
}

.pashalka-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: fill;
  transform: scale(1.07);
  transform-origin: center;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (max-width: 900px) {
  .workspace-grid {
    flex-direction: column;
  }

  .pashalka-panel {
    min-height: 420px;
  }
}
</style>
