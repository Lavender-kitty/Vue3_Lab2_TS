import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useToastStore } from './toast'
import type { AlchemistStats } from '../types'

export const useAlchemistStore = defineStore('alchemist', () => {
  const hp = ref<number>(100)
  const maxHp = ref<number>(100)
  const mp = ref<number>(100)
  const maxMp = ref<number>(100)
  const level = ref<number>(1)
  const xp = ref<number>(0)
  const xpToNextLevel = ref<number>(100)
  const masterRank = ref<number>(0)
  const isDead = ref<boolean>(false)
  const showLevelUpModal = ref<boolean>(false)

  const toastStore = useToastStore()

  function takeDamage(amount: number): boolean {
    hp.value = Math.max(0, hp.value - amount)
    if (hp.value <= 0) {
      isDead.value = true
      return true
    }
    return false
  }

  function heal(amount: number) {
    if (isDead.value) return
    hp.value = Math.min(maxHp.value, hp.value + amount)
  }

  function restoreMp(amount: number) {
    if (isDead.value) return
    mp.value = Math.min(maxMp.value, mp.value + amount)
  }

  function spendMp(amount: number): boolean {
    if (isDead.value || mp.value < amount) return false
    mp.value -= amount
    return true
  }

  function gainXp(amount: number) {
    xp.value += amount

    if (xp.value >= xpToNextLevel.value) {
      level.value++
      xp.value -= xpToNextLevel.value
      xpToNextLevel.value = Math.round(xpToNextLevel.value * 1.4)

      if (level.value % 5 === 0) {
        masterRank.value++
        toastStore.showToast(
          'Ранг мастера!',
          `Достигнут ранг ${masterRank.value}! Цены на зелья выросли на 5%.`,
          'gold'
        )
      } else {
        showLevelUpModal.value = true
        toastStore.showToast(
          'Новый уровень!',
          `Получен ${level.value}-й уровень алхимика!`,
          'gold'
        )
      }
    }
  }

  function selectLevelBonus(stat: 'hp' | 'mp') {
    if (stat === 'hp') {
      maxHp.value += 15
      hp.value = maxHp.value
      toastStore.showToast('Улучшение', 'Максимальный запас HP повышен на 15.', 'success')
    } else {
      maxMp.value += 15
      mp.value = maxMp.value
      toastStore.showToast('Улучшение', 'Максимальный запас MP повышен на 15.', 'success')
    }
    showLevelUpModal.value = false
  }

  function revive() {
    level.value = 1
    xp.value = 0
    xpToNextLevel.value = 100
    masterRank.value = 0
    maxHp.value = 100
    maxMp.value = 100
    hp.value = 100
    mp.value = 100
    isDead.value = false
    showLevelUpModal.value = false
    toastStore.showToast(
      'Возрождение',
      'Алхимик исцелен. Базовые характеристики сброшены к 1 уровню.',
      'info'
    )
  }

  function resetAlchemist() {
    hp.value = 100
    maxHp.value = 100
    mp.value = 100
    maxMp.value = 100
    level.value = 1
    xp.value = 0
    xpToNextLevel.value = 100
    masterRank.value = 0
    isDead.value = false
    showLevelUpModal.value = false
  }

  function exportStats(gold: number): AlchemistStats {
    return {
      hp: hp.value,
      maxHp: maxHp.value,
      mp: mp.value,
      maxMp: maxMp.value,
      gold,
      level: level.value,
      xp: xp.value,
      xpToNextLevel: xpToNextLevel.value,
      masterRank: masterRank.value,
      isDead: isDead.value
    }
  }

  function loadStats(stats: Partial<AlchemistStats>) {
    if (stats.hp !== undefined) hp.value = stats.hp
    if (stats.maxHp !== undefined) maxHp.value = stats.maxHp
    if (stats.mp !== undefined) mp.value = stats.mp
    if (stats.maxMp !== undefined) maxMp.value = stats.maxMp
    if (stats.level !== undefined) level.value = stats.level
    if (stats.xp !== undefined) xp.value = stats.xp
    if (stats.xpToNextLevel !== undefined) xpToNextLevel.value = stats.xpToNextLevel
    if (stats.masterRank !== undefined) masterRank.value = stats.masterRank
    if (stats.isDead !== undefined) isDead.value = stats.isDead
  }

  return {
    hp,
    maxHp,
    mp,
    maxMp,
    level,
    xp,
    xpToNextLevel,
    masterRank,
    isDead,
    showLevelUpModal,
    takeDamage,
    heal,
    restoreMp,
    spendMp,
    gainXp,
    selectLevelBonus,
    revive,
    resetAlchemist,
    exportStats,
    loadStats
  }
})
