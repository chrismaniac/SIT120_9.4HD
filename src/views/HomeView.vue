<script setup>
import { ref } from 'vue'

const searchTerm = ref('')

const emit = defineEmits(['search'])
const baseUrl = import.meta.env.BASE_URL

function handleSearch() {
  const query = searchTerm.value.trim()

  emit('search', query)
}
</script>

<template>
  <main>

    <!-- Homepage hero -->
    <section class="hero">
      <div class="container">

        <h1>
          Find an accessible place near you
        </h1>

        <p>
          Search for buildings and public spaces
          with wheelchair ramps, lifts,
          accessible toilets, disability parking
          and step-free entrances.
        </p>

        <form
          class="search-form"
          role="search"
          @submit.prevent="handleSearch"
        >

          <input
            v-model="searchTerm"
            type="search"
            aria-label="Search locations"
            placeholder="Enter suburb, postcode or building name"
          >

          <button
            type="submit"
            class="btn btn-primary"
          >
            Search Locations
          </button>

        </form>

      </div>
    </section>


    <!-- Accessibility features -->
    <section class="section">
      <div class="container">

        <h2>
          Find places that meet your needs
        </h2>

        <p>
          Review accessibility features before
          planning your next visit.
        </p>

       <div class="feature-grid">

  <!-- Accessible entrance -->
  <article class="feature-card">
    <img
      :src="`${baseUrl}images/accessible-entrance.jpg`"
      alt="Building entrance with a sloping access ramp, handrails and wheelchair-accessibility markings"
      class="feature-image"
    >

    <h3>Wheelchair Access & Ramps</h3>

    <p>
      Find buildings with ramps, step-free entrances
      and features that may support wheelchair access.
    </p>
  </article>


  <!-- Accessible lift -->
  <article class="feature-card">
    <img
      :src="`${baseUrl}images/accessible-lift.jpg`"
      alt="Lift entrance with a wheelchair-accessibility sign beside the doors"
      class="feature-image"
    >

    <h3>Lifts & Step-Free Access</h3>

    <p>
      Explore locations with lift facilities
      and accessible routes between building levels.
    </p>
  </article>


  <!-- Accessible parking -->
  <article class="feature-card">
    <img
      :src="`${baseUrl}images/accessible-parking.jpg`"
      alt="Accessible parking space marked with a wheelchair symbol"
      class="feature-image"
    >

    <h3>Disability Parking</h3>

    <p>
      Check whether a location lists designated
      accessible parking spaces before visiting.
    </p>
  </article>

</div>

      </div>
    </section>

  </main>
</template>