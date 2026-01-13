<template>
  <Section title="Platform">
    <InfoGrid>
      <InfoItem label="ID:" :value="id" />
      <InfoItem label="Language:" :value="language" />
      <InfoItem label="Payload:" :value="payload" />
      <InfoItem label="TLD:" :value="tld" />
      <InfoItem label="Server Time:" :value="serverTime" />
      <InfoItem label="Audio Enabled:" :value="isAudioEnabled" />
      <InfoItem label="Paused:" :value="isPaused" />
      <InfoItem
        label="Get All Games Supported:"
        :value="isGetAllGamesSupported"
      />
      <InfoItem
        label="Get Game By ID Supported:"
        :value="isGetGameByIdSupported"
      />
    </InfoGrid>

    <ButtonGroup>
      <Button @click="getServerTime">Get Server Time</Button>
      <Button @click="sendGameReady">Send Game Ready</Button>
    </ButtonGroup>

    <SubSection title="Send Message">
      <InfoItem label="Status:" :value="messageStatus" />
      <InputGroup>
        <Input v-model="messageText" placeholder="Message" />
        <Button @click="sendMessage" :disabled="!messageText">
          Send Message
        </Button>
      </InputGroup>
    </SubSection>

    <SubSection v-if="isGetAllGamesSupported" title="All Games">
      <p><strong>All Games:</strong></p>
      <CodeBlock>{{ allGames }}</CodeBlock>
      <ButtonGroup>
        <Button @click="getAllGames">Get All Games</Button>
      </ButtonGroup>
    </SubSection>

    <SubSection v-if="isGetGameByIdSupported" title="Get Game By ID">
      <InputGroup>
        <Input v-model="gameId" placeholder="Game ID" />
        <Button @click="getGameById" :disabled="!gameId">Get Game By ID</Button>
      </InputGroup>
      <div v-if="gameData">
        <p><strong>Game Data:</strong></p>
        <CodeBlock>{{ gameData }}</CodeBlock>
      </div>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';

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
const isAudioEnabled = ref(false);
const isPaused = ref(false);
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

const sendGameReady = async () => {
  try {
    const eventName = bridge.value?.PLATFORM_MESSAGE?.GAME_READY || 'game_ready';
    await window.bridge.platform.sendMessage(eventName);
    console.log('Game ready event sent successfully');
  } catch (error) {
    console.error('Error sending game ready event:', error);
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

onMounted(() => {
  isPaused.value = bridge.value.platform.isPaused;
  isAudioEnabled.value = bridge.value.platform.isAudioEnabled;

  bridge.value.platform.on(
    bridge.value.EVENT_NAME.PAUSE_STATE_CHANGED,
    (value: boolean) => {
      isPaused.value = value;
    }
  );
  bridge.value.platform.on(
    bridge.value.EVENT_NAME.AUDIO_STATE_CHANGED,
    (value: boolean) => {
      isAudioEnabled.value = value;
    }
  );
});
</script>
