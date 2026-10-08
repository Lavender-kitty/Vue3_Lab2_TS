import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Customer } from '../types'

export const useCustomerStore = defineStore('customer', () => {
  const currentCustomer = ref<Customer | null>(null)

  function setCustomer(customer: Customer | null) {
    currentCustomer.value = customer
  }

  function resetCustomer() {
    currentCustomer.value = null
  }

  return {
    currentCustomer,
    setCustomer,
    resetCustomer
  }
})
