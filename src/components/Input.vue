<template>
  <input
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="inputClass"
    class="input"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  inputClass?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string | number];
}>();
</script>

<style scoped>
.input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.2s ease;
  outline: none;
  font-family: inherit;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.dark .input:focus {
  border-color: var(--accent-purple, #8a2be2);
  box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.3), 0 0 20px rgba(0, 191, 255, 0.2);
}

.input:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.6;
}

.input::placeholder {
  color: var(--text-secondary);
  opacity: 0.8;
}
</style>
