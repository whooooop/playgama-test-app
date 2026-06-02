<template>
  <StorageViewV2 v-if="effectiveApi === 'v2'" />
  <StorageViewV1 v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Section from '../components/Section.vue';
import StorageViewV1 from './StorageViewV1.vue';
import StorageViewV2 from './StorageViewV2.vue';
import { useSDK } from '../composables/useSDK';
import { isLatestVersion } from '../utils/version';

// The storage module was redesigned in this version — anything >= it uses the
// v2 panel (get/set/delete only), anything below uses the v1 panel.
const STORAGE_V2_MIN_VERSION = '2.0.0';

const { currentSdkVersion } = useSDK();
const bridge = computed(() => window.bridge);

// Pick a comparable version string: the bridge instance is the most accurate
// (covers custom URL builds), falling back to the selected SDK version. Returns
// null for non-numeric values like "Custom URL".
const resolvedVersion = computed<string | null>(() => {
  const candidates = [bridge.value?.version, currentSdkVersion.value];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && /^v?\d/.test(candidate.trim())) {
      return candidate.trim();
    }
  }
  return null;
});

const effectiveApi = computed<'v1' | 'v2'>(() => {
  const version = resolvedVersion.value;
  if (version) {
    return isLatestVersion(version, STORAGE_V2_MIN_VERSION) ? 'v2' : 'v1';
  }

  // Version unknown (e.g. a custom build without a version getter): fall back to
  // capability sniffing. v1 exposes the STORAGE_TYPE enum + per-type capability
  // checks on the storage module; v2 removed both, leaving only get/set/delete.
  const b = bridge.value;
  if (b?.STORAGE_TYPE && typeof b?.storage?.isSupported === 'function') {
    return 'v1';
  }
  return 'v2';
});
</script>

<style scoped>
.storage-badge {
  margin-left: auto;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-secondary);
}

.storage-badge--v2 {
  border-color: rgba(99, 102, 241, 0.4);
  color: var(--accent-primary, #6366f1);
}

.storage-empty {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}
</style>
