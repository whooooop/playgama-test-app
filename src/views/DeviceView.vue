<template>
  <Section title="Device">
    <InfoGrid>
      <InfoItem label="Type:" :value="deviceType" />
    </InfoGrid>
  </Section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import InfoGrid from '../components/InfoGrid.vue';

const bridge = computed(() => window.bridge);

const deviceType = computed(() => {
  if (!bridge.value?.device?.type) return null;
  return bridge.value.device.type;
});
</script>
