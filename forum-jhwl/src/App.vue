<script setup>
import 'mdui/mdui.css'
import 'mdui'
import 'mdui/components/navigation-rail.js'
import 'mdui/components/navigation-rail-item.js'
import 'mdui/components/navigation-bar.js'
import 'mdui/components/navigation-bar-item.js'
import 'mdui/components/button-icon.js'
import 'mdui/components/fab.js'
import 'mdui/components/top-app-bar.js';
import 'mdui/components/top-app-bar-title.js';
import 'mdui/components/text-field.js';
import Post from './components/Post.vue'

function openDialog() {
  const dialog = document.querySelector(".example-header");
  dialog.open = true;
}
</script>

<template>
  <div class="app">
    <!-- 启用mdui自带的复杂布局 -->
    <mdui-layout>
      <!-- PC -->



      <mdui-top-app-bar class="mobile-topbar" variant="center-aligned">
        <mdui-top-app-bar-title>精弘论坛</mdui-top-app-bar-title>
        <mdui-button-icon icon="search"></mdui-button-icon>
      </mdui-top-app-bar>
      <mdui-navigation-rail class="desktop-rail" value="post" mini>


        <mdui-fab lowered icon="search" slot="top" class="edit-post"></mdui-fab>
        <mdui-fab lowered icon="edit" slot="bottom" class="edit-post" style="margin-bottom: 20px;" @click="openDialog"></mdui-fab>
        <!-- 暗色模式 -->
        <mdui-button-icon icon="dark_mode--outlined" slot="bottom" class="dark-mode"></mdui-button-icon>


        <mdui-navigation-rail-item icon="inbox--outlined" active-icon="inbox" value="post" :active="$route.path === '/'"
          @click="$router.push('/')">
          帖子
        </mdui-navigation-rail-item>

        <div class="mdui-divider" style="margin: 8px 0;"></div>

        <mdui-navigation-rail-item icon="account_circle--outlined" active-icon="account_circle" value="account"
          :active="$route.path === '/accountMsg'" @click="$router.push('/accountMsg')">
          个人资料
        </mdui-navigation-rail-item>

      </mdui-navigation-rail>

      <mdui-layout-main class="content">
        <router-view></router-view>
      </mdui-layout-main>

    </mdui-layout>

    <mdui-fab class="mobile-fab" icon="edit"></mdui-fab>


    <mdui-navigation-bar class="mobile-nav" value="post" scroll-behavior="hide" scroll-threshold="30" scroll-target=".content">
      <mdui-navigation-bar-item icon="inbox--outlined" active-icon="inbox" value="post" :active="$route.path === '/'"
        @click="$router.push('/')">
        帖子
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item icon="account_circle--outlined" active-icon="account_circle" value="account"
        :active="$route.path === '/accountMsg'" @click="$router.push('/accountMsg')">
        个人资料
      </mdui-navigation-bar-item>
    </mdui-navigation-bar>





    <!-- 引用自mdui的弹窗 -->
    <mdui-dialog close-on-overlay-click stacked-actions class="example-header">
      <mdui-top-app-bar slot="header">
        <mdui-top-app-bar-title style="margin-left: 18px;">搜索</mdui-top-app-bar-title>
        <mdui-button variant="text">确认</mdui-button>
      </mdui-top-app-bar>
      <div style="height: 120px;" >
        <mdui-text-field variant="outlined" label="请输入搜索内容"></mdui-text-field>
        
      
      </div>
    </mdui-dialog>
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--mdui-color-background);
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

.app {
  width: 100%;
  min-width: 0;
  height: 100%;
  overflow: hidden;

  display: flex;
}

.desktop-rail {

  --mdui-color-surface: var(--mdui-color-surface-container-high);
}

.dark-mode {
  margin-bottom: 10px;
}

.edit-post {
  margin-top: 10px;
}

.content {
  flex: 1;
  min-width: 0;
  min-height: 0;

  overflow: auto;
}

.content-inner {
  min-height: 1000px;
  padding: 24px;
}

.mobile-nav,
.mobile-fab,
.mobile-topbar {
  display: none;
}


/* media响应 */
@media (max-width: 600px) {

  .app {
    display: flex;
    position: relative;
  }

  .desktop-rail {
    display: none;
  }

  .content {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
  }

  .mobile-nav {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }

  .mobile-topbar {
    display: flex;
  }

  .mobile-fab {
    display: block;
    position: fixed;
    right: 16px;
    bottom: 88px;
    z-index: 101;
  }
}
</style>