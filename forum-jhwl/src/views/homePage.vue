<script setup>
import 'mdui/components/card.js';
import Post from '../components/Post.vue'
import axios from 'axios';
import router from '../router/index.js'
import { ref, onMounted, onUnmounted } from 'vue';

const posts = ref([]);
const hasLiked = ref([]);
const page = ref(1);
const pageSize = 20;
const total = ref(0);
const loading = ref(false);

async function getLikedPosts(newPosts) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    dynamicCreateDialog("请先登录", () => router.push('/accountMsg'));
    return;
  }
  try {
    const response = await axios.post('/api/v1/posts/likes', {
      post_ids: newPosts.map(p => p.id)
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const status = response.data?.data?.status ?? [];
    hasLiked.value = [...hasLiked.value, ...status.filter(item => item.liked).map(item => item.post_id)];
  } catch (error) {
    console.error('获取点赞状态失败：', error);
  }
}

function dynamicCreateDialog(content, onClosed) {
	const dialog = document.createElement("mdui-dialog");
	dialog.classList.add("example-header");
	dialog.innerHTML = content;
	dialog.closeOnOverlayClick = true;
	document.body.appendChild(dialog);

	dialog.addEventListener("closed", () => {
		dialog.remove();
		if (onClosed) onClosed();
	});
	dialog.open = true;
}

async function fetchPosts(reset = true) {
  if (loading.value) return;
  if (!reset) {
    if (page.value >= total.value) return;
    page.value++;
  } else {
    page.value = 1;
    hasLiked.value = [];
  }
  loading.value = true;
  try {
    const response = await axios.get('/api/v1/posts', {
      params: { page: page.value, page_size: pageSize }
    });
    const { items, meta } = response.data.data;
    posts.value = reset ? items : [...posts.value, ...items];
    total.value = meta.total;
    getLikedPosts(items);
  } catch (error) {
    if (!reset) page.value--;
    console.error('获取帖子失败：', error);
  } finally {
    loading.value = false;
  }
}

let scrollEl = null;

function onScroll() {
  if (loading.value) return;
  if (scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 200) {
    fetchPosts(false);
  }
}

onMounted(() => {
  fetchPosts();
  scrollEl = document.querySelector('.content');
  scrollEl.addEventListener('scroll', onScroll);
});
onUnmounted(() => scrollEl?.removeEventListener('scroll', onScroll));

function toPostDetail(postId) {
  router.push(`/postDetail/${postId}`);
}
</script>
<template>


  <div class="head-grid">
    <mdui-card style="width: 100%; height: 300px; padding:16px;background: rgb(var(--mdui-color-surface-container)); ">
      <div class="head-title" style="flex-direction: column;">
        <div style="display: flex">
          <p class="home-title" style="color: #6750A4;">精弘</p>
          <p class="home-title">网络</p>
        </div>
        <p class="home-title">取精用弘</p>
      </div>
    </mdui-card>
    <mdui-card class="head-line" style="width: 100%; height: 300px; padding:16px;">
      <div class="head-title">

        <img src="../assets/add.jpg" style="width: 160px;height: 200px;">
        <p style="margin-left: 16px;font-size: 20px;">在这里，遇见技术部~</p>
      </div>


    </mdui-card>
  </div>

  <div class="home-titlecontainer">
    <Post v-for="post in posts" :key="post.id" :content="post.content" :likes="post.like_count"
      :comments="post.comment_count" :postId="post.id" :postUserId="post.author.username" :role="post.author.role"
      :likedPosts="hasLiked"
      @deleted="fetchPosts" />
  </div>

  <p v-if="loading" style="text-align:center;color:gray;margin:12px 0;">加载中...</p>
  <p v-else-if="posts.length > 0 && page >= total" style="text-align:center;color:gray;margin:12px 0;">没有更多了</p>
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
