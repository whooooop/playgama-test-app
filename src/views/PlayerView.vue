<template>
  <div class="section">
    <h2>Player</h2>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';

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
/* Modern styling inspired by 21st.dev */
.section {
  background: white;
  padding: 32px;
  margin: 20px 0;
  border-radius: 16px;
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.02),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px rgba(0, 0, 0, 0.04);
  transition:
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

.section:hover {
  box-shadow:
    0 32px 56px -12px rgba(0, 0, 0, 0.06),
    0 6px 12px -3px rgba(0, 0, 0, 0.02),
    0 3px 6px -1.5px rgba(0, 0, 0, 0.01),
    0 0 0 0.75px rgba(0, 0, 0, 0.04);
}

.section h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  letter-spacing: -0.01em;
}

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
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.02);
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
  color: #495057;
  user-select: none;
}

.checkbox-group label:hover {
  color: #1a1a1a;
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
  .section {
    padding: 20px;
    margin: 16px 0;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
