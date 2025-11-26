<template>
  <div class="button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Wrapper component for button groups
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .button-group :deep(button),
  .button-group :deep(.btn) {
    width: 100%;
  }
}
</style>
