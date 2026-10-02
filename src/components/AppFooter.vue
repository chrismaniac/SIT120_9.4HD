<script setup>
const emit = defineEmits(['change-view'])
</script>

<template>
  <footer class="site-footer">
    <div class="container">

      <p>
        &copy; 2026 AccessNearby
      </p>

      <p>
        Accessibility information should be confirmed
        directly with the venue before visiting.
      </p>

      <button
        type="button"
        @click="emit('change-view', 'contact')"
      >
        Contact & Feedback
      </button>

    </div>
  </footer>
</template>