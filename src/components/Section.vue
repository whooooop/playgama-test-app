<template>
  <div class="section">
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.section {
  background: var(--bg-secondary);
  padding: 32px;
  margin: 20px 0;
  border-radius: 16px;
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.02),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px var(--border-color);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.dark .section {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.4),
    0 6px 12px -3px rgba(0, 0, 0, 0.3),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.2),
    0 0 0 0.75px var(--border-color);
}

.section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.06),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px var(--border-color);
}

.dark .section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.5),
    0 6px 12px -3px rgba(0, 0, 0, 0.4),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.3),
    0 0 0 0.75px var(--border-color);
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  letter-spacing: -0.01em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section {
    padding: 20px;
    margin: 16px 0;
  }
}
</style>
