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
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: auto;
  min-width: 0;
  max-height: 500px;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  line-height: 1.6;
  white-space: pre;
  word-wrap: normal;
  word-break: normal;
  box-sizing: border-box;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--code-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
  margin: 0;
  position: relative;
}

.dark .code-block {
  box-shadow: 
    inset 0 2px 8px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(138, 43, 226, 0.1),
    inset 0 0 30px rgba(0, 191, 255, 0.05);
  border: 1px solid var(--code-border);
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

.dark .code-block::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--accent-purple, #8a2be2) 0%, var(--accent-blue, #00bfff) 100%);
}

.code-block::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.dark .code-block::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, var(--accent-pink, #ff1493) 0%, var(--accent-cyan, #00ffff) 100%);
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.6);
}
</style>
