<template>
  <label class="checkbox-label">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
      :disabled="disabled"
      class="checkbox"
    />
    <span v-if="$slots.default || label" class="checkbox-text">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
}>();

defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  user-select: none;
  transition: color 0.2s ease;
}

.checkbox-label:hover {
  color: var(--text-primary);
}

.checkbox-label:has(.checkbox:disabled) {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--accent-primary, #6366f1);
  border-radius: 6px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.checkbox:hover:not(:disabled) {
  transform: scale(1.1);
}

.checkbox:checked {
  accent-color: var(--accent-secondary, #8b5cf6);
}

.dark .checkbox {
  accent-color: var(--accent-primary, #818cf8);
}

.dark .checkbox:checked {
  accent-color: var(--accent-secondary, #a78bfa);
}

.checkbox:disabled {
  cursor: not-allowed;
}

.checkbox-text {
  flex: 1;
}
</style>
