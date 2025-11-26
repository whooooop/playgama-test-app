<template>
  <div class="input-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Wrapper component for input groups
</script>

<style scoped>
.input-group {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  align-items: stretch;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
}
</style>
