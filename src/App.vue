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
/* Global styles - Education Platform Theme */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Light theme - Vibrant Education Colors */
  --bg-primary: #f0f4ff;
  --bg-secondary: #ffffff;
  --text-primary: #1e1e3f;
  --text-secondary: #6b7280;
  --border-color: rgba(99, 102, 241, 0.15);
  --shadow-sm: 0 2px 4px rgba(99, 102, 241, 0.08);
  --shadow-md: 0 4px 12px rgba(99, 102, 241, 0.12);
  --shadow-lg: 0 32px 56px -12px rgba(99, 102, 241, 0.15);
  --code-bg: #1e1e3f;
  --code-text: #e9ecef;
  --code-border: rgba(99, 102, 241, 0.3);
  
  /* Vibrant Education Accent Colors */
  --accent-primary: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-orange: #f59e0b;
  --accent-yellow: #fbbf24;
  --accent-teal: #14b8a6;
  --accent-cyan: #06b6d4;
  --accent-pink: #ec4899;
  --accent-coral: #f97316;
  --accent-green: #22c55e;
  --accent-red: #ef4444;
  
  /* Vibrant Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  --gradient-secondary: linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%);
  --gradient-accent: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  --gradient-success: linear-gradient(135deg, #22c55e 0%, #14b8a6 100%);
}

.dark {
  /* Dark theme - Vibrant Education Colors */
  --bg-primary: #0f0f23;
  --bg-secondary: #1a1a2e;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: rgba(99, 102, 241, 0.25);
  --shadow-sm: 0 2px 8px rgba(99, 102, 241, 0.15);
  --shadow-md: 0 4px 16px rgba(139, 92, 246, 0.2);
  --shadow-lg: 0 32px 56px -12px rgba(99, 102, 241, 0.25);
  --code-bg: #16162a;
  --code-text: #e2e8f0;
  --code-border: rgba(99, 102, 241, 0.4);
  
  /* Vibrant Education Accent Colors */
  --accent-primary: #818cf8;
  --accent-secondary: #a78bfa;
  --accent-orange: #fbbf24;
  --accent-yellow: #fde047;
  --accent-teal: #2dd4bf;
  --accent-cyan: #22d3ee;
  --accent-pink: #f472b6;
  --accent-coral: #fb923c;
  --accent-green: #4ade80;
  --accent-red: #f87171;
  
  /* Vibrant Gradients */
  --gradient-primary: linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #f472b6 100%);
  --gradient-secondary: linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%);
  --gradient-accent: linear-gradient(135deg, #fbbf24 0%, #fb923c 100%);
  --gradient-success: linear-gradient(135deg, #4ade80 0%, #2dd4bf 100%);
}

body {
  font-family:
    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
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

body {
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 50%);
}

.dark body {
  background-image: 
    radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
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

/* Custom scrollbar for education theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style>
