<template>
  <Section title="SDK Selector" class="sdk-selector-section">
    <template #header>
      <div class="header-controls">
        <div class="selector-row">
          <div class="version-selector">
            <select v-model="selectedVersion" @change="onVersionChange">
              <option value="">-- SDK Version --</option>
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
              placeholder="URL SDK..."
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
          <div v-if="loading" class="loading">⏳ Loading SDK...</div>
          <div v-if="currentSdkVersion" class="current-sdk">
            ✅ {{ currentSdkVersion }}
          </div>
          <div v-if="error" class="error">❌ {{ error }}</div>
        </div>
      </div>
    </template>
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
.sdk-selector-section :deep(.section) {
  padding: 20px 32px;
}

.sdk-selector-section :deep(.section-header) {
  margin-bottom: 0;
  gap: 16px;
  flex-wrap: wrap;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.selector-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.version-selector select,
.custom-url input {
  padding: 10px 14px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.9em;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.version-selector select {
  min-width: 140px;
}

.custom-url input {
  flex: 1;
  min-width: 150px;
}

.version-selector select:focus,
.custom-url input:focus {
  outline: none;
  border-color: var(--accent-primary, #6366f1);
  box-shadow:
    0 0 0 3px rgba(99, 102, 241, 0.15),
    0 0 20px rgba(99, 102, 241, 0.1);
}

.dark .version-selector select:focus,
.dark .custom-url input:focus {
  border-color: var(--accent-primary, #818cf8);
  box-shadow:
    0 0 0 3px rgba(129, 140, 248, 0.2),
    0 0 25px rgba(129, 140, 248, 0.15);
}

.version-selector select::placeholder,
.custom-url input::placeholder {
  color: var(--text-secondary);
  opacity: 0.8;
}

.load-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(
    --gradient-success,
    linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)
  );
  color: white;
  min-width: 48px;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.dark .load-btn {
  background: var(
    --gradient-success,
    linear-gradient(135deg, #4ade80 0%, #2dd4bf 100%)
  );
  box-shadow:
    0 4px 15px rgba(74, 222, 128, 0.3),
    0 0 20px rgba(45, 212, 191, 0.15);
}

.load-btn:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
}

.dark .load-btn:hover:not(:disabled) {
  box-shadow:
    0 8px 25px rgba(74, 222, 128, 0.4),
    0 0 30px rgba(45, 212, 191, 0.25);
  filter: brightness(1.1);
}

.load-btn:disabled {
  background: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.5;
}

.status-info {
  font-size: 0.9em;
}

.loading {
  color: var(--accent-orange, #f59e0b);
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.15) 0%,
    rgba(251, 191, 36, 0.15) 100%
  );
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid rgba(245, 158, 11, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.dark .loading {
  color: var(--accent-yellow, #fde047);
  background: linear-gradient(
    135deg,
    rgba(251, 191, 36, 0.15) 0%,
    rgba(253, 224, 71, 0.15) 100%
  );
  border: 1px solid rgba(251, 191, 36, 0.3);
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.15);
}

.current-sdk {
  color: var(--accent-green, #22c55e);
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.15) 0%,
    rgba(20, 184, 166, 0.15) 100%
  );
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.dark .current-sdk {
  color: var(--accent-green, #4ade80);
  background: linear-gradient(
    135deg,
    rgba(74, 222, 128, 0.15) 0%,
    rgba(45, 212, 191, 0.15) 100%
  );
  border: 1px solid rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 15px rgba(74, 222, 128, 0.15);
}

.error {
  color: var(--accent-red, #ef4444);
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.15) 0%,
    rgba(236, 72, 153, 0.15) 100%
  );
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.dark .error {
  color: var(--accent-red, #f87171);
  background: linear-gradient(
    135deg,
    rgba(248, 113, 113, 0.15) 0%,
    rgba(244, 114, 182, 0.15) 100%
  );
  border: 1px solid rgba(248, 113, 113, 0.3);
  box-shadow: 0 0 15px rgba(248, 113, 113, 0.15);
}

@media (max-width: 768px) {
  .sdk-selector-section :deep(.section) {
    padding: 16px 20px;
  }

  .header-controls {
    width: 100%;
    justify-content: flex-start;
  }

  .selector-row {
    flex-wrap: wrap;
  }

  .version-selector select,
  .custom-url input {
    width: 100%;
  }
}
</style>
