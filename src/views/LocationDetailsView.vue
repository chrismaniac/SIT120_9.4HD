<script setup>
import { computed } from 'vue'

const props = defineProps({
  location: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'back-to-results',
  'report-issue'
])

const baseUrl = import.meta.env.BASE_URL

const features = [
  { key: 'ramp', label: 'Wheelchair Ramp' },
  { key: 'lift', label: 'Lift Access' },
  { key: 'toilet', label: 'Accessible Toilet' },
  { key: 'parking', label: 'Disability Parking' },
  { key: 'doors', label: 'Automatic Doors' }
]

const featureCount = computed(() => {
  if (!props.location) return 0

  return features.filter(
    feature => props.location.features?.[feature.key]
  ).length
})

function getDirections() {
  if (!props.location) return

  // Search for the suburb, not a fictional street address.
  const destination = encodeURIComponent(
    props.location.address ||
    `${props.location.suburb} QLD ${props.location.postcode}`
  )

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${destination}`,
    '_blank',
    'noopener,noreferrer'
  )
}
</script>

<template>
  <main class="section">
    <div class="container">

      <div v-if="location">

        <div class="details-heading">
          <span class="location-category">
            {{ location.category }}
          </span>

          <h1>{{ location.name }}</h1>

          <p>
            {{ location.address || location.suburb }}
          </p>
        </div>

        <!-- Image and information -->
        <div class="details-grid">

          <div>
            <img
              :src="`${baseUrl}images/${location.image}`"
              :alt="`Illustrative accessibility photograph for ${location.category}`"
              class="details-image"
            >

            <p class="image-note">
              Illustrative photograph. This is not
              a verified image of the example location.
            </p>
          </div>

        <section class="details-info">

  <h2>Location Information</h2>

  <dl class="details-list">

    <div class="detail-row">
      <dt>Address</dt>
      <dd>
        {{ location.address || location.suburb }}
      </dd>
    </div>

    <div class="detail-row">
      <dt>Opening Hours</dt>
      <dd>
        {{ location.hours || 'Not supplied' }}
        <span class="demo-label">(Example only)</span>
      </dd>
    </div>

    <div class="detail-row">
      <dt>Accessibility Rating</dt>
      <dd>
        {{ location.rating || 'Not supplied' }}
        <span class="demo-label">(Illustrative)</span>
      </dd>
    </div>

    <div class="detail-row">
      <dt>Features Listed</dt>
      <dd>
        {{ featureCount }} of {{ features.length }}
      </dd>
    </div>

  </dl>

</section>

        </div>

        <!-- Accessibility checklist -->
        <section class="accessibility-details">

          <h2>Accessibility Checklist</h2>

          <p>
            Review the facilities listed for this
            demonstration location.
          </p>

          <ul class="details-feature-list">

            <li
              v-for="feature in features"
              :key="feature.key"
              class="details-feature"
            >
              <span aria-hidden="true">
                {{
                  location.features?.[feature.key]
                    ? '✓'
                    : '✗'
                }}
              </span>

              <span>
                <strong>{{ feature.label }}:</strong>

                {{
                  location.features?.[feature.key]
                    ? 'Listed as available'
                    : 'Not listed as available'
                }}
              </span>
            </li>

          </ul>

        </section>

        <!-- Call-to-action buttons -->
        <section class="details-actions">

          <h2>Plan Your Visit</h2>

          <p>
            These locations are fictional examples.
            Directions open a suburb-level map search,
            not directions to a verified venue.
          </p>

          <div class="action-buttons">

            <button
              type="button"
              class="btn btn-primary"
              @click="getDirections"
            >
              Get Directions (Suburb Demo)
            </button>

            <button
              type="button"
              class="btn btn-outline"
              @click="emit('back-to-results')"
            >
              Back to Results
            </button>

            <button
              type="button"
              class="btn btn-outline"
              @click="emit('report-issue', location)"
            >
              Report an Issue
            </button>

          </div>

        </section>

        <p class="data-disclaimer">
          Demonstration only: Location names,
          accessibility features, hours and ratings
          are fictional. Confirm accessibility details
          directly with real venues before visiting.
        </p>

      </div>

      <div v-else class="no-results">
        <h1>No Location Selected</h1>

        <p>
          Choose a location from the search results.
        </p>

        <button
          type="button"
          class="btn btn-primary"
          @click="emit('back-to-results')"
        >
          Back to Results
        </button>
      </div>

    </div>
  </main>
</template>