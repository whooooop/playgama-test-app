<template>
  <div class="sdk-selector">
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

    <div v-if="currentSdkVersion || error || loading" class="status-info">
      <div v-if="loading" class="loading">⏳ Загрузка SDK...</div>
      <div v-if="currentSdkVersion" class="current-sdk">
        ✅ {{ currentSdkVersion }}
      </div>
      <div v-if="error" class="error">❌ {{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSDK, availableVersions } from '../composables/useSDK';

// Use bridge composable
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
.sdk-selector {
  background: var(--bg-primary);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

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
  border-color: var(--accent-purple, #8a2be2);
  box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.3), 0 0 15px rgba(0, 191, 255, 0.2);
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
  background: var(--gradient-primary, linear-gradient(135deg, #8a2be2 0%, #00bfff 50%, #ff1493 100%));
  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.4), 0 0 15px rgba(0, 191, 255, 0.2);
}

.load-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
}

.dark .load-btn:hover:not(:disabled) {
  box-shadow: 0 4px 16px rgba(138, 43, 226, 0.6), 0 0 25px rgba(0, 191, 255, 0.4);
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
  font-size: 0.9em;
}

.loading {
  color: #856404;
  background: #fff3cd;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .loading {
  color: var(--accent-yellow, #ffd700);
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.4);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.current-sdk {
  color: #155724;
  background: #d4edda;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .current-sdk {
  color: var(--accent-green, #00ff88);
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.error {
  color: #721c24;
  background: #f8d7da;
  padding: 5px 10px;
  border-radius: 4px;
  display: inline-block;
}

.dark .error {
  color: var(--accent-pink, #ff1493);
  background: rgba(255, 20, 147, 0.2);
  border: 1px solid rgba(255, 20, 147, 0.4);
  box-shadow: 0 0 10px rgba(255, 20, 147, 0.3);
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
