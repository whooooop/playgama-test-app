<template>
  <Section title="Device">
    <div class="info-grid">
      <InfoItem label="Type:" :value="deviceType" />
    </div>
  </Section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
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
/* Section styles moved to Section component */

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
