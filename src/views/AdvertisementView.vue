<template>
  <div class="section">
    <h2>Advertisement</h2>

    <div class="info-grid">
      <InfoItem label="Is Banner Supported:" :value="isBannerSupported" />
      <InfoItem
        label="Is Interstitial Supported:"
        :value="isInterstitialSupported"
      />
      <InfoItem label="Is Rewarded Supported:" :value="isRewardedSupported" />
      <InfoItem label="Is AdBlock Detected:" :value="isAdBlockDetected" />
    </div>

    <!-- Minimum Delay Between Interstitial -->
    <div class="delay-section">
      <h3>Minimum Delay Between Interstitial</h3>
      <p class="description">
        Sets the minimum time delay (in milliseconds) between showing
        interstitial ads. This prevents showing ads too frequently and improves
        user experience.
      </p>
      <div class="input-group">
        <input
          v-model="minimumDelayInput"
          type="text"
          placeholder="Minimum Delay Between Interstitial (ms)"
        />
        <button @click="setMinimumDelay">Set Minimum Delay</button>
      </div>
    </div>

    <!-- Banner Section -->
    <div class="ad-section">
      <h3>Banner</h3>
      <div class="info-grid">
        <InfoItem label="Last Banner States:" :value="bannerStates" />
      </div>
      <div class="button-group">
        <button @click="showBanner" :disabled="!isBannerSupported">
          Show Banner
        </button>
        <button @click="hideBanner" :disabled="!isBannerSupported">
          Hide Banner
        </button>
      </div>
    </div>

    <!-- Interstitial Section -->
    <div class="ad-section">
      <h3>Interstitial</h3>
      <div class="info-grid">
        <InfoItem
          label="Last Interstitial States:"
          :value="interstitialStates"
        />
      </div>
      <div class="button-group">
        <button @click="showInterstitial" :disabled="!isInterstitialSupported">
          Show Interstitial
        </button>
      </div>
    </div>

    <!-- Rewarded Section -->
    <div class="ad-section">
      <h3>Rewarded</h3>
      <div class="info-grid">
        <InfoItem label="Last Rewarded States:" :value="rewardedStates" />
        <InfoItem label="Rewarded Placement:" :value="rewardedPlacement" />
      </div>
      <div class="button-group">
        <button @click="showRewarded" :disabled="!isRewardedSupported">
          Show Rewarded
        </button>
      </div>
    </div>

    <!-- AdBlock Detection -->
    <div class="ad-section">
      <h3>AdBlock Detection</h3>
      <div class="button-group">
        <button @click="checkAdBlock">Is AdBlock Detected</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import InfoItem from '../components/InfoItem.vue';

declare global {
  interface Window {
    bridge?: any;
  }
}

const bridge = computed(() => window.bridge);

// State
const isBannerSupported = computed(
  () => bridge.value?.advertisement?.isBannerSupported ?? null
);
const isInterstitialSupported = computed(
  () => bridge.value?.advertisement?.isInterstitialSupported ?? null
);
const isRewardedSupported = computed(
  () => bridge.value?.advertisement?.isRewardedSupported ?? null
);
const isAdBlockDetected = ref<string | null>(null);
const rewardedPlacement = computed(
  () => bridge.value?.advertisement?.rewardedPlacement ?? null
);

// Minimum delay
const minimumDelayInput = ref('');

// States tracking
const bannerStates = ref<string>('');
const interstitialStates = ref<string>('');
const rewardedStates = ref<string>('');

// State arrays for tracking history
const lastBannerStates = ref<string[]>([]);
const lastInterstitialStates = ref<string[]>([]);
const lastRewardedStates = ref<string[]>([]);

// Methods
const setMinimumDelay = () => {
  if (!bridge.value?.advertisement) return;

  try {
    const value = minimumDelayInput.value;
    bridge.value.advertisement.setMinimumDelayBetweenInterstitial(value);
    minimumDelayInput.value =
      bridge.value.advertisement.minimumDelayBetweenInterstitial ?? '';
  } catch (error: any) {
    console.error('Error setting minimum delay:', error);
  }
};

const showBanner = () => {
  if (!bridge.value?.advertisement) return;
  try {
    bridge.value.advertisement.showBanner();
  } catch (error: any) {
    console.error('Error showing banner:', error);
  }
};

const hideBanner = () => {
  if (!bridge.value?.advertisement) return;
  try {
    bridge.value.advertisement.hideBanner();
  } catch (error: any) {
    console.error('Error hiding banner:', error);
  }
};

const showInterstitial = () => {
  if (!bridge.value?.advertisement) return;
  try {
    bridge.value.advertisement.showInterstitial();
  } catch (error: any) {
    console.error('Error showing interstitial:', error);
  }
};

