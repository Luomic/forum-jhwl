<script setup>
import 'mdui/components/text-field.js';
import axios from 'axios';
import 'mdui/components/dialog.js';
// 动态创建弹窗
function dynamicCreateDialog(content) {
  const dialog = document.createElement("mdui-dialog");
  dialog.classList.add("example-header");
  dialog.innerHTML =  content;
  dialog.closeOnOverlayClick = true;
  document.body.appendChild(dialog);
  dialog.open = true;
}
function submit(){
    const content = document.querySelector('.content').value;
    const access_token = localStorage.getItem('access_token');
    axios.post('/api/v1/post', {
        content
    }, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then((response) => {
        if (response.data.code === 0) {
            document.querySelector('.content').value = '';
            dynamicCreateDialog('发布成功！');
        } else dynamicCreateDialog('发布失败！' + (response.data.message || ''));
    })
    .catch((error) => {
        dynamicCreateDialog('发布失败！原因：' + (error.response?.data?.message || ''));
    });
}
</script>

<template>
<div style="padding: 32px;margin-top: 8px; text-align: right;">
    <mdui-text-field class="content" label="请输入文章内容" style="width: 100%;  margin-top: 8px;" rows="20"></mdui-text-field>
    <mdui-button style="margin-top: 16px;" @click="submit" >提交</mdui-button>
</div>
</template>