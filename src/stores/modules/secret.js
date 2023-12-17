import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSecretStore = defineStore('secret', () => {
  const secretInfo = ref([
    { id: 1, detail: '取件码: 3-3-3' },
    { id: 2, detail: '联系方式: 15594672569' },
    { id: 3, detail: '联系方式: 15594672569' },
    { id: 4, detail: '联系方式: 15594672569' }
  ])

  const add = (val) => {
    secretInfo.value.push(val)
  }

  return {
    secretInfo,
    add
  }
})