const showRewarded = () => {
  if (!bridge.value?.advertisement) return;
  try {
    bridge.value.advertisement.showRewarded();
  } catch (error: any) {
    console.error('Error showing rewarded:', error);
  }
};

const checkAdBlock = async () => {
  if (!bridge.value?.advertisement) return;

  try {
    const result = await bridge.value.advertisement.checkAdBlock();
    isAdBlockDetected.value = String(result);
  } catch (error: any) {
    console.error('Error checking adblock:', error);
    isAdBlockDetected.value = 'Error';
  }
};

// Event handlers
const onBannerStateChanged = (state: string) => {
  lastBannerStates.value.push(state);
  if (lastBannerStates.value.length > 5) {
    lastBannerStates.value = lastBannerStates.value.slice(
      lastBannerStates.value.length - 5
    );
  }
  bannerStates.value = lastBannerStates.value.join(' → ');
};

const onInterstitialStateChanged = (state: string) => {
  lastInterstitialStates.value.push(state);
  if (lastInterstitialStates.value.length > 5) {
    lastInterstitialStates.value = lastInterstitialStates.value.slice(
      lastInterstitialStates.value.length - 5
    );
  }
  interstitialStates.value = lastInterstitialStates.value.join(' → ');
};

const onRewardedStateChanged = (state: string) => {
  lastRewardedStates.value.push(state);
  if (lastRewardedStates.value.length > 3) {
    lastRewardedStates.value = lastRewardedStates.value.slice(
      lastRewardedStates.value.length - 3
    );
  }
  rewardedStates.value = lastRewardedStates.value.join(' → ');
};

// Initialize
const initialize = () => {
  if (!bridge.value?.advertisement) return;

  // Set initial values
  const initialBannerState = bridge.value.advertisement.bannerState;
  if (initialBannerState) {
    lastBannerStates.value = [initialBannerState];
    bannerStates.value = initialBannerState;
  }

  const initialInterstitialState = bridge.value.advertisement.interstitialState;
  if (initialInterstitialState) {
    lastInterstitialStates.value = [initialInterstitialState];
    interstitialStates.value = initialInterstitialState;
  }

  const initialRewardedState = bridge.value.advertisement.rewardedState;
  if (initialRewardedState) {
    lastRewardedStates.value = [initialRewardedState];
    rewardedStates.value = initialRewardedState;
  }

  minimumDelayInput.value =
    bridge.value.advertisement.minimumDelayBetweenInterstitial ?? '';

  // Setup event listeners
  bridge.value.advertisement.on('banner_state_changed', onBannerStateChanged);
  bridge.value.advertisement.on(
    'interstitial_state_changed',
    onInterstitialStateChanged
  );
  bridge.value.advertisement.on(
    'rewarded_state_changed',
    onRewardedStateChanged
  );
};

// Cleanup
const cleanup = () => {
  if (!bridge.value?.advertisement) return;

  try {
    bridge.value.advertisement.off(
      'banner_state_changed',
      onBannerStateChanged
    );
    bridge.value.advertisement.off(
      'interstitial_state_changed',
      onInterstitialStateChanged
    );
    bridge.value.advertisement.off(
      'rewarded_state_changed',
      onRewardedStateChanged
    );
  } catch (error) {
    // Some SDKs might not have off method
    console.warn('Could not remove event listeners:', error);
  }
};

onMounted(() => {
  // Check if bridge is already available
  if (bridge.value?.advertisement) {
    initialize();
    return;
  }

  // Watch for bridge availability
  const stopWatcher = watch(
    () => bridge.value,
    newBridge => {
      if (newBridge?.advertisement) {
        initialize();
        stopWatcher();
      }
    },
    { immediate: false }
  );
});

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
/* Modern styling inspired by 21st.dev */
.section {
  background: var(--bg-secondary);
  padding: 32px;
  margin: 20px 0;
  border-radius: 16px;
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.02),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px var(--border-color);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.dark .section {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.4),
    0 6px 12px -3px rgba(0, 0, 0, 0.3),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.2),
    0 0 0 0.75px var(--border-color);
}

.section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.06),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px var(--border-color);
}

.dark .section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.5),
    0 6px 12px -3px rgba(0, 0, 0, 0.4),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.3),
    0 0 0 0.75px var(--border-color);
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 24px 0;
  letter-spacing: -0.01em;
}

.section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
  letter-spacing: -0.01em;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.delay-section,
.ad-section {
  margin: 24px 0;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: stretch;
}

.input-group input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.2s ease;
  outline: none;
}

.input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group input::placeholder {
  color: var(--text-secondary);
  opacity: 0.8;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
}

button {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
  letter-spacing: -0.01em;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

button:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section {
    padding: 20px;
    margin: 16px 0;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .input-group {
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
