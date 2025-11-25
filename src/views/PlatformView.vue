<template>
  <Section title="Platform">
    <InfoGrid>
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
    </InfoGrid>

    <div class="actions">
      <Button @click="getServerTime">Get Server Time</Button>
    </div>

    <div class="message-section">
      <InfoItem label="Send Message Status:" :value="messageStatus" />
      <div class="input-group">
        <input v-model="messageText" type="text" placeholder="Message" />
        <Button @click="sendMessage" :disabled="!messageText">
          Send Message
        </Button>
      </div>
    </div>

    <div class="games-section" v-if="isGetAllGamesSupported">
      <div class="games-container">
        <p><strong>All Games:</strong></p>
        <CodeBlock>{{ allGames }}</CodeBlock>
        <Button @click="getAllGames">Get All Games</Button>
      </div>
    </div>

    <div class="game-by-id-section" v-if="isGetGameByIdSupported">
      <div class="input-group">
        <input v-model="gameId" type="text" placeholder="Game ID" />
        <Button @click="getGameById" :disabled="!gameId">Get Game By ID</Button>
      </div>
      <div class="game-container">
        <p><strong>Game Data:</strong></p>
        <CodeBlock>{{ gameData }}</CodeBlock>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import Button from '../components/Button.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';

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
</script>

<style scoped>
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

.message-section,
.games-section,
.game-by-id-section {
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

.games-container,
.game-container {
  margin-top: 16px;
}

.games-container p,
.game-container p {
  margin: 0 0 12px 0;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 16px;
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

.dark .message-section :deep(.value) {
  color: #4caf50;
}

@media (max-width: 768px) {
  /* InfoGrid responsive styles moved to InfoGrid component */

  .input-group {
    flex-direction: column;
  }

  .input-group button {
    width: 100%;
  }
}
</style>
