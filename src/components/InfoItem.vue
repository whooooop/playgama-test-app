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
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.info-item:hover {
  background: #f1f3f5;
  border-color: rgba(0, 0, 0, 0.08);
}

.label {
  font-weight: 500;
  color: #495057;
  font-size: 14px;
  letter-spacing: -0.01em;
}

.value {
  color: #1a1a1a;
  word-break: break-all;
  font-size: 14px;
  font-weight: 400;
  text-align: right;
  max-width: 60%;
}
</style>
