<template>
  <div class="section">
    <h2>Game</h2>
    <div class="info-grid">
      <InfoItem label="Visibility States:" :value="visibilityStates" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InfoItem from '../components/InfoItem.vue';

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
/* Modern styling inspired by 21st.dev */
.section {
  background: white;
  padding: 32px;
  margin: 20px 0;
  border-radius: 16px;
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.02),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px rgba(0, 0, 0, 0.04);
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.06),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px rgba(0, 0, 0, 0.04);
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  letter-spacing: -0.01em;
}

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
