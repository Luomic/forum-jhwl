



<template>
	<mdui-card class="home-card" style="padding: 16px;">
		<div class="card-body">
			<p class="post-content">{{ content }}</p>
			<div class="ops">
				<!--点赞·-->
				<div style="display: flex; align-items: center; margin-right: 16px;margin-top: 16px;">
					<mdui-button-icon icon="thumb_up--outlined"></mdui-button-icon>
					<p>{{ likes }}</p>
				</div>
				<!--评论-->
				<div style="display: flex; align-items: center;margin-top: 16px;">
					<mdui-button-icon icon="comment--outlined"></mdui-button-icon>
					<p>{{ comments }}</p>
				</div>
			</div>
		</div>
	</mdui-card>

</template>

<script setup>
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
	}
})
</script>

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

.ops {
	width: 100%;
	height: 40px;
	justify-content: flex-end;
	padding: 8px;
	margin-top: auto;
	display: flex;
}
</style>
