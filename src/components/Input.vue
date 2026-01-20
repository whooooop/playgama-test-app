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
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.25s ease;
  outline: none;
  font-family: inherit;
}

.input:focus {
  border-color: var(--accent-primary, #6366f1);
  box-shadow: 
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 0 20px rgba(99, 102, 241, 0.1);
}

.dark .input:focus {
  border-color: var(--accent-primary, #818cf8);
  box-shadow: 
    0 0 0 3px rgba(129, 140, 248, 0.2),
    0 0 25px rgba(129, 140, 248, 0.15);
}

.input:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.5;
}

.input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}
</style>
