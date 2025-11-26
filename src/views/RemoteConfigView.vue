<template>
  <Section title="Remote Config">
    <InfoGrid>
      <InfoItem label="Is Supported:" :value="isSupported" />
    </InfoGrid>

    <SubSection title="Get Config">
      <ButtonGroup>
        <Button @click="getConfig">Get Config</Button>
      </ButtonGroup>
      <CodeBlock v-if="config">{{ config }}</CodeBlock>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';

const bridge = computed(() => window.bridge);
const isSupported = computed(() => bridge.value?.remoteConfig?.isSupported);
const config = ref('');

const getConfig = async () => {
  if (!bridge.value?.remoteConfig) return;

  try {
    const remoteConfig = await bridge.value.remoteConfig.get();
    config.value = JSON.stringify(remoteConfig, undefined, 2);
  } catch (error: any) {
    console.error('Error getting remote config:', error);
    config.value = 'Error: ' + error.message;
  }
};
</script>
