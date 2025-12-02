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
  /* Vibrant dark gaming theme colors */
  --bg-primary: #0a0a12;
  --bg-secondary: #151520;
  --text-primary: #f0f0ff;
  --text-secondary: #a0a0c0;
  --border-color: rgba(138, 43, 226, 0.3);
  --shadow-sm: 0 2px 8px rgba(138, 43, 226, 0.2);
  --shadow-md: 0 4px 16px rgba(138, 43, 226, 0.3);
  --shadow-lg: 0 32px 56px -12px rgba(138, 43, 226, 0.4);
  --code-bg: #0d0d18;
  --code-text: #e9ecef;
  --code-border: rgba(138, 43, 226, 0.4);
  
  /* Vibrant accent colors */
  --accent-purple: #8a2be2;
  --accent-blue: #00bfff;
  --accent-pink: #ff1493;
  --accent-cyan: #00ffff;
  --accent-orange: #ff6b35;
  --accent-green: #00ff88;
  --accent-yellow: #ffd700;
  
  /* Gradient colors */
  --gradient-primary: linear-gradient(135deg, #8a2be2 0%, #00bfff 50%, #ff1493 100%);
  --gradient-secondary: linear-gradient(135deg, #00bfff 0%, #00ffff 100%);
  --gradient-accent: linear-gradient(135deg, #ff1493 0%, #ff6b35 100%);
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
    radial-gradient(circle at 10% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(0, 191, 255, 0.1) 0%, transparent 50%);
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
