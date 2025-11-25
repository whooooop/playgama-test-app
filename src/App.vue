<template>
  <MainLayout />
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue';
import { initTheme } from './composables/useTheme';

// Initialize theme system
initTheme();
</script>

<style>
/* Global styles in 21st.dev style */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Light theme colors */
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #6c757d;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.02);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.02);
  --shadow-lg: 0 32px 56px -12px rgba(0, 0, 0, 0.02);
  --code-bg: #1a1a1a;
  --code-text: #e9ecef;
  --code-border: rgba(255, 255, 255, 0.05);
}

.dark {
  /* Dark theme colors */
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --text-primary: #e9ecef;
  --text-secondary: #adb5bd;
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 32px 56px -12px rgba(0, 0, 0, 0.4);
  --code-bg: #0a0a0a;
  --code-text: #e9ecef;
  --code-border: rgba(255, 255, 255, 0.1);
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

#app {
  min-height: 100vh;
  background: var(--bg-primary);
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

/* Global pre styles with theme support */
pre {
  background: var(--code-bg);
  color: var(--code-text);
  border: 1px solid var(--code-border);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}
</style>
