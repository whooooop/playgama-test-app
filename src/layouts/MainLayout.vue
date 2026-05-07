<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-content">
      <div class="content-wrapper">
        <Header />
        <router-view v-if="isInitialized" />
        <div v-else class="loading-container">
          <div class="loading-message">⏳ Загрузка SDK...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import { useSDK } from '../composables/useSDK';

// Use bridge composable to get initialization status
const { isInitialized } = useSDK();
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
  transition: background-color 0.3s ease;
  position: relative;
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(99, 102, 241, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(236, 72, 153, 0.06) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(139, 92, 246, 0.05) 0%,
      transparent 50%
    );
}

.dark .main-layout {
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(99, 102, 241, 0.12) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(236, 72, 153, 0.08) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(139, 92, 246, 0.06) 0%,
      transparent 50%
    );
}

.main-content {
  flex: 1;
  margin-left: 0;
  padding: 25px 50px;
  padding-left: 60px;
  min-height: 100vh;
  min-width: 0;
  width: 100%;
}

.content-wrapper {
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-message {
  font-size: 16px;
  color: var(--accent-primary, #6366f1);
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.15) 0%,
    rgba(139, 92, 246, 0.15) 100%
  );
  padding: 16px 24px;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

.dark .loading-message {
  color: var(--accent-primary, #818cf8);
  background: linear-gradient(
    135deg,
    rgba(129, 140, 248, 0.15) 0%,
    rgba(167, 139, 250, 0.15) 100%
  );
  border: 1px solid rgba(129, 140, 248, 0.3);
  box-shadow: 0 0 30px rgba(129, 140, 248, 0.2);
}

@media (max-width: 1024px) {
  .main-content {
    padding: 20px 24px;
    padding-left: 50px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 16px;
    padding-left: 40px;
  }
}

@media (min-width: 701px) {
  .main-content {
    padding-left: 290px;
  }
}
</style>
