<template>
  <Section title="Social">
    <InfoGrid>
      <InfoItem label="Is Share Supported:" :value="isShareSupported" />
      <InfoItem
        label="Is Invite Friends Supported:"
        :value="isInviteFriendsSupported"
      />
      <InfoItem
        label="Is Join Community Supported:"
        :value="isJoinCommunitySupported"
      />
      <InfoItem
        label="Is Create Post Supported:"
        :value="isCreatePostSupported"
      />
      <InfoItem
        label="Is Add To Home Screen Supported:"
        :value="isAddToHomeScreenSupported"
      />
      <InfoItem
        label="Is Add To Favorites Supported:"
        :value="isAddToFavoritesSupported"
      />
      <InfoItem label="Is Rate Supported:" :value="isRateSupported" />
    </InfoGrid>

    <SubSection title="Actions">
      <ButtonGroup>
        <Button @click="inviteFriends" :disabled="!isInviteFriendsSupported">
          Invite Friends
        </Button>
        <Button
          @click="addToHomeScreen"
          :disabled="!isAddToHomeScreenSupported"
        >
          Add To Home Screen
        </Button>
        <Button @click="addToFavorites" :disabled="!isAddToFavoritesSupported">
          Add To Favorites
        </Button>
        <Button @click="rate" :disabled="!isRateSupported">Rate</Button>
      </ButtonGroup>
    </SubSection>

    <SubSection title="Share">
      <InputGroup>
        <Input v-model="vkShareLink" placeholder="VK: Link" />
        <Button @click="share" :disabled="!isShareSupported">Share</Button>
      </InputGroup>
    </SubSection>

    <SubSection title="Join Community">
      <InputGroup>
        <Input v-model="vkGroupId" placeholder="VK: Group ID" />
        <Button @click="joinCommunity" :disabled="!isJoinCommunitySupported">
          Join Community
        </Button>
      </InputGroup>
    </SubSection>

    <SubSection title="Create Post">
      <InputGroup>
        <Input v-model="createPostMessage" placeholder="VK: Message" />
        <Input v-model="createPostAttachments" placeholder="VK: Attachments" />
      </InputGroup>
      <ButtonGroup>
        <Button @click="createPost" :disabled="!isCreatePostSupported">
          Create Post
        </Button>
      </ButtonGroup>
    </SubSection>
  </Section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InfoItem from '../components/InfoItem.vue';
import Section from '../components/Section.vue';
import SubSection from '../components/SubSection.vue';
import Button from '../components/Button.vue';
import ButtonGroup from '../components/ButtonGroup.vue';
import InfoGrid from '../components/InfoGrid.vue';
import Input from '../components/Input.vue';
import InputGroup from '../components/InputGroup.vue';

const bridge = computed(() => window.bridge);
const isShareSupported = computed(() => bridge.value?.social?.isShareSupported);
const isInviteFriendsSupported = computed(
  () => bridge.value?.social?.isInviteFriendsSupported
);
const isJoinCommunitySupported = computed(
  () => bridge.value?.social?.isJoinCommunitySupported
);
const isCreatePostSupported = computed(
  () => bridge.value?.social?.isCreatePostSupported
);
const isAddToHomeScreenSupported = computed(
  () => bridge.value?.social?.isAddToHomeScreenSupported
);
const isAddToFavoritesSupported = computed(
  () => bridge.value?.social?.isAddToFavoritesSupported
);
const isRateSupported = computed(() => bridge.value?.social?.isRateSupported);

const vkShareLink = ref('');
const vkGroupId = ref('');
const createPostMessage = ref('');
const createPostAttachments = ref('');

const share = () => {
  if (!bridge.value?.social) return;

  const data = {
    vk: {
      link: vkShareLink.value,
    },
  };

  bridge.value.social.share(data);
};

const inviteFriends = () => {
  if (!bridge.value?.social) return;

  bridge.value.social.inviteFriends({ ok: { text: 'Invite friends' } });
};

const joinCommunity = () => {
  if (!bridge.value?.social) return;

  bridge.value.social.joinCommunity({
    vk: { groupId: vkGroupId.value },
  });
};

const createPost = () => {
  if (!bridge.value?.social) return;

  const data = {
    vk: {
      message: createPostMessage.value,
      attachments: createPostAttachments.value,
    },
    ok: {
      media: [
        {
          type: 'text',
          text: createPostMessage.value,
        },
      ],
    },
  };

  bridge.value.social.createPost(data);
};

const addToHomeScreen = () => {
  if (!bridge.value?.social) return;

  bridge.value.social.addToHomeScreen();
};

const addToFavorites = () => {
  if (!bridge.value?.social) return;

  bridge.value.social.addToFavorites();
};

const rate = () => {
  if (!bridge.value?.social) return;

  bridge.value.social.rate();
};
</script>
