<template>
  <Section title="SDK Selector">
    <template #header v-if="currentSdkVersion || error || loading">
      <div class="status-info">
        <div v-if="loading" class="loading">⏳ Загрузка SDK...</div>
        <div v-if="currentSdkVersion" class="current-sdk">
          ✅ {{ currentSdkVersion }}
        </div>
        <div v-if="error" class="error">❌ {{ error }}</div>
      </div>
    </template>
    <div class="selector-row">
      <div class="version-selector">
        <select v-model="selectedVersion" @change="onVersionChange">
          <option value="">-- SDK версия --</option>
          <option
            v-for="version in availableVersions"
            :key="version"
            :value="version"
          >
            {{ version }}
          </option>
          <option value="custom">Custom URL</option>
        </select>
      </div>

      <div v-if="selectedVersion === 'custom'" class="custom-url">
        <input
          type="text"
          v-model="customUrl"
          placeholder="Введите URL SDK..."
          @input="onCustomUrlChange"
        />
      </div>

      <button
        @click="loadSdk"
        :disabled="!canLoadSdk || loading"
        class="load-btn"
      >
        {{ loading ? '⏳' : '🚀' }}
      </button>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSDK, availableVersions } from '../composables/useSDK';
import Section from './Section.vue';

const {
  selectedVersion,
  customUrl,
  currentSdkVersion,
  loading,
  error,
  canLoadSdk,
  loadSdk,
  setVersion,
  setCustomUrl,
} = useSDK();

// Auto-load SDK on mount if settings exist
onMounted(() => {
  if (selectedVersion.value || customUrl.value) {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      loadSdk();
    }, 100);
  }
});

// Methods for UI interactions
const onVersionChange = () => {
  setVersion(selectedVersion.value);
};

const onCustomUrlChange = () => {
  setCustomUrl(customUrl.value);
};
</script>

<style scoped>
.selector-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.version-selector select,
.custom-url input {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.9em;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.version-selector select {
  min-width: 120px;
}

.custom-url input {
  flex: 1;
  min-width: 150px;
}

.version-selector select:focus,
.custom-url input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
}

.dark .version-selector select:focus,
.dark .custom-url input:focus {
  border-color: var(--accent-sage, #7db87a);
  box-shadow:
    0 0 0 2px rgba(125, 184, 122, 0.2),
    0 0 15px rgba(143, 200, 160, 0.1);
}

.version-selector select::placeholder,
.custom-url input::placeholder {
  color: var(--text-secondary);
  opacity: 0.8;
}

.load-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  min-width: 40px;
}

.dark .load-btn {
  background: var(
    --gradient-primary,
    linear-gradient(135deg, #7db87a 0%, #c8909a 50%, #d4a0a8 100%)
  );
  box-shadow:
    0 2px 8px rgba(200, 144, 154, 0.25),
    0 0 15px rgba(212, 160, 168, 0.15);
}

.load-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
}

.dark .load-btn:hover:not(:disabled) {
  box-shadow:
    0 4px 16px rgba(200, 144, 154, 0.4),
    0 0 25px rgba(212, 160, 168, 0.25);
  filter: brightness(1.1);
}

.load-btn:disabled {
  background: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

.status-info {
  display: inline-block;
  font-size: 0.9em;
  margin-left: 10px;
}

.loading {
  color: #856404;
  background: #fff3cd;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .loading {
  color: var(--accent-sand, #c9b896);
  background: rgba(201, 184, 150, 0.12);
  border: 1px solid rgba(201, 184, 150, 0.3);
  box-shadow: 0 0 10px rgba(201, 184, 150, 0.15);
}

.current-sdk {
  color: #155724;
  background: #d4edda;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .current-sdk {
  color: var(--accent-mint, #8fc8a0);
  background: rgba(143, 200, 160, 0.12);
  border: 1px solid rgba(143, 200, 160, 0.3);
  box-shadow: 0 0 10px rgba(143, 200, 160, 0.15);
}

.error {
  color: #721c24;
  background: #f8d7da;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .error {
  color: #e0a0a0;
  background: rgba(200, 130, 130, 0.12);
  border: 1px solid rgba(200, 130, 130, 0.3);
  box-shadow: 0 0 10px rgba(200, 130, 130, 0.15);
}

@media (max-width: 768px) {
  .selector-row {
    flex-direction: column;
    align-items: stretch;
  }

  .version-selector select,
  .custom-url input {
    width: 100%;
  }
}
</style>
