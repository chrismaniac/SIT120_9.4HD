<script setup>
import { useRouter } from 'vue-router'
import HomeView from './HomeView.vue'

const router = useRouter()

function handleSearch(query) {
  router.push({
    name: 'locations',
    query: { q: query }
  })
}
</script>

<template>
  <HomeView @search="handleSearch" />
</template>