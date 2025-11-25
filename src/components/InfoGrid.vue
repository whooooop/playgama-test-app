<template>
  <div class="info-grid">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No props needed, just a wrapper component
</script>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
