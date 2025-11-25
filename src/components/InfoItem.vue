<template>
  <div class="info-item">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value || 'N/A' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value?: string | number | boolean | null;
}>();
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
}

.info-item:hover {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 14px;
  letter-spacing: -0.01em;
}

.value {
  color: var(--text-primary);
  word-break: break-all;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  max-width: 60%;
}
</style>
