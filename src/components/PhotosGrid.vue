<template>
  <div v-if="photos.length > 0" class="photos-grid">
    <img v-for="photo in photos" :key="photo" :src="photo" alt="Player Photo" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  photos: string[];
}>();
</script>

<style scoped>
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.photos-grid img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: border-color 0.3s ease;
}

.photos-grid img:hover {
  border-color: #667eea;
}
</style>
