<template>
  <Section title="Player">
    <div class="info-grid">
      <InfoItem
        label="Is Authorization Supported:"
        :value="bridge.player?.isAuthorizationSupported ?? null"
      />
    </div>
    <template v-if="bridge.player?.isAuthorizationSupported">
      <div class="info-grid">
        <InfoItem label="Is Authorized:" :value="player.isAuthorized" />
        <InfoItem label="ID:" :value="player.id" />
        <InfoItem label="Name:" :value="player.name" />
        <InfoItem label="Photos:" :value="player.photosString" />
      </div>

      <div class="info-grid">
        <InfoItem label="Extra:" :value="player.extra" />
      </div>

      <div class="photos-grid">
        <img v-for="photo in player.photos" :src="photo" alt="Player Photo" />
      </div>

      <div class="actions">
        <div class="checkbox-group">
          <label>
            <input v-model="yandexScopes" type="checkbox" class="checkbox" />
            Yandex: Authorization Scopes
          </label>
        </div>
        <button @click="authorizePlayer">Authorize</button>
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';

declare global {
  interface Window {
    bridge?: any;
  }
}

// Use bridge composable
const bridge = computed(() => window.bridge);
const player = ref<any>({
  id: null,
  name: null,
  photos: [],
  photosString: null,
  isAuthorized: false,
  extra: null,
});

const yandexScopes = ref(false);

const authorizePlayer = async () => {
  try {
    const scopes = yandexScopes.value ? ['scope1', 'scope2'] : [];
    await bridge.value.player.authorize(scopes);
    updatePlayerData();
  } catch (error: any) {
    console.error('Error authorizing player:', error);
  }
};

const updatePlayerData = async () => {
  if (!bridge.value?.player) return;

  player.value.id = bridge.value.player.id ?? null;
  player.value.name = bridge.value.player.name ?? null;
  player.value.photos = bridge.value.player.photos ?? [];
  player.value.photosString = bridge.value.player.photos
    ? JSON.stringify(bridge.value.player.photos)
    : null;
  player.value.isAuthorized = bridge.value.player.isAuthorized ?? false;
  player.value.extra = bridge.value.player.extra
    ? JSON.stringify(bridge.value.player.extra)
    : null;
};

onMounted(() => {
  updatePlayerData();
});
</script>

<style scoped>
/* Section styles moved to Section component */

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.actions {
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

.checkbox-group {
  margin-bottom: 16px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  user-select: none;
}

.checkbox-group label:hover {
  color: var(--text-primary);
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
  border-radius: 4px;
}

button {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
  letter-spacing: -0.01em;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
}

button:disabled {
  background: #adb5bd;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
