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

    <div class="storage-actions">
      <div class="input-group">
        <input v-model="coinsValue" type="text" placeholder="Coins" />
        <input v-model="levelValue" type="text" placeholder="Level" />
      </div>

      <div class="select-group">
        <select v-model="storageType">
          <option value="local_storage">LocalStorage</option>
          <option value="platform_internal">PlatformInternal</option>
        </select>
      </div>

      <div class="button-group">
        <Button @click="getStorageData">Get Data</Button>
        <Button @click="setStorageData">Set Data</Button>
        <Button @click="deleteStorageData">Delete Data</Button>
      </div>

      <div v-if="storageStatus" class="status-message">
        <strong>Status:</strong> {{ storageStatus }}
      </div>
    </div>

    <!-- Single Key Operations -->
    <SubSection title="Single Key Operations">
      <div class="input-group">
        <input v-model="singleKey" type="text" placeholder="Key" />
        <input v-model="singleValue" type="text" placeholder="Value" />
      </div>

      <div class="button-group">
        <Button @click="getSingleKey" :disabled="!singleKey">
          Get Single Key
        </Button>
        <Button @click="setSingleKey" :disabled="!singleKey">
          Set Single Key
        </Button>
        <Button @click="deleteSingleKey" :disabled="!singleKey">
          Delete Single Key
        </Button>
      </div>

      <div v-if="singleKeyResult" class="result-display">
        <strong>Single Key Result:</strong>
        <CodeBlock>{{ singleKeyResult }}</CodeBlock>
      </div>
    </SubSection>

    <!-- Multiple Keys Operations -->
    <SubSection title="Multiple Keys Operations">
      <div class="input-group">
        <input
          v-model="multipleKeys"
          type="text"
          placeholder="Keys (comma separated)"
        />
      </div>

      <div class="input-group">
        <input
          v-model="multipleValues"
          type="text"
          placeholder="Values (comma separated)"
        />
      </div>

      <div class="button-group">
        <Button @click="getMultipleKeys" :disabled="!multipleKeys">
          Get Multiple Keys
        </Button>
        <Button @click="setMultipleKeys" :disabled="!multipleKeys">
          Set Multiple Keys
        </Button>
        <Button @click="deleteMultipleKeys" :disabled="!multipleKeys">
          Delete Multiple Keys
        </Button>
      </div>

      <div v-if="multipleKeysResult" class="result-display">
        <strong>Multiple Keys Result:</strong>
        <CodeBlock>{{ multipleKeysResult }}</CodeBlock>
      </div>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';

// Extend Window interface for bridge
declare global {
  interface Window {
    bridge?: any;
  }
}

// Computed bridge
const bridge = computed(() => window.bridge);

// Computed storage data
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

// Single key operations
const singleKey = ref('');
const singleValue = ref('');
const singleKeyResult = ref('');

// Multiple keys operations
const multipleKeys = ref('');
const multipleValues = ref('');
const multipleKeysResult = ref('');

// Methods
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

// Single key operations
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

// Multiple keys operations
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
.storage-actions {
  margin: 24px 0;
  padding: 20px;
  background: var(--bg-primary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: stretch;
}

.input-group input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 14px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.2s ease;
  outline: none;
}

.input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group input:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.6;
}

.input-group input::placeholder {
  color: var(--text-secondary);
  opacity: 0.8;
}

.select-group {
  margin-bottom: 16px;
}

.select-group select {
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  min-width: 200px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.select-group select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select-group select:disabled {
  background: var(--bg-primary);
  cursor: not-allowed;
  opacity: 0.6;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.status-message {
  padding: 12px 16px;
  background: var(--bg-primary);
  border-radius: 12px;
  font-size: 14px;
  margin-top: 16px;
  color: var(--text-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.status-message strong {
  color: var(--text-primary);
  font-weight: 600;
}

.result-display {
  margin-top: 16px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.result-display strong {
  display: block;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 14px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }

  .select-group select {
    width: 100%;
  }
}
</style>
