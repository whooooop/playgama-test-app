<template>
  <Section title="Advertisement">
    <InfoGrid>
      <InfoItem label="Is Banner Supported:" :value="isBannerSupported" />
      <InfoItem
        label="Is Interstitial Supported:"
        :value="isInterstitialSupported"
      />
      <InfoItem label="Is Rewarded Supported:" :value="isRewardedSupported" />
      <InfoItem label="Is AdBlock Detected:" :value="isAdBlockDetected" />
    </InfoGrid>

    <!-- Minimum Delay Between Interstitial -->
    <SubSection
      title="Minimum Delay Between Interstitial"
      description="Sets the minimum time delay (in milliseconds) between showing interstitial ads. This prevents showing ads too frequently and improves user experience."
    >
      <div class="input-group">
        <input
          v-model="minimumDelayInput"
          type="text"
          placeholder="Minimum Delay Between Interstitial (ms)"
        />
        <Button @click="setMinimumDelay">Set Minimum Delay</Button>
      </div>
    </SubSection>

    <!-- Banner Section -->
    <SubSection title="Banner">
      <InfoGrid>
        <InfoItem label="Last Banner States:" :value="bannerStates" />
      </InfoGrid>
      <div class="button-group">
        <Button @click="showBanner" :disabled="!isBannerSupported">
          Show Banner
        </Button>
        <Button @click="hideBanner" :disabled="!isBannerSupported">
          Hide Banner
        </Button>
      </div>
    </SubSection>

    <!-- Interstitial Section -->
    <SubSection title="Interstitial">
      <InfoGrid>
        <InfoItem
          label="Last Interstitial States:"
          :value="interstitialStates"
        />
      </InfoGrid>
      <div class="button-group">
        <Button @click="showInterstitial" :disabled="!isInterstitialSupported">
          Show Interstitial
        </Button>
      </div>
    </SubSection>

    <!-- Rewarded Section -->
    <SubSection title="Rewarded">
      <InfoGrid>
        <InfoItem label="Last Rewarded States:" :value="rewardedStates" />
        <InfoItem label="Rewarded Placement:" :value="rewardedPlacement" />
      </InfoGrid>
      <div class="button-group">
        <Button @click="showRewarded" :disabled="!isRewardedSupported">
          Show Rewarded
        </Button>
      </div>
    </SubSection>

    <!-- AdBlock Detection -->
    <SubSection title="AdBlock Detection">
      <div class="button-group">
        <Button @click="checkAdBlock">Is AdBlock Detected</Button>
      </div>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import InfoGrid from '../components/InfoGrid.vue';

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

@media (max-width: 768px) {
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
