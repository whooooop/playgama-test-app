<template>
  <div class="section">
    <div class="section-header">
      <h2 v-if="title">{{ title }}</h2>
      <slot name="header" />
    </div>
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
  position: relative;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(
    --gradient-primary,
    linear-gradient(90deg, #7db87a 0%, #c8909a 50%, #d4a0a8 100%)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dark .section {
  box-shadow:
    0 32px 56px -12px rgba(90, 138, 90, 0.12),
    0 6px 12px -3px rgba(125, 184, 122, 0.08),
    0 0 0 1px var(--border-color);
  background-image:
    radial-gradient(
      circle at top right,
      rgba(125, 184, 122, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(143, 200, 160, 0.03) 0%,
      transparent 50%
    );
}

.dark .section::before {
  opacity: 1;
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
    0 32px 56px -12px rgba(90, 138, 90, 0.16),
    0 6px 12px -3px rgba(125, 184, 122, 0.12),
    0 0 30px rgba(125, 184, 122, 0.1),
    0 0 0 1px var(--border-color);
  transform: translateY(-2px);
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section {
    padding: 20px;
    margin: 16px 0;
  }
}
</style>
