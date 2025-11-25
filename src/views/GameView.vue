<template>
  <Section title="Game">
    <InfoGrid>
      <InfoItem label="Visibility States:" :value="visibilityStates" />
    </InfoGrid>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import InfoGrid from '../components/InfoGrid.vue';

// Extend Window interface for bridge
declare global {
  interface Window {
    bridge?: any;
  }
}

// Computed bridge
const bridge = computed(() => window.bridge);

const visibilityStates = ref('');

const initializeGame = () => {
  if (!bridge.value) {
    visibilityStates.value = '';
    return;
  }

  try {
    // Check if bridge has game property and visibilityState
    if (
      bridge.value.game &&
      typeof bridge.value.game.visibilityState !== 'undefined'
    ) {
      // Initialize with current visibility state
      visibilityStates.value = bridge.value.game.visibilityState;

      // Listen for visibility state changes
      if (typeof bridge.value.game.on === 'function') {
        bridge.value.game.on('visibility_state_changed', (state: string) => {
          visibilityStates.value += ' → ' + state;
        });
      }
    } else {
      visibilityStates.value = 'Game API not available';
    }
  } catch (error: any) {
    console.error('Error initializing game section:', error);
    visibilityStates.value = 'Error: ' + error.message;
  }
};

// Watch for bridge availability
watch(
  () => window.bridge,
  newBridge => {
    if (newBridge) {
      initializeGame();
    } else {
      visibilityStates.value = '';
    }
  },
  { immediate: true }
);
</script>
