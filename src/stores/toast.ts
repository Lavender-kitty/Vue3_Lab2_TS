import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ToastPopup {
  id: number
  title: string
  message: string
  type: 'success' | 'danger' | 'gold' | 'info'
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastPopup[]>([])
  let toastCounter = 1

  function showToast(
    title: string,
    message: string,
    type: 'success' | 'danger' | 'gold' | 'info' = 'info'
  ) {
    const id = toastCounter++
    toasts.value.push({ id, title, message, type })
    setTimeout(() => {
      dismissToast(id)
    }, 3600)
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    showToast,
    dismissToast
  }
})
