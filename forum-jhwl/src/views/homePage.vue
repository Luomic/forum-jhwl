<script setup>
import 'mdui/components/card.js';
</script>
<template>



  <div class="head-grid">
    <mdui-card style="width: 100%; height: 300px; padding:16px;background: rgb(var(--mdui-color-surface-container)); ">
      <div class="head-title" >
        <p class="home-title">精弘网络</p>
      </div>
    </mdui-card>
    <mdui-card class="head-line" style="width: 100%; height: 300px; padding:16px;">
      <div class="head-title" >
        
        <img src="../assets/add.jpg" style="width: 160px;height: 200px;" >
        <p style="margin-left: 16px;font-size: 24px;">在这里，遇见自己~</p>
      </div>
      

    </mdui-card>
  </div>


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
  .head-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 600px) {
    .head-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
