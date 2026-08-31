<script setup>
import 'mdui/components/card.js';
</script>
<template>
  <div class="home-titlecontainer">
    <mdui-card class="head-line">
      <div class="head-title">
        <h1>Welcome To Test Forum Title</h1>
      </div>
      

    </mdui-card>
    <mdui-card class="head-line">
      <div class="head-title">
        <h1>Wooooooo</h1>
      </div>
      

    </mdui-card>
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
  .head-line{
    width: 100%;
    height: 200px;
  }
  .head-title{
    text-align: center;
  }
</style>
