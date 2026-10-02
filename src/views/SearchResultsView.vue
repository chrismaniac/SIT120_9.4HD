<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { locations } from '../data/locations.js'
import { useFavouritesStore } from '../stores/favourites.js'

const favouritesStore = useFavouritesStore()
const props = defineProps({
  query: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'view-details'])

const searchTerm = ref(props.query)

watch(
  () => props.query,
  (newQuery) => {
    searchTerm.value = newQuery
  }
)

const filters = reactive({
  ramp: false,
  lift: false,
  toilet: false,
  parking: false,
  doors: false
})

const featureOptions = [
  { key: 'ramp', label: 'Wheelchair Ramp' },
  { key: 'lift', label: 'Lift Access' },
  { key: 'toilet', label: 'Accessible Toilet' },
  { key: 'parking', label: 'Disability Parking' },
  { key: 'doors', label: 'Automatic Doors' }
]

const baseUrl = import.meta.env.BASE_URL

// Filter by search term and selected accessibility features
const filteredLocations = computed(() => {
  const term = props.query.trim().toLowerCase()

  return locations.filter(location => {
    const searchableText = [
      location.name,
      location.suburb,
      location.postcode,
      location.category
    ].join(' ').toLowerCase()

    const matchesSearch =
      !term || searchableText.includes(term)

    const matchesFilters = featureOptions.every(feature => {
      return !filters[feature.key] ||
        location.features[feature.key]
    })

    return matchesSearch && matchesFilters
  })
})

function handleSearch() {
  emit('search', searchTerm.value.trim())
}

function clearFilters() {
  Object.keys(filters).forEach(key => {
    filters[key] = false
  })
}

function viewDetails(location) {
  emit('view-details', location)
}
</script>

<template>
  <main>

    <!-- PAGE HEADER -->
    <section class="results-banner">
      <div class="container">

        <h1>Find Accessible Locations</h1>

        <p>
          Explore example locations and filter by the
          accessibility facilities you need.
        </p>

        <form
          class="search-form"
          role="search"
          @submit.prevent="handleSearch"
        >
          <label for="locationSearch" class="visually-hidden">
            Search by suburb, postcode or building name
          </label>

          <input
            id="locationSearch"
            v-model="searchTerm"
            type="search"
            placeholder="Search suburb, postcode or building name"
          >

          <button type="submit" class="btn btn-primary">
            Search Locations
          </button>
        </form>

      </div>
    </section>


    <!-- FILTERS -->
    <section class="section">
      <div class="container">

        <div class="filter-panel">

          <h2>Filter by Accessibility Features</h2>

          <p>
            Select the facilities you require.
            Locations must match all selected filters.
          </p>

          <div class="filter-grid">

            <label
              v-for="feature in featureOptions"
              :key="feature.key"
              class="filter-option"
            >
              <input
                v-model="filters[feature.key]"
                type="checkbox"
              >

              <span>{{ feature.label }}</span>
            </label>

          </div>

          <button
            type="button"
            class="btn btn-outline"
            @click="clearFilters"
          >
            Clear Filters
          </button>

        </div>


        <!-- RESULTS HEADING -->
        <div class="results-heading">

          <h2>Search Results</h2>

          <p role="status" aria-live="polite">
            {{ filteredLocations.length }}
            {{
              filteredLocations.length === 1
                ? 'location found'
                : 'locations found'
            }}
          </p>

        </div>


        <!-- LOCATION CARDS -->
        <div
          v-if="filteredLocations.length > 0"
          class="locations-grid"
        >

          <article
            v-for="location in filteredLocations"
            :key="location.id"
            class="location-card"
          >

            <img
              :src="`${baseUrl}images/${location.image}`"
              :alt="`Illustrative image for ${location.category}`"
              class="location-image"
            >

            <div class="location-content">

              <span class="location-category">
                {{ location.category }}
              </span>

              <h3>{{ location.name }}</h3>

              <p>
                {{ location.suburb }},
                {{ location.postcode }}
              </p>

              <h4>Accessibility Features</h4>

              <ul class="accessibility-list">

                <li
                  v-for="feature in featureOptions"
                  :key="feature.key"
                >
                  <span
                    :class="
                      location.features[feature.key]
                        ? 'feature-yes'
                        : 'feature-no'
                    "
                  >
                    {{
                      location.features[feature.key]
                        ? '✓'
                        : '✗'
                    }}
                  </span>

                  {{ feature.label }}:

                  {{
                    location.features[feature.key]
                      ? 'Listed as available'
                      : 'Not listed as available'
                  }}
                </li>

              </ul>

              <button
                type="button"
                class="btn btn-primary"
                @click="viewDetails(location)"
              >
                View Details
              </button>
              <button type="button" class="btn btn-outline favourite-button"  :aria-pressed="favouritesStore.isFavourite(location.id)"
  @click="favouritesStore.isFavourite(location.id)
    ? favouritesStore.removeItem(location.id)
    : favouritesStore.addItem(location)"
>
  {{
    favouritesStore.isFavourite(location.id)
      ? '♥ Remove from Favourites'
      : '♡ Save to Favourites'
  }}
</button>

            </div>

          </article>

        </div>


        <!-- NO MATCHES -->
        <div v-else class="no-results">

          <h3>No Matching Locations</h3>

          <p>
            Try another suburb or change your
            accessibility filters.
          </p>

          <button
            type="button"
            class="btn btn-primary"
            @click="clearFilters"
          >
            Clear Filters
          </button>

        </div>

        <p class="data-disclaimer">
          Demonstration only: All location names and accessibility
          information are fictional. These records must not be
          used to plan actual accessibility-dependent visits.
        </p>

      </div>
    </section>

  </main>
</template>