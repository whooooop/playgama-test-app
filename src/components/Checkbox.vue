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
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  user-select: none;
}

.checkbox-label:hover {
  color: var(--text-primary);
}

.checkbox-label:has(.checkbox:disabled) {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
  border-radius: 4px;
  flex-shrink: 0;
}

.checkbox:disabled {
  cursor: not-allowed;
}

.checkbox-text {
  flex: 1;
}
</style>
