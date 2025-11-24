<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <Icon :icon="item.icon" class="nav-icon" />
        <span class="nav-text">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();

const menuItems = [
  {
    path: '/platform',
    label: 'Platform',
    icon: 'mdi:view-dashboard',
  },
  {
    path: '/game',
    label: 'Game',
    icon: 'mdi:gamepad-variant',
  },
  {
    path: '/device',
    label: 'Device',
    icon: 'mdi:cellphone',
  },
  {
    path: '/player',
    label: 'Player',
    icon: 'mdi:account',
  },
  {
    path: '/storage',
    label: 'Storage',
    icon: 'mdi:database',
  },
];

const isActive = (path: string) => {
  if (path === '/platform') {
    return route.path === '/platform' || route.path === '/';
  }
  return route.path === path;
};
</script>

<style scoped>
.sidebar {
  width: 240px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px 16px;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #495057;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  background: #f8f9fa;
  color: #1a1a1a;
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
}

/* Smooth scrolling */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
