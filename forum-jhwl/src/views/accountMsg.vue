<script setup>
import { ref, onMounted } from 'vue';
import 'mdui/components/button.js';
import 'mdui/components/dialog.js';
import 'mdui/components/top-app-bar.js';
import 'mdui/components/top-app-bar-title.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/text-field.js';
import axios from 'axios';


const isLoggedIn = ref(false); // 这是登录状态
const role = ref(localStorage.getItem('role') || ''); // 获取用户角色
const name = ref('');




onMounted(() => {
  const hasAccessToken = !!localStorage.getItem('access_token');
  if (!hasAccessToken) return;

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  axios.post('/api/v1/auth/login', {
    username,
    password
  })
    .then((response) => {
      if (response.data.code === 0) {
        // 刷新持久化token
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('role', response.data.data.user.role);
        name.value = response.data.data.user.name;
        isLoggedIn.value = true;
      } else {
        console.log('自动登录失败');
        // 清除无效的 token
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    })
    .catch((error) => {
      console.error(error.response?.data ?? error);
      // 清除无效的 token
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    });
});

function autoLogFromUp(username, password) {
  axios.post('/api/v1/auth/login', {
    username,
    password
  })
    .then((response) => {
      if (response.data.code === 0) {
        // 刷新持久化token
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('role', response.data.data.user.role);
        name.value = response.data.data.user.name;
        isLoggedIn.value = true;
      } else {
        console.log('自动登录失败');
        // 清除无效的 token
        localStorage.removeItem('access_token');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
      }
    })
    .catch((error) => {
      console.error(error.response?.data ?? error);
      // 清除无效的 token
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.removeItem('role');
    });
}


function openDialogUp() {
  const dialog = document.querySelector('.log-up');
  dialog.open = true;
}
function closeDialogUp() {
  const dialog = document.querySelector('.log-up');
  dialog.open = false;
}
function openDialogLog() {
  const dialog = document.querySelector('.log-in');
  dialog.open = true;
}

function closeDialogLog() {
  const dialog = document.querySelector('.log-in');
  dialog.open = false;
}

function login() {
  const errorElement = document.querySelector('.log-in p');
  const username = document.querySelector('.account').value;
  const password = document.querySelector('.password').value;
  console.log('账号:', username);
  console.log('密码:', password);
  axios.post('/api/v1/auth/login', {
    username,
    password
  })
    .then((response) => {
      console.log('登录响应:', response.data);
      if (response.data.code === 0) {
        console.log('登录成功');
        isLoggedIn.value = true; // 切换为已登录状态，隐藏登录/注册按钮
        // 持久化token
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('access_token', response.data.data.access_token);
        localStorage.setItem('role', response.data.data.user.role);
        name.value = response.data.data.user.name;
        closeDialogLog();

      } else {
        console.log('登录失败');
        const errorElement = document.querySelector('.log-in p');
        errorElement.textContent = '错误：' + response.data.msg;
      }
    })
    .catch((error) => {
      console.error(error.response?.data ?? error);
      const errorElement = document.querySelector('.log-in p');
      errorElement.textContent = '错误：' + (error);
    });
}

function logup() {
  const username = document.querySelector('.account-logup').value;
  const name = document.querySelector('.username-logup').value;
  const password = document.querySelector('.password-logup').value;

  const errorElement = document.querySelector('.log-up p');
  errorElement.textContent = '';

  axios.post('/api/v1/auth/register', {
    username,
    name,
    password,
    role: 'student'
  })
    .then((response) => {
      console.log('注册成功:', response.data);
      if (response.data.code === 0) {
        // 自动登录
        autoLogFromUp(username, password);
        closeDialogUp();
      } else {
        errorElement.textContent = '错误：' + response.data.msg;
      }
    })
    .catch((error) => {
      // 400 参数校验失败 / 409 用户名已存在
      console.error(error.response?.data ?? error);
      const msg = error.response?.data?.msg ?? '网络异常，请稍后重试';
      errorElement.textContent = '错误：' + msg;
    });
}
</script>




<template>
  <div class="account-layout" style="text-align: center;">
    <img src="../assets/avatar.jpg" style="width: 70px;height: 70px;" class="circle">

  </div>


  <!--未登录显示以下布局-->
  <div v-if="!isLoggedIn" style="text-align: center;margin-top: 22px;" class="no-account">
    <mdui-button @click="openDialogLog">登录</mdui-button>
    <mdui-button style="margin-left: 16px;" @click="openDialogUp">注册</mdui-button>
  </div>
  <!--已登录显示-->
  <div style="text-align: center; margin-top: 16px;">
    <h3>{{ name }}</h3>
    <p>{{ role }}</p>

  </div>
  <mdui-dialog close-on-overlay-click class="log-in">
    <mdui-top-app-bar slot="header">
      <mdui-button-icon icon="close" @click="closeDialogLog"></mdui-button-icon>
      <mdui-top-app-bar-title>登录</mdui-top-app-bar-title>
      <mdui-button variant="text" @click="login">确认</mdui-button>
    </mdui-top-app-bar>
    <div style="height: 200px">
      <mdui-text-field variant="outlined" label="请输入账号" class="account" type="number"></mdui-text-field>
      <mdui-text-field variant="outlined" label="请输入密码" type="password" style="margin-top: 16px; " class="password"></mdui-text-field>
      <p style="color: red;margin-top: 16px;" class=""></p>
    </div>
  </mdui-dialog>
  <!--注册弹窗-->
  <mdui-dialog close-on-overlay-click class="log-up">
    <mdui-top-app-bar slot="header">
      <mdui-button-icon icon="close" @click="closeDialogUp"></mdui-button-icon>
      <mdui-top-app-bar-title>注册</mdui-top-app-bar-title>
      <mdui-button variant="text" @click="logup">确认</mdui-button>
    </mdui-top-app-bar>
    <div style="height: 300px">
      <mdui-text-field variant="outlined" label="请输入账号" class="account-logup" type="number" maxLength="32"></mdui-text-field>
      <mdui-text-field variant="outlined" label="请输入昵称" class="username-logup" style="margin-top: 16px;"></mdui-text-field>
      <mdui-text-field variant="outlined" label="请输入密码" type="password" minlength="8" maxLength="16" style="margin-top: 16px; " class="password-logup"></mdui-text-field>
      <p style="color: red;margin-top: 16px;" class=""></p>
    </div>
  </mdui-dialog>

</template>
<style scoped>
.grid-layout {
  margin: 20px;
}

.circle {
  margin-top: 32px;
  border-radius: 50%;
}
</style>