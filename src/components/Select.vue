<template>
  <select
    :value="modelValue"
    @change="
      $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
    "
    :disabled="disabled"
    :class="selectClass"
    class="select"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  disabled?: boolean;
  selectClass?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<style scoped>
.select {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  min-width: 200px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  font-family: inherit;
  margin-bottom: 16px;
}

.select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
