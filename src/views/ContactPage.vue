<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ContactForm from '../components/ContactForm.vue'

const route = useRoute()

const submittedFeedback = ref(null)

const defaultLocation = computed(
  () => String(route.query.location || '')
)

function handleFormSubmission(data) {
  submittedFeedback.value = { ...data }
}
</script>

<template>
  <main>
    <ContactForm
      form-title="Suggest a Location or Report an Issue"
      :default-location="defaultLocation"
      @submit-form="handleFormSubmission"
    />

    <section
      v-if="submittedFeedback"
      class="section acknowledgement-section"
      aria-label="Submitted feedback acknowledgement"
    >
      <div class="container">
        <div class="acknowledgement-card" role="status">
          <h2>Feedback Recorded</h2>

          <h3>
            Thank you, {{ submittedFeedback.fullName }}!
          </h3>

          <p>Your demonstration feedback was recorded:</p>

          <ul>
            <li>
              <strong>Name:</strong>
              {{ submittedFeedback.fullName }}
            </li>

            <li>
              <strong>Email:</strong>
              {{ submittedFeedback.email }}
            </li>

            <li>
              <strong>Location:</strong>
              {{ submittedFeedback.locationName }}
            </li>

            <li>
              <strong>Feature:</strong>
              {{ submittedFeedback.feature }}
            </li>

            <li>
              <strong>Report type:</strong>
              {{ submittedFeedback.reportType }}
            </li>

            <li v-if="submittedFeedback.affectedCount != null">
              <strong>Features affected:</strong>
              {{ submittedFeedback.affectedCount }}
            </li>

            <li>
              <strong>Description:</strong>
              {{ submittedFeedback.description }}
            </li>
          </ul>

          <p class="demo-notice">
            Demonstration only. No information is sent
            to a database.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>