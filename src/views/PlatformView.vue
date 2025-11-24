<template>
  <div class="section">
    <h2>Platform</h2>
    <div class="info-grid">
      <InfoItem label="ID:" :value="id" />
      <InfoItem label="Language:" :value="language" />
      <InfoItem label="Payload:" :value="payload" />
      <InfoItem label="TLD:" :value="tld" />
      <InfoItem label="Server Time:" :value="serverTime" />
      <InfoItem label="Audio Enabled:" :value="isAudioEnabled" />
      <InfoItem
        label="Get All Games Supported:"
        :value="isGetAllGamesSupported"
      />
      <InfoItem
        label="Get Game By ID Supported:"
        :value="isGetGameByIdSupported"
      />
    </div>

    <div class="actions">
      <button @click="getServerTime">Get Server Time</button>
    </div>

    <div class="message-section">
      <InfoItem label="Send Message Status:" :value="messageStatus" />
      <div class="input-group">
        <input v-model="messageText" type="text" placeholder="Message" />
        <button @click="sendMessage" :disabled="!messageText">
          Send Message
        </button>
      </div>
    </div>

    <div class="games-section" v-if="isGetAllGamesSupported">
      <div class="games-container">
        <p><strong>All Games:</strong></p>
        <pre>{{ allGames }}</pre>
        <button @click="getAllGames">Get All Games</button>
      </div>
    </div>

    <div class="game-by-id-section" v-if="isGetGameByIdSupported">
      <div class="input-group">
        <input v-model="gameId" type="text" placeholder="Game ID" />
        <button @click="getGameById" :disabled="!gameId">Get Game By ID</button>
      </div>
      <div class="game-container">
        <p><strong>Game Data:</strong></p>
        <pre>{{ gameData }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';

// Extend Window interface for bridge
declare global {
  interface Window {
    bridge?: any;
  }
}

const serverTime = ref('N/A');
const messageStatus = ref('Ready');
const messageText = ref('');
const allGames = ref('');
const gameId = ref('');
const gameData = ref('');

const bridge = computed(() => window.bridge);
const id = computed(() => bridge.value?.platform?.id);
const language = computed(() => bridge.value?.platform?.language);
const payload = computed(() => bridge.value?.platform?.payload);
const tld = computed(() => bridge.value?.platform?.tld);
const isAudioEnabled = computed(() => bridge.value?.platform?.isAudioEnabled);
const isGetAllGamesSupported = computed(
  () => bridge.value?.platform?.isGetAllGamesSupported
);
const isGetGameByIdSupported = computed(
  () => bridge.value?.platform?.isGetGameByIdSupported
);

const getServerTime = async () => {
  try {
    const time = await window.bridge.platform.getServerTime();
    serverTime.value = new Date(time).toLocaleString();
  } catch (error) {
    console.error('Error getting server time:', error);
    serverTime.value = 'Error';
  }
};

const sendMessage = async () => {
  if (!messageText.value) return;

  try {
    messageStatus.value = 'Sending...';
    await window.bridge.platform.sendMessage(messageText.value);
    messageStatus.value = 'Sent successfully';
    messageText.value = '';
  } catch (error) {
    console.error('Error sending message:', error);
    messageStatus.value = 'Error';
  }
};

const getAllGames = async () => {
  try {
    const games = await window.bridge.platform.getAllGames();
    allGames.value = JSON.stringify(games, null, 2);
  } catch (error: any) {
    console.error('Error getting all games:', error);
    allGames.value = 'Error: ' + error.message;
  }
};

const getGameById = async () => {
  if (!gameId.value) return;

  try {
    const game = await window.bridge.platform.getGameById(gameId.value);
    gameData.value = JSON.stringify(game, null, 2);
  } catch (error: any) {
    console.error('Error getting game by ID:', error);
    gameData.value = 'Error: ' + error.message;
  }
};

// Initialize when bridge becomes available
watch(
  () => window.bridge,
  () => {
    // Computed properties will automatically update
  },
  { immediate: true }
);
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

.actions {
  margin: 24px 0;
}

.input-group {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  align-items: stretch;
}

.input-group input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
  outline: none;
}

.input-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-group input:disabled {
  background: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.6;
}

.input-group input::placeholder {
  color: #adb5bd;
  opacity: 0.8;
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

.message-section,
.games-section,
.game-by-id-section {
  margin: 24px 0;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.02);
}

.games-container,
.game-container {
  margin-top: 16px;
}

.games-container p,
.game-container p {
  margin: 0 0 12px 0;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 16px;
}

pre {
  background: #1a1a1a;
  color: #e9ecef;
  padding: 16px;
  border-radius: 12px;
  overflow-x: auto;
  font-size: 13px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.6;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.games-container button,
.game-container button {
  margin-top: 12px;
}

/* Status indicators */
.message-section :deep(.info-item) {
  background: transparent;
  border: none;
  padding: 8px 0;
}

.message-section :deep(.value) {
  font-weight: 500;
  color: #28a745;
}

/* Smooth scrolling */
pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
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

  .input-group {
    flex-direction: column;
  }

  .input-group button {
    width: 100%;
  }
}
</style>
