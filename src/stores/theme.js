import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),

  getters: {
    currentThemeClass: (state) =>
      state.isDarkMode ? 'dark-theme' : 'light-theme'
  },

  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    }
  }
})