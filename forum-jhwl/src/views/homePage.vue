<script setup>
import 'mdui/components/card.js';
</script>
<template>
  <div class="home-titlecontainer">
    <mdui-card v-for="n in 9" :key="n" variant="elevated" class="home-card"></mdui-card>
  </div>
</template>
<style scoped>
  .home-titlecontainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin: 20px;
  }
  .home-card {
    width: 100%;
    height: 180px;
  }
  .home-title {
    font-size: 48px;
    font-weight: bold;
  }
</style>
