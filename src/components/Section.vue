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
  border-radius: 20px;
  box-shadow:
    0 20px 40px -12px rgba(99, 102, 241, 0.1),
    0 8px 16px -4px rgba(139, 92, 246, 0.08),
    0 0 0 1px var(--border-color);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.25s ease;
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
  height: 4px;
  background: var(
    --gradient-primary,
    linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)
  );
  opacity: 1;
  transition: opacity 0.3s ease, height 0.3s ease;
}

.section::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.05) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.dark .section {
  box-shadow:
    0 25px 50px -12px rgba(99, 102, 241, 0.2),
    0 10px 20px -4px rgba(139, 92, 246, 0.15),
    0 0 0 1px var(--border-color);
  background-image:
    radial-gradient(
      circle at top right,
      rgba(99, 102, 241, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(236, 72, 153, 0.04) 0%,
      transparent 50%
    );
}

.section:hover {
  box-shadow:
    0 25px 50px -12px rgba(99, 102, 241, 0.15),
    0 10px 20px -4px rgba(139, 92, 246, 0.1),
    0 0 0 1px var(--border-color);
  transform: translateY(-2px);
}

.section:hover::before {
  height: 5px;
}

.dark .section:hover {
  box-shadow:
    0 30px 60px -12px rgba(99, 102, 241, 0.25),
    0 15px 30px -4px rgba(139, 92, 246, 0.2),
    0 0 40px rgba(99, 102, 241, 0.1),
    0 0 0 1px var(--border-color);
  transform: translateY(-4px);
}

.section h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section {
    padding: 20px;
    margin: 16px 0;
    border-radius: 16px;
  }
}
</style>
