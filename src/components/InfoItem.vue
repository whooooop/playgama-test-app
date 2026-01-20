<template>
  <div class="info-item">
    <span class="label">{{ label }}</span>
    <span class="value">{{ formattedValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value?: string | number | boolean | null;
}>();

const formattedValue = computed(() => {
  if (typeof props.value === 'boolean') {
    return props.value ? 'true' : 'false';
  } else if (typeof props.value === 'number') {
    return props.value.toString();
  } else if (!props.value) {
    return 'N/A';
  }
  return props.value;
});
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 2px solid var(--border-color);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.info-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.info-item:hover {
  background: var(--bg-secondary);
  border-color: rgba(99, 102, 241, 0.25);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
}

.info-item:hover::before {
  opacity: 1;
}

.dark .info-item:hover {
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
}

.label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 14px;
  letter-spacing: -0.01em;
}

.value {
  color: var(--text-primary);
  word-break: break-all;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  max-width: 60%;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
