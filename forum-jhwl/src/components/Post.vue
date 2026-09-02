<script setup>
import 'mdui/components/dialog.js';
import router from '../router/index.js'
import axios from 'axios';

// 动态创建弹窗
function dynamicCreateDialog(content) {
	const dialog = document.createElement("mdui-dialog");
	dialog.classList.add("example-header");
	dialog.innerHTML = content;
	dialog.closeOnOverlayClick = true;
	document.body.appendChild(dialog);
	dialog.open = true;
}

function likePost(postId) {
	dynamicCreateDialog(`/api/v1/posts/${postId}/like`);
	const hasLogin = !!localStorage.getItem('access_token');

	if (hasLogin) {
		axios.post(`/api/v1/posts/${postId}/like`, {}, {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('access_token')}`
			}
		})
			.then(response => {
				router.push('/');
				dynamicCreateDialog("点赞成功");
				document.querySelector(".like-button").icon = "thumb_up";
			})
			.catch(error => {
				dynamicCreateDialog("点赞失败");
			});
	} else {
		dynamicCreateDialog("请先登录");
	}
}

defineProps({
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
	}
})
</script>


<template>
	<mdui-card class="home-card" style="padding: 16px;">
		<div class="card-body">
			<p class="post-content">{{ content }}</p>
			<div class="ops">
				<!--点赞·-->
				<div style="display: flex; align-items: center; margin-right: 16px;margin-top: 16px;">
					<mdui-button-icon icon="thumb_up--outlined" @click="likePost(postId)"
						class="like-button"></mdui-button-icon>
					<p>{{ likes }}</p>
				</div>
				<!--评论-->
				<div style="display: flex; align-items: center;margin-right: 16px;margin-top: 16px;">
					<mdui-button-icon icon="comment--outlined"></mdui-button-icon>
					<p>{{ comments }}</p>
				</div>
				<div style="display: flex; align-items: center;margin-top: 16px;">
					<mdui-button-icon icon="delete--outlined"></mdui-button-icon>
				</div>
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
