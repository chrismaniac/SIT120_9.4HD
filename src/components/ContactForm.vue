<script setup>
import { ref, watch } from 'vue'

// Receive data from the parent component
const props = defineProps({
  formTitle: {
    type: String,
    default: 'Suggest a Location or Report an Issue'
  },

  defaultLocation: {
    type: String,
    default: ''
  }
})

// Send submitted form data to App.vue
const emit = defineEmits(['submit-form'])

// Accessibility feature options
const featureOptions = [
  { value: 'ramp', label: 'Wheelchair Ramp' },
  { value: 'lift', label: 'Lift Access' },
  { value: 'toilet', label: 'Accessible Toilet' },
  { value: 'parking', label: 'Disability Parking' },
  { value: 'doors', label: 'Automatic Doors' }
]

// Initial form values
function initialForm() {
  return {
    fullName: '',
    email: '',
    locationName: props.defaultLocation,
    feature: '',
    reportType: '',
    affectedCount: null,
    description: ''
  }
}

// Reactive form state
const form = ref(initialForm())

// Validation errors
const errors = ref({})

// Submission feedback
const successMessage = ref('')
const isSubmitting = ref(false)

// Prefill the location when a user reports an issue
watch(
  () => props.defaultLocation,
  (newLocation) => {
    if (!isSubmitting.value) {
      form.value.locationName = newLocation
    }
  }
)

// Validate required inputs
function validateForm() {
  errors.value = {}

  if (!form.value.fullName.trim()) {
    errors.value.fullName = 'Please enter your name.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(form.value.email.trim())) {
    errors.value.email =
      'Please enter a valid email address.'
  }

  if (!form.value.locationName.trim()) {
    errors.value.locationName =
      'Please enter the location name.'
  }

  if (!form.value.feature) {
    errors.value.feature =
      'Please select an accessibility feature.'
  }

  if (!form.value.reportType) {
    errors.value.reportType =
      'Please select the type of submission.'
  }

  if (
    form.value.affectedCount !== null &&
    form.value.affectedCount !== '' &&
    (
      !Number.isInteger(form.value.affectedCount) ||
      form.value.affectedCount < 1 ||
      form.value.affectedCount > 5
    )
  ) {
    errors.value.affectedCount =
      'Enter a whole number between 1 and 5.'
  }

  if (!form.value.description.trim()) {
    errors.value.description =
      'Please provide additional details.'
  }

  return Object.keys(errors.value).length === 0
}

// Reset fields
function resetForm() {
  form.value = initialForm()
  errors.value = {}
  successMessage.value = ''
}

// Handle submission
function handleSubmit() {
  if (isSubmitting.value || !validateForm()) {
    return
  }

  isSubmitting.value = true

  // Send a shallow copy to the parent
  emit('submit-form', { ...form.value })

  successMessage.value =
    'Your feedback has been recorded in this demonstration.'

  // Reset the form after two seconds
  setTimeout(() => {
    resetForm()
    isSubmitting.value = false
  }, 2000)
}
</script>

<template>
  <section class="section">
    <div class="container">

      <div class="form-heading">

        <h1>{{ formTitle }}</h1>

        <p>
          Help us keep accessibility information
          accurate and up to date.
        </p>

        <p>
          Fields marked with * are required.
        </p>

      </div>

      <form
        class="access-form"
        novalidate
        @submit.prevent="handleSubmit"
      >

        <!-- YOUR DETAILS -->
        <fieldset class="form-fieldset">

          <legend>Your Details</legend>

          <div class="form-grid">

            <!-- Name -->
            <div class="form-field">

              <label for="fullName">
                Full Name *
              </label>

              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                autocomplete="name"
                :aria-invalid="!!errors.fullName"
              >

              <p
                v-if="errors.fullName"
                class="error-message"
                role="alert"
              >
                {{ errors.fullName }}
              </p>

            </div>

            <!-- Email -->
            <div class="form-field">

              <label for="email">
                Email Address *
              </label>

              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :aria-invalid="!!errors.email"
              >

              <p
                v-if="errors.email"
                class="error-message"
                role="alert"
              >
                {{ errors.email }}
              </p>

            </div>

          </div>

        </fieldset>


        <!-- LOCATION AND FEEDBACK -->
        <fieldset class="form-fieldset">

          <legend>Location & Feedback</legend>

          <div class="form-grid">

            <!-- Location name -->
            <div class="form-field">

              <label for="locationName">
                Location Name *
              </label>

              <input
                id="locationName"
                v-model="form.locationName"
                type="text"
                placeholder="Enter building or location name"
                :aria-invalid="!!errors.locationName"
              >

              <p
                v-if="errors.locationName"
                class="error-message"
                role="alert"
              >
                {{ errors.locationName }}
              </p>

            </div>


            <!-- Accessibility dropdown -->
            <div class="form-field">

              <label for="feature">
                Accessibility Feature *
              </label>

              <select
                id="feature"
                v-model="form.feature"
                :aria-invalid="!!errors.feature"
              >

                <option value="">
                  Select an accessibility feature
                </option>

                <option
                  v-for="option in featureOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>

              </select>

              <p
                v-if="errors.feature"
                class="error-message"
                role="alert"
              >
                {{ errors.feature }}
              </p>

            </div>

          </div>


          <!-- Radio buttons -->
          <div class="form-field">

            <fieldset class="radio-fieldset">

              <legend>
                Type of Submission *
              </legend>

              <label class="form-choice">

                <input
                  v-model="form.reportType"
                  type="radio"
                  value="suggestion"
                >

                Suggest a new location

              </label>

              <label class="form-choice">

                <input
                  v-model="form.reportType"
                  type="radio"
                  value="issue"
                >

                Report an issue with an existing location

              </label>

            </fieldset>

            <p
              v-if="errors.reportType"
              class="error-message"
              role="alert"
            >
              {{ errors.reportType }}
            </p>

          </div>


          <!-- Optional numeric input -->
          <div class="form-field">

            <label for="affectedCount">
              Number of Accessibility Features Affected
              (Optional)
            </label>

            <input
              id="affectedCount"
              v-model.number="form.affectedCount"
              type="number"
              min="1"
              max="5"
              step="1"
              placeholder="1–5"
              :aria-invalid="!!errors.affectedCount"
            >

            <p class="form-hint">
              If reporting multiple accessibility concerns,
              enter how many feature categories are affected.
            </p>

            <p
              v-if="errors.affectedCount"
              class="error-message"
              role="alert"
            >
              {{ errors.affectedCount }}
            </p>

          </div>


          <!-- Description -->
          <div class="form-field">

            <label for="description">
              Details / Description *
            </label>

            <textarea
              id="description"
              v-model="form.description"
              rows="5"
              maxlength="500"
              placeholder="Describe the location or accessibility issue"
              :aria-invalid="!!errors.description"
            ></textarea>

            <p class="form-hint">
              Maximum 500 characters.
            </p>

            <p
              v-if="errors.description"
              class="error-message"
              role="alert"
            >
              {{ errors.description }}
            </p>

          </div>

        </fieldset>


        <!-- BUTTONS -->
        <div class="form-actions">

          <button
            type="button"
            class="btn btn-outline"
            :disabled="isSubmitting"
            @click="resetForm"
          >
            Reset
          </button>

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Processing...' : 'Submit Feedback' }}
          </button>

        </div>


        <!-- Success message -->
        <p v-if="successMessage"
          class="form-success"
          role="status"
        >
          {{ successMessage }}
        </p>

        <p class="form-hint">
          Demonstration only. No information is sent
          to a real organisation or database.
        </p>

      </form>

    </div>
  </section>
</template>