import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const LAST_VISITED_KEY = 'lastVisitedPage';
const DEFAULT_PATH = '/platform';

// Single source of truth for routes
const routeConfig = [
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
  {
    path: '/advertisement',
    name: 'Advertisement',
    component: () => import('../views/AdvertisementView.vue'),
  },
  {
    path: '/remote-config',
    name: 'RemoteConfig',
    component: () => import('../views/RemoteConfigView.vue'),
  },
  {
    path: '/clipboard',
    name: 'Clipboard',
    component: () => import('../views/ClipboardView.vue'),
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('../views/AchievementsView.vue'),
  },
  {
    path: '/social',
    name: 'Social',
    component: () => import('../views/SocialView.vue'),
  },
  {
    path: '/leaderboards',
    name: 'Leaderboards',
    component: () => import('../views/LeaderboardsView.vue'),
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import('../views/PaymentsView.vue'),
  },
] as const;

// Extract valid paths from route config
const validPaths: string[] = routeConfig.map(route => route.path);

// Get last visited page or default to platform
function getLastVisitedPage(): string {
  const lastVisited = localStorage.getItem(LAST_VISITED_KEY);
  if (lastVisited && validPaths.includes(lastVisited)) {
    return lastVisited;
  }
  return DEFAULT_PATH;
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => getLastVisitedPage(),
  },
  ...routeConfig,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Save last visited page on each navigation
router.beforeEach((to, _from, next) => {
  // Save the current page before navigation (if it's not the root path)
  if (to.path !== '/' && validPaths.includes(to.path)) {
    localStorage.setItem(LAST_VISITED_KEY, to.path);
  }
  next();
});

export default router;
