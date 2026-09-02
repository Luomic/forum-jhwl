<script setup>
import 'mdui/components/card.js';
import Post from '../components/Post.vue'
import axios from 'axios';
import { ref, onMounted } from 'vue';
const posts = ref([]);

onMounted(() => {
  axios.get('/api/v1/posts').then((response) => {
    posts.value = response.data.data.items;
  });
});
</script>
<template>



  <div class="head-grid">
    <mdui-card style="width: 100%; height: 300px; padding:16px;background: rgb(var(--mdui-color-surface-container)); ">
      <div class="head-title">
        <p class="home-title">精弘网络</p>
      </div>
    </mdui-card>
    <mdui-card class="head-line" style="width: 100%; height: 300px; padding:16px;">
      <div class="head-title">

        <img src="../assets/add.jpg" style="width: 160px;height: 200px;">
        <p style="margin-left: 16px;font-size: 24px;">在这里，遇见自己~</p>
      </div>


    </mdui-card>
  </div>


  <div class="home-titlecontainer">
    <Post v-for="post in posts" :key="post.id" :content="post.content" :likes="post.like_count" :comments="post.comment_count" />
  </div>
</template>
<style scoped>
.home-titlecontainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
  margin: 20px;
}

.head-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 20px;
}


.home-title {
  font-size: 48px;
  font-weight: bold;
}

.head-line {
  width: 100%;
  height: 200px;
}

.head-title {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .head-grid {
    grid-template-columns: 1fr;
  }

  .home-titlecontainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    margin: 20px;
  }
}
</style>
