<template>
  <Section title="Quick Actions" class="quick-actions-section">
    <template #header>
      <div class="actions-row">
        <button
          class="action-btn"
          :disabled="!isReady"
          :title="lastAction.gameReady || 'Send GAME_READY platform message'"
          @click="sendGameReady"
        >
          🎮 Game Ready
        </button>

        <button
          class="action-btn"
          :disabled="!isReady || !isAuthSupported"
          :title="lastAction.authorize || 'Authorize player'"
          @click="authorize"
        >
          🔐 Authorize
        </button>

        <button
          class="action-btn"
          :disabled="!isReady || !isInterstitialSupported"
          :title="lastAction.interstitial || 'Show interstitial ad'"
          @click="showInterstitial"
        >
          📺 Interstitial
        </button>

        <button
          class="action-btn"
          :disabled="!isReady || !isRewardedSupported"
          :title="lastAction.rewarded || 'Show rewarded ad'"
          @click="showRewarded"
        >
          🎁 Rewarded
        </button>

        <div v-if="status" class="status" :class="status.type">
          {{ status.text }}
        </div>
      </div>
    </template>
  </Section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useSDK } from '../composables/useSDK';
import Section from './Section.vue';

const { bridge, isInitialized } = useSDK();

const isReady = computed(() => isInitialized.value && !!bridge.value);

const isAuthSupported = computed(
  () => bridge.value?.player?.isAuthorizationSupported ?? false
);
const isInterstitialSupported = computed(
  () => bridge.value?.advertisement?.isInterstitialSupported ?? false
);
const isRewardedSupported = computed(
  () => bridge.value?.advertisement?.isRewardedSupported ?? false
);

const lastAction = reactive<Record<string, string>>({});
const status = ref<{ type: 'ok' | 'err'; text: string } | null>(null);

let statusTimer: number | null = null;
const flash = (type: 'ok' | 'err', text: string) => {
  status.value = { type, text };
  if (statusTimer) window.clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    status.value = null;
  }, 2500);
};

const sendGameReady = () => {
  try {
    const msg = bridge.value.PLATFORM_MESSAGE?.GAME_READY ?? 'game_ready';
    bridge.value.platform.sendMessage(msg);
    lastAction.gameReady = `sent: ${msg}`;
    flash('ok', `✅ ${msg}`);
  } catch (err: any) {
    flash('err', `❌ ${err.message}`);
  }
};

const authorize = async () => {
  try {
    await bridge.value.player.authorize();
    flash('ok', '✅ authorized');
  } catch (err: any) {
    flash('err', `❌ ${err.message}`);
  }
};

const showInterstitial = () => {
  try {
    bridge.value.advertisement.showInterstitial();
    flash('ok', '✅ interstitial');
  } catch (err: any) {
    flash('err', `❌ ${err.message}`);
  }
};

const showRewarded = () => {
  try {
    bridge.value.advertisement.showRewarded();
    flash('ok', '✅ rewarded');
  } catch (err: any) {
    flash('err', `❌ ${err.message}`);
  }
};
</script>

<style scoped>
.quick-actions-section :deep(.section) {
  padding: 20px 32px;
}

.quick-actions-section :deep(.section-header) {
  margin-bottom: 0;
  gap: 16px;
  flex-wrap: wrap;
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.action-btn {
  padding: 10px 16px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9em;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--accent-primary, #6366f1);
  color: var(--accent-primary, #6366f1);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.2);
}

.action-btn:active:not(:disabled) {
  transform: translateY(0);
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.status {
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85em;
  font-weight: 500;
}

.status.ok {
  color: var(--accent-green, #22c55e);
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.15) 0%,
    rgba(20, 184, 166, 0.15) 100%
  );
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status.err {
  color: var(--accent-red, #ef4444);
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.15) 0%,
    rgba(236, 72, 153, 0.15) 100%
  );
  border: 1px solid rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .quick-actions-section :deep(.section) {
    padding: 16px 20px;
  }

  .actions-row {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
