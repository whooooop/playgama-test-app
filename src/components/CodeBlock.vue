<template>
  <pre class="code-block">
    <slot>{{ content }}</slot>
  </pre>
</template>

<script setup lang="ts">
defineProps<{
  content?: string;
}>();
</script>

<style scoped>
.code-block {
  background: var(--code-bg);
  color: var(--code-text);
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.6;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--code-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  margin: 0;
}

/* Smooth scrolling */
.code-block::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-block::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
