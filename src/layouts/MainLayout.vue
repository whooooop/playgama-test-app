<template>
  <div class="main-layout">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="content-wrapper">
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
  background: #f8f9fa;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px 32px;
  min-height: 100vh;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
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

@media (max-width: 1024px) {
  .main-content {
    margin-left: 200px;
    padding: 20px 24px;
  }
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 16px;
  }
}
</style>
