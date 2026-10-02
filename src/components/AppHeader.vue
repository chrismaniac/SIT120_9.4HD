<script setup>
import { useThemeStore } from '../stores/theme.js'
import { useFavouritesStore } from '../stores/favourites.js'

const themeStore = useThemeStore()
const favouritesStore = useFavouritesStore()
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">

      <RouterLink to="/" class="logo">
        AccessNearby
      </RouterLink>

      <nav class="site-nav" aria-label="Main navigation">

        <RouterLink to="/" class="nav-link">
          Home
        </RouterLink>

        <RouterLink to="/locations" class="nav-link">
          Locations
        </RouterLink>

        <RouterLink to="/contact" class="nav-link">
          Contact & Feedback
        </RouterLink>

        <RouterLink
          to="/locations"
          class="favourites-badge"
          :aria-label="favouritesStore.formattedSummary + '. View saved locations'"
        >
          ♥ Favourites: {{ favouritesStore.totalCount }}
        </RouterLink>

        <button
          type="button"
          class="theme-toggle"
          :aria-pressed="themeStore.isDarkMode"
          @click="themeStore.toggleDarkMode()"
        >
          {{ themeStore.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
        </button>

      </nav>

    </div>
  </header>
</template>