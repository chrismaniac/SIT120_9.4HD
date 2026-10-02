import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  // STATE
  state: () => ({
    savedLocations: []
  }),

  // GETTERS
  getters: {
    totalCount: (state) => state.savedLocations.length,

    formattedSummary: (state) => {
      const count = state.savedLocations.length

      return count === 1
        ? '1 saved location'
        : `${count} saved locations`
    }
  },

  // ACTIONS
  actions: {
    addItem(location) {
      if (!location || location.id == null) return

      const alreadySaved = this.savedLocations.some(
        item => String(item.id) === String(location.id)
      )

      if (!alreadySaved) {
        this.savedLocations.push({ ...location })
      }
    },

    removeItem(locationId) {
      this.savedLocations = this.savedLocations.filter(
        item => String(item.id) !== String(locationId)
      )
    },

    resetStore() {
      this.savedLocations = []
    },

    isFavourite(locationId) {
      return this.savedLocations.some(
        item => String(item.id) === String(locationId)
      )
    }
  }
})