<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Comment from '@/components/Comment.vue';
import 'mdui/components/text-field.js';


const route = useRoute()
const postId = route.params.postId
const comment_array = ref([]);
const time = ref('');
const name = ref('');
const content = ref('');


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



function submitComment() {
    const commentContent = document.querySelector('.comment-content').value;
    const access_token = localStorage.getItem('access_token');
    axios.post(`/api/v1/posts/${postId}/comment`, {
        content: commentContent
    }, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then((response) => {
        if (response.data.code === 0) {
            document.querySelector('.comment-content').value = '';
            dynamicCreateDialog('评论提交成功！', () => {
                getDetail(); 
            });
        } else {
            dynamicCreateDialog('提交评论失败：' + (response.data.msg || response.data.message || '未知错误'));
        }
    })
    .catch((error) => {
        console.error('提交评论失败：', error.response?.data?.msg || error.response?.data?.message || error.message);
        dynamicCreateDialog('提交评论失败：' + (error.response?.data?.msg || error.response?.data?.message || error.message));
    });
}



async function getDetail() {
    const access_token = localStorage.getItem('access_token');
    axios.get(`/api/v1/posts/${postId}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then((response) => {
        if (response.data.code === 0) {
            comment_array.value = response.data.data.comments;
            time.value = response.data.data.created_at;
            name.value = response.data.data.author.name;
            content.value = response.data.data.content;
        }
    })
    .catch((error) => {
        console.error('获取帖子详情失败：', error);
    });
}
onMounted(() => {
    getDetail();
});

</script>

<template>
    <div style="padding: 32px;">
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 16px;">
            <img src="../assets/avatar.jpg" style="width: 80px;height: 80px; border-radius: 50%;">
            <div style="margin-left: 16px;">
                <p>{{ name }}</p>
                <p>{{ time }}</p>
            </div>
        </div>


        <div style="padding:48px;">
            <p style="font-size: 18px; line-height: 1.6;">{{ content }}</p>
        </div>

        <div style="margin-top: 8px;display:flex;flex-direction: column;">
            <mdui-text-field class="comment-content" label="请输入评论内容" variant="outlined" style="width: 100%;  margin-top: 8px;" rows="2"></mdui-text-field>
            <mdui-button style="margin-top: 16px;margin-left: auto;width: 120px;" @click="submitComment" >提交评论</mdui-button>
        </div>

        <div style="margin-top: 32px;">
            <Comment v-for="(comment, index) in comment_array" :key="index" :comment="comment" />
        </div>
    </div>
</template>