<template>
  <Section title="Storage">
    <InfoGrid>
      <InfoItem
        label="Is LocalStorage Supported:"
        :value="isLocalStorageSupported"
      />
      <InfoItem
        label="Is LocalStorage Available:"
        :value="isLocalStorageAvailable"
      />
      <InfoItem
        label="Is PlatformInternal Supported:"
        :value="isPlatformInternalSupported"
      />
      <InfoItem
        label="Is PlatformInternal Available:"
        :value="isPlatformInternalAvailable"
      />
    </InfoGrid>

    <SubSection title="Storage Actions">
      <InputGroup>
        <Input v-model="coinsValue" placeholder="Coins" />
        <Input v-model="levelValue" placeholder="Level" />
      </InputGroup>

      <Select v-model="storageType">
        <option value="local_storage">LocalStorage</option>
        <option value="platform_internal">PlatformInternal</option>
      </Select>

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
      </InputGroup>

      <InputGroup>
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
import InfoGrid from '../components/InfoGrid.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import Select from '../components/Select.vue';

declare global {
  interface Window {
    bridge?: any;
  }
}

const bridge = computed(() => window.bridge);

const isLocalStorageSupported = computed(() => {
  if (!bridge.value) return null;
  return bridge.value.storage.isSupported(
    bridge.value.STORAGE_TYPE.LOCAL_STORAGE
  );
});

const isLocalStorageAvailable = computed(() => {
  if (!bridge.value) return null;
  return bridge.value.storage.isAvailable(
    bridge.value.STORAGE_TYPE.LOCAL_STORAGE
  );
});

const isPlatformInternalSupported = computed(() => {
  if (!bridge.value) return null;
  return bridge.value.storage.isSupported(
    bridge.value.STORAGE_TYPE.PLATFORM_INTERNAL
  );
});

const isPlatformInternalAvailable = computed(() => {
  if (!bridge.value) return null;
  return bridge.value.storage.isAvailable(
    bridge.value.STORAGE_TYPE.PLATFORM_INTERNAL
  );
});

const coinsValue = ref('');
const levelValue = ref('');
const storageType = ref('local_storage');
const storageStatus = ref('');

const singleKey = ref('');
const singleValue = ref('');
const singleKeyResult = ref('');

const multipleKeys = ref('');
const multipleValues = ref('');
const multipleKeysResult = ref('');

const getStorageData = async () => {
  if (!bridge.value) return;

  try {
    storageStatus.value = 'Getting data...';
    console.log(
      '🔍 Getting storage data:',
      ['coins', 'level'],
      storageType.value
    );

    const data = await bridge.value.storage.get(
      ['coins', 'level'],
      storageType.value
    );

    console.log('✅ Storage data received:', data);

    if (data) {
      coinsValue.value = data[0] || '';
      levelValue.value = data[1] || '';
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
      [coinsValue.value, levelValue.value],
      storageType.value
    );

    await bridge.value.storage.set(
      ['coins', 'level'],
      [coinsValue.value, levelValue.value],
      storageType.value
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
    console.log(
      '🗑️ Deleting storage data:',
      ['coins', 'level'],
      storageType.value
    );

    await bridge.value.storage.delete(['coins', 'level'], storageType.value);

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
    console.log('🔍 Getting single key:', singleKey.value, storageType.value);

    const data = await bridge.value.storage.get(
      singleKey.value,
      storageType.value
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
    console.log(
      '💾 Setting single key:',
      singleKey.value,
      singleValue.value,
      storageType.value
    );

    await bridge.value.storage.set(
      [singleKey.value],
      [singleValue.value],
      storageType.value
    );

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
    console.log('🗑️ Deleting single key:', singleKey.value, storageType.value);

    await bridge.value.storage.delete([singleKey.value], storageType.value);

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
    console.log('🔍 Getting multiple keys:', keys, storageType.value);

    const data = await bridge.value.storage.get(keys, storageType.value);

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

    console.log('💾 Setting multiple keys:', keys, values, storageType.value);

    await bridge.value.storage.set(keys, values, storageType.value);

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
    console.log('🗑️ Deleting multiple keys:', keys, storageType.value);

    await bridge.value.storage.delete(keys, storageType.value);

    console.log('✅ Multiple keys deleted successfully');
    multipleKeysResult.value = 'Keys deleted successfully';
    multipleValues.value = '';
  } catch (error: any) {
    console.error('❌ Delete Multiple Keys Error:', error);
    multipleKeysResult.value = 'Error: ' + error.message;
  }
};
</script>
