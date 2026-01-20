<template>
  <button :disabled="disabled" @click="$emit('click', $event)" class="btn">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  background: var(--gradient-primary, linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%));
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35), 0 0 25px rgba(236, 72, 153, 0.15);
  letter-spacing: 0.02em;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
  transition: left 0.5s ease;
}

.btn:hover:not(:disabled)::before {
  left: 100%;
}

.btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.45), 0 0 40px rgba(236, 72, 153, 0.25);
  filter: brightness(1.1);
}

.btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35), 0 0 25px rgba(236, 72, 153, 0.15);
}

.btn:disabled {
  background: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.5;
}
</style>
