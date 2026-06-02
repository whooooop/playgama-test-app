import { ref, computed, watch, shallowRef, markRaw } from 'vue';
import { availableVersions } from 'virtual:available-versions';

const STORAGE_VERSION_KEY = 'sdk-version';
const STORAGE_CUSTOM_URL_KEY = 'sdk-custom-url';

export { availableVersions };

// Singleton state for bridge
let globalBridgeState = {
  bridge: shallowRef<any>(null),
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
      selectedVersion.value = availableVersions[availableVersions.length - 1];
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
      await new Promise(resolve => setTimeout(resolve, 3000));
      await window.bridge.initialize({
        configFilePath: './config.json',
      });
      bridge.value = markRaw(window.bridge);
      isInitialized.value = true;
      console.log('Bridge initialized successfully');

      // Send game ready event to SDK after 30 seconds
      setTimeout(() => {
        try {
          window.bridge.platform.sendMessage(
            window.bridge.PLATFORM_MESSAGE?.GAME_READY
          );
          console.log(
            `${window.bridge.PLATFORM_MESSAGE?.GAME_READY} event sent to SDK (after 10s)`
          );
        } catch (err) {
          console.error('Failed to send game ready event:', err);
        }
      }, 10_000);
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
              // window.addEventListener('message', (event) => {
              //   console.log(JSON.stringify(event.data))
              //   if (event.data.action === 'initialize' && event.data.source === 'bridge') {
              //     window.postMessage({"source":"platform","type":"platform","action":"initialize", "supportedFeatures": [], "config": { "internalStoragePolicy": "authorized_only", "leaderboardsType": "not_available", "platformLanguage": "en" }, "purchases": []})
              //   } else if (event.data.action === 'get_player' && event.data.source === 'bridge') {
              //     window.postMessage({"source":"platform","type":"player","action":"get_player", "id": event.data.id, "player": {
              //       isAuthorized: true,
              //       name: 'Test user',
              //       userId: '32442002f2r02kt',
              //       photos: [
              //           'https://placehold.co/56x56',
              //           'https://placehold.co/84x84',
              //           'https://placehold.co/200x200',
              //       ],
              //       jwt: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IlBHX1JTQV9WMSJ9.eyJuYW1lIjoiVGVzdCB1c2VyIiwiaWQiOiIzMjQ0MjAwMmYycjAya3QiLCJ1dWlkIjoiYTU5NzcwYzktMzYwMi00ZTA5LTg0OWQtZmJhYmVmYWQ4MTVkIiwicGhvdG9zIjpbXSwiZ29sZEJhbGFuY2UiOjEsImlzQXV0aG9yaXplZCI6dHJ1ZSwiaWF0IjoxNzU3MzQ0MDA4LCJleHAiOjE5MTUxMzIwMDh9.FCVwdNX16wwkow1BkYUEu4Pld6hHZr8ZSWJ5olF3zZsLk_iNxWjXn9DUJD34JFN_sMovqwsM4yVU68TJr9ysTnZgqkvFKczHlLSRybmQk36IT_VfOeBTPbIaxbQ4CWsiffZT_GwE5ylyE-X7YHlBbd7B8v4ezPiV5EaHwCJb3GKRxsITV1-Qu5H7zxGtk0cGkUuOF-3vXDjWxmj19Tjr7Y1yau6YpS2hxqkVOmJKnG7X6l5XdeVNLvYnIImlcECp9paaY0Q_6W4Dm8ialGPEqEbXOOavXzAxhe0LEXAx_fHkWelzdTwiwHdURHbE61qSwuFIDOkuvNRMqh4n7KhP7g',
              //     }})
              //   }
              // })
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
