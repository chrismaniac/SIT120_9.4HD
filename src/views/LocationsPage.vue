<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavouritesStore } from '../stores/favourites.js'
import SearchResultsView from './SearchResultsView.vue'

const route = useRoute()
const router = useRouter()
const favouritesStore = useFavouritesStore()

const searchQuery = computed(() =>
  String(route.query.q || '')
)

function handleSearch(query) {
  router.push({
    name: 'locations',
    query: { q: query }
  })
}

function handleViewDetails(location) {
  router.push({
    name: 'details',
    params: { id: String(location.id) },
    query: { q: searchQuery.value }
  })
}

function openFavourite(location) {
  handleViewDetails(location)
}
</script>

<template>
  <SearchResultsView
    :query="searchQuery"
    @search="handleSearch"
    @view-details="handleViewDetails"
  />

  <section
    class="section favourites-section"
    aria-labelledby="favourites-heading"
  >
    <div class="container">

      <div class="favourites-summary">

        <div class="favourites-heading">
          <div>
            <h2 id="favourites-heading">
              My Saved Locations
            </h2>

            <p aria-live="polite">
              {{ favouritesStore.formattedSummary }}
            </p>
          </div>

          <button
            v-if="favouritesStore.totalCount > 0"
            type="button"
            class="btn btn-outline"
            @click="favouritesStore.resetStore()"
          >
            Clear All
          </button>
        </div>

        <p v-if="favouritesStore.totalCount === 0">
          You haven't saved any locations yet.
          Use the Save to Favourites buttons above
          to build your list.
        </p>

        <div v-else class="saved-locations-grid">

          <article
            v-for="location in favouritesStore.savedLocations"
            :key="location.id"
            class="saved-location-card"
          >
            <h3>{{ location.name }}</h3>

            <p>
              {{ location.suburb }}
              {{ location.postcode }}
            </p>

            <div class="saved-actions">
              <button
                type="button"
                class="btn btn-primary"
                @click="openFavourite(location)"
              >
                View Details
              </button>

              <button
                type="button"
                class="btn btn-outline"
                @click="favouritesStore.removeItem(location.id)"
              >
                Remove
              </button>
            </div>

          </article>

        </div>

        <p class="data-disclaimer">
          Saved locations are demonstration data.
          Favourites are retained only while this
          application session is running.
        </p>

      </div>
    </div>
  </section>
</template>