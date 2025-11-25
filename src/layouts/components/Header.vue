<template>
  <header class="app-header">
    <SdkSelector />
  </header>
</template>

<script setup lang="ts">
import SdkSelector from '../../components/SdkSelector.vue';
</script>

<style scoped>
.app-header {
  background: var(--bg-secondary);
  padding: 20px 32px;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.02),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px var(--border-color);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.dark .app-header {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.4),
    0 6px 12px -3px rgba(0, 0, 0, 0.3),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.2),
    0 0 0 0.75px var(--border-color);
}
</style>
