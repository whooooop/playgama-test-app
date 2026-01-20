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
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  min-width: 200px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  outline: none;
  font-family: inherit;
  margin-bottom: 16px;
}

.select:focus {
  border-color: var(--accent-primary, #6366f1);
  box-shadow: 
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 0 20px rgba(99, 102, 241, 0.1);
}

.dark .select:focus {
  border-color: var(--accent-primary, #818cf8);
  box-shadow: 
    0 0 0 3px rgba(129, 140, 248, 0.2),
    0 0 25px rgba(129, 140, 248, 0.15);
}

.select:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
