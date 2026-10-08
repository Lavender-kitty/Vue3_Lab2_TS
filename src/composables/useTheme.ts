import { ref, watch } from 'vue'

const THEME_STORAGE_KEY = 'alchemist_theme_transparent'

export function useTheme() {
  const isZenDetected = ref(false)

  function getInitialTheme(): boolean {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved !== null) {
        return saved === 'true'
      }
      const ua = navigator.userAgent.toLowerCase()
      if (ua.includes('zen') || ua.includes('zen-browser')) {
        isZenDetected.value = true
        return true
      }
    } catch {}
    return false
  }

  const transparentMode = ref<boolean>(getInitialTheme())

  function toggleTransparent() {
    transparentMode.value = !transparentMode.value
  }

  watch(
    transparentMode,
    (enabled) => {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, String(enabled))
      } catch {}

      if (enabled) {
        document.documentElement.classList.add('page-transparent')
        document.body.classList.add('page-transparent')
      } else {
        document.documentElement.classList.remove('page-transparent')
        document.body.classList.remove('page-transparent')
      }
    },
    { immediate: true }
  )

  return {
    transparentMode,
    isZenDetected,
    toggleTransparent
  }
}
