<template>
  <Section title="Player">
    <InfoGrid>
      <InfoItem
        label="Is Authorization Supported:"
        :value="bridge.player?.isAuthorizationSupported ?? null"
      />
    </InfoGrid>
    <template v-if="bridge.player?.isAuthorizationSupported">
      <InfoGrid>
        <InfoItem label="Is Authorized:" :value="player.isAuthorized" />
        <InfoItem label="ID:" :value="player.id" />
        <InfoItem label="Name:" :value="player.name" />
        <InfoItem label="Photos:" :value="player.photosString" />
      </InfoGrid>

      <CodeBlock>{{ player.extra }}</CodeBlock>

      <PhotosGrid :photos="player.photos" />

      <SubSection title="Authorization">
        <CheckboxGroup>
          <Checkbox v-model="yandexScopes">
            Yandex: Authorization Scopes
          </Checkbox>
        </CheckboxGroup>
        <ButtonGroup>
          <Button @click="authorizePlayer">Authorize</Button>
        </ButtonGroup>
      </SubSection>
    </template>
  </Section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import InfoGrid from '../components/InfoGrid.vue';
import Checkbox from '../components/Checkbox.vue';
import CheckboxGroup from '../components/CheckboxGroup.vue';
import PhotosGrid from '../components/PhotosGrid.vue';
import CodeBlock from '../components/CodeBlock.vue';

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
    ? JSON.stringify(bridge.value.player.extra, undefined, 2)
    : null;
};

onMounted(() => {
  updatePlayerData();
});
</script>
