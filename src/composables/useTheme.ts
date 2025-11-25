import { ref, watch, computed } from 'vue';

type Theme = 'light' | 'dark' | 'auto';

const STORAGE_KEY = 'app-theme';

// Singleton state
let globalThemeState = {
  theme: ref<Theme>('auto'),
  isDark: ref<boolean>(false),
  mediaQuery: null as MediaQueryList | null,
};

let initialized = false;

// Detect system preference
const getSystemPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Update dark mode based on theme setting
const updateDarkMode = () => {
  const { theme, isDark } = globalThemeState;

  if (theme.value === 'auto') {
    isDark.value = getSystemPreference();
  } else {
    isDark.value = theme.value === 'dark';
  }

  // Apply theme class to document
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
};

// Load theme from localStorage
const loadTheme = () => {
  const { theme } = globalThemeState;
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved && ['light', 'dark', 'auto'].includes(saved)) {
    theme.value = saved;
  } else {
    theme.value = 'auto';
  }
  updateDarkMode();
};

// Save theme to localStorage
const saveTheme = () => {
  const { theme } = globalThemeState;
  localStorage.setItem(STORAGE_KEY, theme.value);
};

// Initialize theme system (call once on app start)
export function initTheme() {
  if (initialized) return;
  initialized = true;

  const { theme } = globalThemeState;

  // Load saved theme
  loadTheme();

  // Setup media query listener for system preference
  if (typeof window !== 'undefined') {
    globalThemeState.mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const handleSystemThemeChange = () => {
      if (theme.value === 'auto') {
        updateDarkMode();
      }
    };

    // Modern browsers
    if (globalThemeState.mediaQuery.addEventListener) {
      globalThemeState.mediaQuery.addEventListener(
        'change',
        handleSystemThemeChange
      );
    } else {
      // Fallback for older browsers
      globalThemeState.mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  // Watch theme changes
  watch(
    () => theme.value,
    () => {
      updateDarkMode();
    },
    { immediate: true }
  );
}

/**
 * Composable for managing application theme
 * Supports system preference detection and manual override
 */
export function useTheme() {
  const { theme, isDark } = globalThemeState;

  // Set theme
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    updateDarkMode();
    saveTheme();
  };

  return {
    theme: theme,
    isDark: computed(() => isDark.value),
    setTheme,
    loadTheme,
  };
}
