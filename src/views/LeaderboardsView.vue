<template>
  <Section title="Leaderboards">
    <InfoGrid>
      <InfoItem label="Type:" :value="type" />
    </InfoGrid>

    <SubSection title="Set Score">
      <InputGroup>
        <Input v-model="leaderboardId" placeholder="Leaderboard ID" />
        <Input v-model="score" placeholder="Score" />
        <Button @click="setScore" :disabled="!leaderboardId || !score">
          Set Score
        </Button>
      </InputGroup>
    </SubSection>

    <SubSection title="Get Entries">
      <InputGroup>
        <Input v-model="getEntriesId" placeholder="Leaderboard ID" />
        <Button @click="getEntries" :disabled="!getEntriesId">
          Get Entries
        </Button>
      </InputGroup>
      <div v-if="entries">
        <CodeBlock>{{ entries }}</CodeBlock>
      </div>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import CodeBlock from '../components/CodeBlock.vue';
import InfoGrid from '../components/InfoGrid.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';

const bridge = computed(() => window.bridge);
const type = computed(() => bridge.value?.leaderboards?.type);

const leaderboardId = ref('');
const score = ref('');
const getEntriesId = ref('');
const entries = ref('');

const setScore = async () => {
  if (!bridge.value?.leaderboards || !leaderboardId.value || !score.value)
    return;

  try {
    await bridge.value.leaderboards.setScore(leaderboardId.value, score.value);
  } catch (error: any) {
    console.error('Error setting score:', error);
  }
};

const getEntries = async () => {
  if (!bridge.value?.leaderboards || !getEntriesId.value) return;

  try {
    const data = await bridge.value.leaderboards.getEntries(getEntriesId.value);
    let text = '';
    data.forEach((e: any) => {
      text +=
        'ID: ' +
        e.id +
        ', name: ' +
        e.name +
        ', score: ' +
        e.score +
        ', rank: ' +
        e.rank +
        ', photo: ' +
        e.photo +
        '\n';
    });
    entries.value = text.trim();
  } catch (error: any) {
    console.error('Error getting entries:', error);
    entries.value = 'Error: ' + error.message;
  }
};
</script>
