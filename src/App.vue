<script setup>
import { useRouter } from 'vue-router'
import { useThemeStore } from './stores/theme.js'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const router = useRouter()
const themeStore = useThemeStore()

function changeView(view) {
  const routeNames = {
    home: 'home',
    results: 'locations',
    locations: 'locations',
    contact: 'contact'
  }

  const name = routeNames[view]

  if (name) {
    router.push({ name })
  }
}
</script>

<template>
  <div
    class="app-shell"
    :class="themeStore.currentThemeClass"
  >
    <AppHeader />

    <RouterView />

    <AppFooter @change-view="changeView" />
  </div>
</template>