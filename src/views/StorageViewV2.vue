<template>
  <Section title="Storage (v2 API)">
    <SubSection title="Storage Actions">
      <InputGroup>
        <Input v-model="coinsValue" placeholder="Coins" />
        <Input v-model="levelValue" placeholder="Level" />
      </InputGroup>

      <ButtonGroup>
        <Button @click="getStorageData">Get Data</Button>
        <Button @click="setStorageData">Set Data</Button>
        <Button @click="deleteStorageData">Delete Data</Button>
      </ButtonGroup>

      <InfoItem v-if="storageStatus" label="Status:" :value="storageStatus" />
    </SubSection>

    <SubSection title="Single Key Operations">
      <InputGroup>
        <Input v-model="singleKey" placeholder="Key" />
        <Input v-model="singleValue" placeholder="Value" />
      </InputGroup>

      <Checkbox
        v-model="tryParseJson"
        label="Parse JSON on read (tryParseJson)"
      />

      <ButtonGroup>
        <Button @click="getSingleKey" :disabled="!singleKey">
          Get Single Key
        </Button>
        <Button @click="setSingleKey" :disabled="!singleKey">
          Set Single Key
        </Button>
        <Button @click="deleteSingleKey" :disabled="!singleKey">
          Delete Single Key
        </Button>
      </ButtonGroup>

      <div v-if="singleKeyResult">
        <InfoItem label="Single Key Result:" :value="''" />
        <CodeBlock>{{ singleKeyResult }}</CodeBlock>
      </div>
    </SubSection>

    <SubSection title="Multiple Keys Operations">
      <InputGroup>
        <Input v-model="multipleKeys" placeholder="Keys (comma separated)" />
        <Input
          v-model="multipleValues"
          placeholder="Values (comma separated)"
        />
      </InputGroup>

      <ButtonGroup>
        <Button @click="getMultipleKeys" :disabled="!multipleKeys">
          Get Multiple Keys
        </Button>
        <Button @click="setMultipleKeys" :disabled="!multipleKeys">
          Set Multiple Keys
        </Button>
        <Button @click="deleteMultipleKeys" :disabled="!multipleKeys">
          Delete Multiple Keys
        </Button>
      </ButtonGroup>

      <div v-if="multipleKeysResult">
        <InfoItem label="Multiple Keys Result:" :value="''" />
        <CodeBlock>{{ multipleKeysResult }}</CodeBlock>
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
import CodeBlock from '../components/CodeBlock.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import Checkbox from '../components/Checkbox.vue';

const bridge = computed(() => window.bridge);

const coinsValue = ref('');
const levelValue = ref('');
const storageStatus = ref('');

const singleKey = ref('');
const singleValue = ref('');
const singleKeyResult = ref('');
const tryParseJson = ref(true);

const multipleKeys = ref('');
const multipleValues = ref('');
const multipleKeysResult = ref('');

const getStorageData = async () => {
  if (!bridge.value) return;

  try {
    storageStatus.value = 'Getting data...';
    console.log('🔍 Getting storage data:', ['coins', 'level']);

    const data = await bridge.value.storage.get(['coins', 'level']);

    console.log('✅ Storage data received:', data);

    if (data) {
      coinsValue.value = data[0] ?? '';
      levelValue.value = data[1] ?? '';
      storageStatus.value = 'Data retrieved successfully';
    } else {
      storageStatus.value = 'No data found';
    }
  } catch (error: any) {
    console.error('❌ Get Storage Data Error:', error);
    storageStatus.value = 'Error getting data: ' + error.message;
  }
};

const setStorageData = async () => {
  if (!bridge.value) return;

  try {
    storageStatus.value = 'Setting data...';
    console.log(
      '💾 Setting storage data:',
      ['coins', 'level'],
      [coinsValue.value, levelValue.value]
    );

    await bridge.value.storage.set(
      ['coins', 'level'],
      [coinsValue.value, levelValue.value]
    );

    console.log('✅ Storage data saved successfully');
    storageStatus.value = 'Data saved successfully';
  } catch (error: any) {
    console.error('❌ Set Storage Data Error:', error);
    storageStatus.value = 'Error saving data: ' + error.message;
  }
};

