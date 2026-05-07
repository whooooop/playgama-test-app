<template>
  <canvas ref="canvasRef" class="hidden-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let rafId: number | undefined;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const number = Math.floor(Math.random() * 900 + 100);

  let hue = Math.random() * 360;
  let x = 0;
  const speed = 1.5;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = () => {
    hue = (hue + 0.5) % 360;

    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    x = (x + speed) % canvas.width;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(number), x, canvas.height / 2);

    rafId = requestAnimationFrame(draw);
  };

  rafId = requestAnimationFrame(draw);
});

onUnmounted(() => {
  if (rafId !== undefined) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.hidden-canvas {
  position: fixed;
  top: 0;
  left: -100vw;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
}
</style>
