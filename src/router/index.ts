import { createRouter, createWebHashHistory } from 'vue-router';

const LAST_VISITED_KEY = 'lastVisitedPage';
const validPaths = ['/platform', '/game', '/device', '/player', '/storage'];

// Get last visited page or default to platform
function getLastVisitedPage(): string {
  const lastVisited = localStorage.getItem(LAST_VISITED_KEY);
  if (lastVisited && validPaths.includes(lastVisited)) {
    return lastVisited;
  }
  return '/platform';
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => getLastVisitedPage(),
    },
    {
      path: '/platform',
      name: 'Platform',
      component: () => import('../views/PlatformView.vue'),
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/device',
      name: 'Device',
      component: () => import('../views/DeviceView.vue'),
    },
    {
      path: '/player',
      name: 'Player',
      component: () => import('../views/PlayerView.vue'),
    },
    {
      path: '/storage',
      name: 'Storage',
      component: () => import('../views/StorageView.vue'),
    },
  ],
});

// Save last visited page on each navigation
router.beforeEach((to, from, next) => {
  // Save the current page before navigation (if it's not the root path)
  if (to.path !== '/' && validPaths.includes(to.path)) {
    localStorage.setItem(LAST_VISITED_KEY, to.path);
  }
  next();
});

export default router;
