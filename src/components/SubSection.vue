<template>
  <div class="sub-section" :class="{ disabled }">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description" class="description">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
  disabled?: boolean;
}>();
</script>

<style scoped>
.sub-section {
  margin: 24px 0;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.sub-section.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
  transition: all 0.3s ease;
  position: relative;
  user-select: none;
}

.sub-section.disabled::before {
  content: 'This feature is not available';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  background: var(--bg-primary);
  border-radius: 16px;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
  z-index: 1;
  color: var(--accent-orange);
}

.sub-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  letter-spacing: -0.01em;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.5;
}
</style>
