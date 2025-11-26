<template>
  <Section title="Clipboard">
    <InfoGrid>
      <InfoItem label="Is Supported:" :value="isSupported" />
    </InfoGrid>

    <SubSection title="Clipboard Operations">
      <InputGroup>
        <Input v-model="clipboardText" placeholder="Text" />
        <Button @click="readClipboard" :disabled="!isSupported"> Read </Button>
        <Button
          @click="writeClipboard"
          :disabled="!isSupported || !clipboardText"
        >
          Write
        </Button>
      </InputGroup>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';
import InfoGrid from '../components/InfoGrid.vue';

const bridge = computed(() => window.bridge);
const isSupported = computed(() => bridge.value?.clipboard?.isSupported);
const clipboardText = ref('');

const readClipboard = async () => {
  if (!bridge.value?.clipboard) return;

  try {
    const text = await bridge.value.clipboard.read();
    clipboardText.value = text;
  } catch (error: any) {
    console.error('Error reading clipboard:', error);
  }
};

const writeClipboard = async () => {
  if (!bridge.value?.clipboard || !clipboardText.value) return;

  try {
    await bridge.value.clipboard.write(clipboardText.value);
    console.log('Clipboard write success');
  } catch (error: any) {
    console.error('Error writing clipboard:', error);
  }
};
</script>
