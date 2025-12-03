<template>
  <aside class="sidebar">
    <div class="sidebar-indicator"></div>
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
  {
    path: '/advertisement',
    label: 'Advertisement',
    icon: 'mdi:bullhorn',
  },
  {
    path: '/remote-config',
    label: 'Remote Config',
    icon: 'mdi:cog',
  },
  {
    path: '/clipboard',
    label: 'Clipboard',
    icon: 'mdi:clipboard-text',
  },
  {
    path: '/achievements',
    label: 'Achievements',
    icon: 'mdi:trophy',
  },
  {
    path: '/social',
    label: 'Social',
    icon: 'mdi:share-variant',
  },
  {
    path: '/leaderboards',
    label: 'Leaderboards',
    icon: 'mdi:format-list-numbered',
  },
  {
    path: '/payments',
    label: 'Payments',
    icon: 'mdi:credit-card',
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
  top: 25px;
  height: calc(100vh - 50px);
  background: var(--bg-secondary);
  border-right: 2px solid var(--border-color);
  padding: 24px 16px;
  border-radius: 0 16px 16px 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow:
    2px 0 16px rgba(138, 43, 226, 0.3),
    inset -2px 0 20px rgba(0, 191, 255, 0.1);
  transform-style: preserve-3d;
  transform-origin: left center;
  transform: translateX(-190px) perspective(1200px) rotateY(-40deg);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1000;
  backface-visibility: hidden;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(138, 43, 226, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(0, 191, 255, 0.1) 0%,
      transparent 50%
    );
}

.sidebar:hover {
  transform: translateX(0) perspective(1200px) rotateY(0deg);
}

.sidebar-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60px;
  background: linear-gradient(
    180deg,
    var(--accent-purple, #8a2be2) 0%,
    var(--accent-blue, #00bfff) 100%
  );
  border-radius: 2px 0 0 2px;
  box-shadow: 0 0 10px rgba(138, 43, 226, 0.6);
  z-index: 1001;
  pointer-events: none;
}

.sidebar:hover .sidebar-indicator {
  opacity: 0;
  transition: opacity 0.3s ease;
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
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  background: linear-gradient(
    135deg,
    rgba(138, 43, 226, 0.2) 0%,
    rgba(0, 191, 255, 0.2) 100%
  );
  color: var(--text-primary);
  border-left: 3px solid var(--accent-purple, #8a2be2);
  transform: translateX(4px);
}

.nav-item.active {
  background: var(
    --gradient-primary,
    linear-gradient(135deg, #8a2be2 0%, #00bfff 50%, #ff1493 100%)
  );
  color: white;
  box-shadow:
    0 4px 12px rgba(138, 43, 226, 0.5),
    0 0 20px rgba(0, 191, 255, 0.3);
  border-left: 3px solid var(--accent-cyan, #00ffff);
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
  background: linear-gradient(
    180deg,
    var(--accent-purple, #8a2be2) 0%,
    var(--accent-blue, #00bfff) 100%
  );
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    var(--accent-pink, #ff1493) 0%,
    var(--accent-cyan, #00ffff) 100%
  );
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}
</style>
