<template>
	<article class="post">
		<h2>{{ title }}</h2>
		<p>{{ content }}</p>
	</article>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		default: '帖子标题'
	},
	content: {
		type: String,
		default: '帖子内容'
	}
})
</script>

<style scoped>
.post {
	padding: 16px;
	border: 1px solid #ddd;
	border-radius: 8px;
}
</style>
