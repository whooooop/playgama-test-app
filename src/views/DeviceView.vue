<template>
  <div class="section">
    <h2>Device</h2>
    <div class="info-grid">
      <InfoItem label="Type:" :value="deviceType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import InfoItem from '../components/InfoItem.vue';

// Extend Window interface for bridge
declare global {
  interface Window {
    bridge?: any;
  }
}

// Computed bridge
const bridge = computed(() => window.bridge);

// Computed device data
const deviceType = computed(() => {
  if (!bridge.value?.device?.type) return null;
  return bridge.value.device.type;
});

// Watch for bridge availability
watch(
  () => window.bridge,
  () => {
    // Computed properties will automatically update
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
