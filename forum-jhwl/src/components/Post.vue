<script setup>
import 'mdui/components/dialog.js';
import router from '../router/index.js'
import axios from 'axios';
import { ref } from 'vue';


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

function isDeleted(){
	if (String(props.postUserId) === localStorage.getItem('username') || localStorage.getItem('role') === 'admin') return true;
	else return false;

}
function deletePost(postId) {
	const hasLogin = !!localStorage.getItem('access_token');

	if (hasLogin) {
		axios.delete(`/api/v1/posts/${postId}`, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('access_token')}`
			}
		})
			.then(response => {
				// 重新拉取列表
				dynamicCreateDialog("删除成功", () => emit('deleted'));
			})
			.catch(error => {
				dynamicCreateDialog("删除失败");
			});
	} else {
		dynamicCreateDialog("请先登录");
	}
}
function likePost(postId) {
	const token = localStorage.getItem('access_token');
	if (!token) {
		dynamicCreateDialog("请先登录", () => router.push('/accountMsg'));
		return;
	}
	axios.post(`/api/v1/posts/${postId}/like`, {}, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
		.then(response => {
			const wasLiked = props.likedPosts.includes(postId);
			dynamicCreateDialog(wasLiked ? "取消点赞成功" : "点赞成功", () => emit('deleted'));
		})
		.catch(error => {
			console.error('点赞请求失败：', error.response?.data ?? error);
			const status = error.response?.status;
			if (status === 401) {
				// token 失效/过期：清掉让用户重新登录
				localStorage.removeItem('access_token');
				dynamicCreateDialog("登录已失效，请重新登录", () => router.push('/accountMsg'));
			} else {
				dynamicCreateDialog("点赞失败：" + (error.response?.data?.msg || error.message));
			}
		});
}

const props = defineProps({
	content: {
		type: String,
		default: '帖子内容'
	},
	likes: {
		type: Number,
		default: 0
	},
	comments: {
		type: Number,
		default: 0
	},
	postId: {
		type: Number,
		default: 0
	},
	postUserId: {
		type: Number,
		default: 0
	},
	role: {
		type: String,
		default: ''
	},
	likedPosts: {
		type: Array,
		default: () => []
	}
})

const emit = defineEmits(['deleted'])
</script>


<template>
	<mdui-card class="home-card" style="padding: 16px;">
		<div class="card-body">
			<p class="post-content" @click="$router.push(`/postDetail/${postId}`)">{{ content }}</p>
			<div class="ops">
				<!--点赞·-->
				<div style="display: flex; align-items: center; margin-right: 16px;margin-top: 16px;">
					<mdui-button-icon :icon="likedPosts.includes(postId) ? 'thumb_up' : 'thumb_up--outlined'" @click="likePost(postId)"
						class="like-button"></mdui-button-icon>
					<p>{{ likes }}</p>
				</div>
				<!--评论-->
				<div style="display: flex; align-items: center;margin-right: 16px;margin-top: 16px;">
					<mdui-button-icon icon="comment--outlined" @click="$router.push(`/postDetail/${postId}`)"></mdui-button-icon>
					<p>{{ comments }}</p>
				</div>
			<div v-if="isDeleted()" style="display: flex;align-items: center;margin-top: 16px;">
				<mdui-button-icon icon="delete--outlined" @click="deletePost(postId)"></mdui-button-icon>
			</div>

				<!--以下组件仅在传参可用（判断是否为自己）-->
				<div style="display: none;">{{ postUserId }}</div>

			</div>
		</div>
	</mdui-card>

</template>

<style scoped>
.home-card {
	width: 100%;
	height: 100%;
}

.card-body {
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 180px;
}

.post-content {
	display: -webkit-box;
	-webkit-line-clamp: 6;
	line-clamp: 6;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: pre-line;
	margin: 0;
	text-align: left;
}

.post-content::first-letter {
	font-size: 28px;
	font-weight: bold;
}

.ops {
	width: 100%;
	height: 40px;
	justify-content: flex-end;
	padding: 8px;
	margin-top: auto;
	display: flex;
}
</style>
