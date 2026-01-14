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
  /* Pastel dark theme - green, sand & rose */
  --bg-primary: #262b28;
  --bg-secondary: #303634;
  --text-primary: #e8ebe9;
  --text-secondary: #a8b0aa;
  --border-color: rgba(130, 155, 140, 0.3);
  --shadow-sm: 0 2px 8px rgba(80, 120, 90, 0.12);
  --shadow-md: 0 4px 16px rgba(80, 120, 90, 0.18);
  --shadow-lg: 0 32px 56px -12px rgba(80, 120, 90, 0.22);
  --code-bg: #222826;
  --code-text: #dce2de;
  --code-border: rgba(130, 155, 140, 0.35);
  
  /* Pastel accent colors - green, sand & rose */
  --accent-sage: #7db87a;
  --accent-olive: #94a878;
  --accent-sand: #c9b896;
  --accent-cream: #ddd5c4;
  --accent-moss: #5a8a5a;
  --accent-mint: #8fc8a0;
  --accent-rose: #d4a0a8;
  --accent-blush: #c8909a;
  
  /* Gradient colors - with rose */
  --gradient-primary: linear-gradient(135deg, #7db87a 0%, #c8909a 50%, #d4a0a8 100%);
  --gradient-secondary: linear-gradient(135deg, #8fc8a0 0%, #d4a0a8 100%);
  --gradient-accent: linear-gradient(135deg, #94a878 0%, #c9b896 100%);
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

.dark body {
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(125, 184, 122, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(143, 200, 160, 0.05) 0%, transparent 50%);
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
