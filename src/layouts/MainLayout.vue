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
}

.dark .main-layout {
  background-image:
    radial-gradient(
      circle at 20% 30%,
      rgba(138, 43, 226, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(0, 191, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 20, 147, 0.1) 0%,
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
  color: #856404;
  background: #fff3cd;
  padding: 16px 24px;
  border-radius: 8px;
  display: inline-block;
}

.dark .loading-message {
  color: var(--accent-cyan, #00ffff);
  background: linear-gradient(
    135deg,
    rgba(138, 43, 226, 0.2) 0%,
    rgba(0, 191, 255, 0.2) 100%
  );
  border: 1px solid var(--accent-purple, #8a2be2);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.3);
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
</style>
