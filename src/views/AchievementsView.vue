<template>
  <Section title="Achievements">
    <InfoGrid>
      <InfoItem label="Is Supported:" :value="isSupported" />
      <InfoItem label="Is Get List Supported:" :value="isGetListSupported" />
      <InfoItem
        label="Is Native Popup Supported:"
        :value="isNativePopupSupported"
      />
    </InfoGrid>

    <SubSection title="Get List">
      <ButtonGroup>
        <Button @click="getList" :disabled="!isGetListSupported">
          Get List
        </Button>
      </ButtonGroup>
      <div v-if="listResult">
        <CodeBlock>{{ listResult }}</CodeBlock>
      </div>
    </SubSection>

    <SubSection title="Show Native Popup">
      <ButtonGroup>
        <Button @click="showNativePopup" :disabled="!isNativePopupSupported">
          Show Native Popup
        </Button>
      </ButtonGroup>
    </SubSection>

    <SubSection title="Unlock Achievement">
      <InputGroup>
        <Input v-model="achievementId" placeholder="Achievement Id (key)" />
        <Input v-model="achievementName" placeholder="Achievement Name" />
      </InputGroup>
      <ButtonGroup>
        <Button @click="unlock" :disabled="!isSupported || !achievementId">
          Unlock
        </Button>
      </ButtonGroup>
      <div v-if="unlockStatus">
        <InfoItem label="Response:" :value="''" />
        <CodeBlock>{{ unlockStatus }}</CodeBlock>
      </div>
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
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';

const bridge = computed(() => window.bridge);
const isSupported = computed(() => bridge.value?.achievements?.isSupported);
const isGetListSupported = computed(
  () => bridge.value?.achievements?.isGetListSupported
);
const isNativePopupSupported = computed(
  () => bridge.value?.achievements?.isNativePopupSupported
);

const listResult = ref('');
const achievementId = ref('');
const achievementName = ref('');
const unlockStatus = ref('');

const getList = async () => {
  if (!bridge.value?.achievements) return;

  try {
    const list = await bridge.value.achievements.getList();
    listResult.value = JSON.stringify(list, undefined, 2);
  } catch (error: any) {
    console.error('Error getting achievements list:', error);
    listResult.value = 'Error: ' + error.message;
  }
};

const showNativePopup = async () => {
  if (!bridge.value?.achievements) return;

  try {
    await bridge.value.achievements.showNativePopup();
  } catch (error: any) {
    console.error('Error showing native popup:', error);
  }
};

const unlock = async () => {
  if (!bridge.value?.achievements || !achievementId.value) return;

  try {
    let options: any = {};

    const platformId = bridge.value.platform?.id;
    switch (platformId) {
      case 'lagged':
        options = {
          achievement: achievementId.value,
        };
        break;
      case 'y8':
        options = {
          achievement: achievementName.value,
          achievementkey: achievementId.value,
        };
        break;
      default:
        options = {
          achievement: achievementId.value,
        };
        break;
    }

    const result = await bridge.value.achievements.unlock(options);
    unlockStatus.value = JSON.stringify(result, undefined, 2);
  } catch (error: any) {
    console.error('Error unlocking achievement:', error);
    unlockStatus.value = 'Error: ' + error.message;
  }
};
</script>
