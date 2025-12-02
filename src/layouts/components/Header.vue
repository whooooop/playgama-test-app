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
  position: relative;
  overflow: hidden;
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary, linear-gradient(90deg, #8a2be2 0%, #00bfff 50%, #ff1493 100%));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dark .app-header {
  box-shadow:
    0 32px 56px -12px rgba(138, 43, 226, 0.2),
    0 6px 12px -3px rgba(0, 191, 255, 0.15),
    0 0 0 1px var(--border-color);
  background-image: 
    linear-gradient(135deg, rgba(138, 43, 226, 0.05) 0%, rgba(0, 191, 255, 0.05) 100%);
}

.dark .app-header::before {
  opacity: 1;
}
</style>
