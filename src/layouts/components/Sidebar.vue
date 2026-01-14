<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-hover-area"></div>
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
  </div>
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
.sidebar-wrapper {
  position: fixed;
  left: 0;
  top: 25px;
  height: calc(100vh - 50px);
  z-index: 1000;
}

.sidebar-hover-area {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100%;
  z-index: 1001;
  pointer-events: auto;
}

.sidebar-hover-area::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 200px;
  background: linear-gradient(
    180deg,
    var(--accent-sage, #7db87a) 0%,
    var(--accent-rose, #d4a0a8) 100%
  );
  border-radius: 0 3px 3px 0;
  box-shadow: 0 0 10px rgba(200, 144, 154, 0.4);
  transition: opacity 0.3s ease;
}

.sidebar-wrapper:hover .sidebar-hover-area::before {
  opacity: 0;
}

.sidebar {
  width: 240px;
  position: absolute;
  left: 0;
  top: 50%;
  background: var(--bg-secondary);
  border-right: 2px solid var(--border-color);
  padding: 24px 16px;
  border-radius: 0 16px 16px 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow:
    2px 0 16px rgba(90, 138, 90, 0.15),
    inset -2px 0 20px rgba(143, 200, 160, 0.06);
  transform-style: preserve-3d;
  transform-origin: left center;
  transform: translateX(-150px) translateY(-50%) perspective(1200px)
    rotateY(-100deg);
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  backface-visibility: hidden;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(125, 184, 122, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(143, 200, 160, 0.04) 0%,
      transparent 50%
    );
}

.sidebar-wrapper:hover .sidebar {
  transform: translateX(0) translateY(-50%) perspective(1200px) rotateY(0deg);
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
    rgba(125, 184, 122, 0.15) 0%,
    rgba(143, 200, 160, 0.15) 100%
  );
  color: var(--text-primary);
  border-left: 3px solid var(--accent-sage, #7db87a);
  transform: translateX(4px);
}

.nav-item.active {
  background: var(
    --gradient-primary,
    linear-gradient(135deg, #7db87a 0%, #c8909a 50%, #d4a0a8 100%)
  );
  color: #1e2420;
  box-shadow:
    0 4px 12px rgba(200, 144, 154, 0.3),
    0 0 20px rgba(212, 160, 168, 0.2);
  border-left: 3px solid var(--accent-rose, #d4a0a8);
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
    var(--accent-sage, #7db87a) 0%,
    var(--accent-rose, #d4a0a8) 100%
  );
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    var(--accent-blush, #c8909a) 0%,
    var(--accent-rose, #d4a0a8) 100%
  );
  box-shadow: 0 0 10px rgba(212, 160, 168, 0.35);
}
</style>
