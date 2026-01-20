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
  padding: 24px;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 2px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
  position: relative;
  overflow: hidden;
}

.sub-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-secondary, linear-gradient(180deg, #14b8a6 0%, #06b6d4 100%));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sub-section:hover {
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(4px);
}

.sub-section:hover::before {
  opacity: 1;
}

.dark .sub-section:hover {
  box-shadow: 
    var(--shadow-md),
    0 0 20px rgba(99, 102, 241, 0.1);
}

.sub-section.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
  transition: all 0.3s ease;
  position: relative;
  user-select: none;
}

.sub-section.disabled:hover {
  transform: none;
}

.sub-section.disabled::after {
  content: 'This feature is not available';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--accent-orange, #f59e0b);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 2px solid var(--accent-orange, #f59e0b);
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);
  z-index: 1;
}

.dark .sub-section.disabled::after {
  color: var(--accent-yellow, #fde047);
  border-color: var(--accent-yellow, #fde047);
  box-shadow: 0 4px 20px rgba(253, 224, 71, 0.15);
}

.sub-section h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.6;
}
</style>