const deleteStorageData = async () => {
  if (!bridge.value) return;

  try {
    storageStatus.value = 'Deleting data...';
    console.log('🗑️ Deleting storage data:', ['coins', 'level']);

    await bridge.value.storage.delete(['coins', 'level']);

    console.log('✅ Storage data deleted successfully');
    coinsValue.value = '';
    levelValue.value = '';
    storageStatus.value = 'Data deleted successfully';
  } catch (error: any) {
    console.error('❌ Delete Storage Data Error:', error);
    storageStatus.value = 'Error deleting data: ' + error.message;
  }
};

const getSingleKey = async () => {
  if (!bridge.value || !singleKey.value) return;

  try {
    console.log('🔍 Getting single key:', singleKey.value, {
      tryParseJson: tryParseJson.value,
    });

    const data = await bridge.value.storage.get(
      singleKey.value,
      tryParseJson.value
    );

    console.log('✅ Single key data received:', data);
    singleKeyResult.value = JSON.stringify(data, null, 2);
  } catch (error: any) {
    console.error('❌ Get Single Key Error:', error);
    singleKeyResult.value = 'Error: ' + error.message;
  }
};

const setSingleKey = async () => {
  if (!bridge.value || !singleKey.value) return;

  try {
    console.log('💾 Setting single key:', singleKey.value, singleValue.value);

    await bridge.value.storage.set(singleKey.value, singleValue.value);

    console.log('✅ Single key saved successfully');
    singleKeyResult.value = 'Key saved successfully';
  } catch (error: any) {
    console.error('❌ Set Single Key Error:', error);
    singleKeyResult.value = 'Error: ' + error.message;
  }
};

const deleteSingleKey = async () => {
  if (!bridge.value || !singleKey.value) return;

  try {
    console.log('🗑️ Deleting single key:', singleKey.value);

    await bridge.value.storage.delete(singleKey.value);

    console.log('✅ Single key deleted successfully');
    singleKeyResult.value = 'Key deleted successfully';
    singleValue.value = '';
  } catch (error: any) {
    console.error('❌ Delete Single Key Error:', error);
    singleKeyResult.value = 'Error: ' + error.message;
  }
};

const getMultipleKeys = async () => {
  if (!bridge.value || !multipleKeys.value) return;

  try {
    const keys = multipleKeys.value.split(',').map(key => key.trim());
    console.log('🔍 Getting multiple keys:', keys, {
      tryParseJson: tryParseJson.value,
    });

    const data = await bridge.value.storage.get(keys, tryParseJson.value);

    console.log('✅ Multiple keys data received:', data);
    multipleKeysResult.value = JSON.stringify(data, null, 2);
  } catch (error: any) {
    console.error('❌ Get Multiple Keys Error:', error);
    multipleKeysResult.value = 'Error: ' + error.message;
  }
};

const setMultipleKeys = async () => {
  if (!bridge.value || !multipleKeys.value) return;

  try {
    const keys = multipleKeys.value.split(',').map(key => key.trim());
    const values = multipleValues.value.split(',').map(value => value.trim());

    console.log('💾 Setting multiple keys:', keys, values);

    await bridge.value.storage.set(keys, values);

    console.log('✅ Multiple keys saved successfully');
    multipleKeysResult.value = 'Keys saved successfully';
  } catch (error: any) {
    console.error('❌ Set Multiple Keys Error:', error);
    multipleKeysResult.value = 'Error: ' + error.message;
  }
};

const deleteMultipleKeys = async () => {
  if (!bridge.value || !multipleKeys.value) return;

  try {
    const keys = multipleKeys.value.split(',').map(key => key.trim());
    console.log('🗑️ Deleting multiple keys:', keys);

    await bridge.value.storage.delete(keys);

    console.log('✅ Multiple keys deleted successfully');
    multipleKeysResult.value = 'Keys deleted successfully';
    multipleValues.value = '';
  } catch (error: any) {
    console.error('❌ Delete Multiple Keys Error:', error);
    multipleKeysResult.value = 'Error: ' + error.message;
  }
};
</script>

<style scoped>
.storage-note {
  margin: 0 0 20px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.storage-note code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: 1px 6px;
  border-radius: 6px;
}
</style>
