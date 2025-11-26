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
      <InputGroup>
        <Input
          v-model="minimumDelayInput"
          placeholder="Minimum Delay Between Interstitial (ms)"
        />
        <Button @click="setMinimumDelay">Set Minimum Delay</Button>
      </InputGroup>
    </SubSection>

    <!-- Banner Section -->
    <SubSection title="Banner">
      <InfoGrid>
        <InfoItem label="Last Banner States:" :value="bannerStates" />
      </InfoGrid>
      <ButtonGroup>
        <Button @click="showBanner" :disabled="!isBannerSupported">
          Show Banner
        </Button>
        <Button @click="hideBanner" :disabled="!isBannerSupported">
          Hide Banner
        </Button>
      </ButtonGroup>
    </SubSection>

    <!-- Interstitial Section -->
    <SubSection title="Interstitial">
      <InfoGrid>
        <InfoItem
          label="Last Interstitial States:"
          :value="interstitialStates"
        />
      </InfoGrid>
      <ButtonGroup>
        <Button @click="showInterstitial" :disabled="!isInterstitialSupported">
          Show Interstitial
        </Button>
      </ButtonGroup>
    </SubSection>

    <!-- Rewarded Section -->
    <SubSection title="Rewarded">
      <InfoGrid>
        <InfoItem label="Last Rewarded States:" :value="rewardedStates" />
        <InfoItem label="Rewarded Placement:" :value="rewardedPlacement" />
      </InfoGrid>
      <ButtonGroup>
        <Button @click="showRewarded" :disabled="!isRewardedSupported">
          Show Rewarded
        </Button>
      </ButtonGroup>
    </SubSection>

    <!-- AdBlock Detection -->
    <SubSection title="AdBlock Detection">
      <ButtonGroup>
        <Button @click="checkAdBlock">Is AdBlock Detected</Button>
      </ButtonGroup>
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
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';
import ButtonGroup from '../components/ButtonGroup.vue';

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
  if (bridge.value?.advertisement) {
    initialize();
    return;
  }

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
