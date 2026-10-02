<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LocationDetailsView from './LocationDetailsView.vue'
import { locations } from '../data/locations.js'

const route = useRoute()
const router = useRouter()

const selectedLocation = computed(() =>
  locations.find(
    item => String(item.id) === String(route.params.id)
  ) || null
)

function backToResults() {
  router.push({
    name: 'locations',
    query: { q: String(route.query.q || '') }
  })
}

function reportIssue(location) {
  router.push({
    name: 'contact',
    query: { location: location.name }
  })
}
</script>

<template>
  <LocationDetailsView
    :location="selectedLocation"
    @back-to-results="backToResults"
    @report-issue="reportIssue"
  />
</template>