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
  padding: 12px 20px;
  background: var(--gradient-primary, linear-gradient(135deg, #7db87a 0%, #c8909a 50%, #d4a0a8 100%));
  color: #1e2420;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(200, 144, 154, 0.25), 0 0 20px rgba(212, 160, 168, 0.15);
  letter-spacing: -0.01em;
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn:hover:not(:disabled)::before {
  left: 100%;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(200, 144, 154, 0.4), 0 0 30px rgba(212, 160, 168, 0.25);
  filter: brightness(1.1);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(200, 144, 154, 0.25), 0 0 20px rgba(212, 160, 168, 0.15);
}

.btn:disabled {
  background: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}
</style>
