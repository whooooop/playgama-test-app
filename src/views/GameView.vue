<template>
  <Section title="Game">
    <div class="info-grid">
      <InfoItem label="Visibility States:" :value="visibilityStates" />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';

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

<style scoped>
/* Section styles moved to Section component */

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
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
}
</style>
