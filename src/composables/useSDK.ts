import { ref, computed, watch } from 'vue';

const STORAGE_VERSION_KEY = 'sdk-version';
const STORAGE_CUSTOM_URL_KEY = 'sdk-custom-url';

export const availableVersions = [
  'v1.23.0',
  'v1.24.0',
  'v1.25.0',
  'v1.26.0',
  'v1.27.0',
  'v1.27.1',
];

// Singleton state for bridge
let globalBridgeState = {
  bridge: ref<any>(null),
  isInitialized: ref<boolean>(false),
  selectedVersion: ref<string>(''),
  customUrl: ref<string>(''),
  currentSdkVersion: ref<string>(''),
  loading: ref<boolean>(false),
  error: ref<string>(''),
};

// Global flags to ensure initialization happens only once
let watchSetup = false;
let settingsLoaded = false;

/**
 * Composable for managing PlayGama bridge SDK
 * Handles SDK loading, initialization, and provides reactive bridge instance
 * Uses singleton pattern to share bridge state across all components
 */
export function useSDK() {
  // Use singleton state
  const {
    bridge,
    isInitialized,
    selectedVersion,
    customUrl,
    currentSdkVersion,
    loading,
    error,
  } = globalBridgeState;

  // Load saved settings from localStorage
  const loadSettings = () => {
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    const savedCustomUrl = localStorage.getItem(STORAGE_CUSTOM_URL_KEY);

    if (savedVersion) {
      selectedVersion.value = savedVersion;
    } else if (availableVersions.length > 0) {
      selectedVersion.value = availableVersions[0];
      localStorage.setItem(STORAGE_VERSION_KEY, selectedVersion.value);
    }

    if (savedCustomUrl) {
      customUrl.value = savedCustomUrl;
    }
  };

  // Save settings to localStorage
  const saveSettings = () => {
    if (selectedVersion.value) {
      localStorage.setItem(STORAGE_VERSION_KEY, selectedVersion.value);
    }
    if (customUrl.value) {
      localStorage.setItem(STORAGE_CUSTOM_URL_KEY, customUrl.value);
    }
  };

  // Get SDK URL based on selected version or custom URL
  const getSdkUrl = (): string => {
    if (selectedVersion.value === 'custom') {
      return customUrl.value;
    }
    if (selectedVersion.value && selectedVersion.value !== 'custom') {
      return `./${selectedVersion.value}/playgama-bridge.js?v=${Date.now()}`;
    }
    return '';
  };

  // Check if SDK can be loaded
  const canLoadSdk = computed(() => {
    if (selectedVersion.value === 'custom') {
      return customUrl.value.trim() !== '';
    }
    return selectedVersion.value !== '';
  });

  // Initialize bridge instance
  const initializeBridge = async (): Promise<void> => {
    if (!window.bridge) {
      throw new Error('Bridge not found on window object');
    }

    try {
      await window.bridge.initialize({
        configFilePath: './config.json',
      });
      bridge.value = window.bridge;
      isInitialized.value = true;
      console.log('Bridge initialized successfully');
    } catch (err: any) {
      console.error('Bridge initialization failed:', err);
      throw new Error('Bridge initialization failed: ' + err.message);
    }
  };

  // Load SDK script
  const loadSdk = async (): Promise<void> => {
    if (!canLoadSdk.value) {
      error.value = 'Cannot load SDK: invalid version or URL';
      return;
    }

    const sdkUrl = getSdkUrl();

    // Check if SDK is already loaded
    const existingScript = document.querySelector(`script[src="${sdkUrl}"]`);
    if (existingScript) {
      console.log('SDK already loaded:', sdkUrl);
      currentSdkVersion.value =
        selectedVersion.value === 'custom'
          ? 'Custom URL'
          : selectedVersion.value;

      // Check if bridge is already available
      if (window.bridge) {
        try {
          await initializeBridge();
        } catch (err: any) {
          error.value = err.message;
        }
      }
      return;
    }

    loading.value = true;
    error.value = '';

    return new Promise((resolve, reject) => {
      try {
        // Create new script element
        const script = document.createElement('script');
        script.src = sdkUrl;
        script.async = true;

        // Event handlers
        script.onload = async () => {
          loading.value = false;
          currentSdkVersion.value =
            selectedVersion.value === 'custom'
              ? 'Custom URL'
              : selectedVersion.value;
          console.log('SDK successfully loaded:', sdkUrl);

          // Initialize bridge after SDK is loaded
          if (window.bridge) {
            try {
              await initializeBridge();
              resolve();
            } catch (err: any) {
              error.value = err.message;
              reject(err);
            }
          } else {
            error.value = 'Bridge not found after SDK load';
            reject(new Error('Bridge not found after SDK load'));
          }
        };

        script.onerror = () => {
          loading.value = false;
          error.value = 'Failed to load SDK';
          console.error('SDK loading error:', sdkUrl);
          reject(new Error('Failed to load SDK'));
        };

        // Add script to page
        document.head.appendChild(script);
      } catch (err: any) {
        loading.value = false;
        error.value = 'Error loading SDK: ' + err.message;
        console.error('SDK loading error:', err);
        reject(err);
      }
    });
  };

  // Set version
  const setVersion = (version: string) => {
    selectedVersion.value = version;
    if (version !== 'custom') {
      customUrl.value = '';
    }
    error.value = '';
    saveSettings();
  };

  // Set custom URL
  const setCustomUrl = (url: string) => {
    customUrl.value = url;
    error.value = '';
    saveSettings();
  };

  // Watch for window.bridge changes (in case bridge is loaded externally)
  // Only setup watch once (for the first instance)
  if (!watchSetup) {
    watchSetup = true;
    watch(
      () => window.bridge,
      async newBridge => {
        if (newBridge && !bridge.value && !loading.value) {
          try {
            await initializeBridge();
          } catch (err) {
            console.error('Failed to initialize bridge from window:', err);
          }
        }
      },
      { immediate: true }
    );
  }

  // Load settings on initialization (only once)
  if (!settingsLoaded) {
    settingsLoaded = true;
    loadSettings();
  }

  return {
    // State
    bridge: computed(() => bridge.value),
    isInitialized: computed(() => isInitialized.value),
    selectedVersion,
    customUrl,
    currentSdkVersion,
    loading,
    error,
    canLoadSdk,
    availableVersions,

    // Methods
    loadSdk,
    setVersion,
    setCustomUrl,
    initializeBridge,
    saveSettings,
  };
}
