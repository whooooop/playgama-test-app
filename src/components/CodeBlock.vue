<template>
  <div class="code-block-container">
    <pre class="code-block"><slot>{{ content }}</slot></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content?: string;
}>();
</script>

<style scoped>
.code-block-container {
  min-width: 0;
  overflow: hidden;
}

.code-block {
  display: flex;
  background: var(--code-bg);
  color: var(--code-text);
  padding: 18px;
  border-radius: 14px;
  overflow-x: auto;
  overflow-y: auto;
  min-width: 0;
  max-height: 500px;
  font-size: 13px;
  font-family: 'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  line-height: 1.7;
  white-space: pre;
  word-wrap: normal;
  word-break: normal;
  box-sizing: border-box;
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(99, 102, 241, 0.1);
  border: 2px solid var(--code-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  margin: 0;
  position: relative;
}

.code-block:hover {
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.15),
    0 6px 20px rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.4);
}

.dark .code-block {
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.4),
    0 4px 20px rgba(99, 102, 241, 0.15),
    inset 0 0 40px rgba(99, 102, 241, 0.03);
  border: 2px solid var(--code-border);
}

.dark .code-block:hover {
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.4),
    0 8px 30px rgba(99, 102, 241, 0.2),
    inset 0 0 40px rgba(99, 102, 241, 0.05);
  border-color: rgba(129, 140, 248, 0.5);
}

/* Smooth scrolling */
.code-block::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-block::-webkit-scrollbar-track {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 4px;
}

.code-block::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%);
  border-radius: 4px;
}

.dark .code-block::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--accent-primary, #818cf8) 0%, var(--accent-pink, #f472b6) 100%);
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.6) 100%);
}

.dark .code-block::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--accent-secondary, #a78bfa) 0%, var(--accent-pink, #f472b6) 100%);
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.4);
}
</style>
