import { defineStore } from 'pinia'

// counter 唯一的 name
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 800
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
