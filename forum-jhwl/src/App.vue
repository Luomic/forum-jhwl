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
import Post from './components/Post.vue'
</script>

<template>
  <div class="app">
    <!-- 启用mdui自带的复杂布局 -->
    <mdui-layout>
      <!-- PC -->



      <mdui-top-app-bar class="mobile-topbar" variant="center-aligned">
        <mdui-top-app-bar-title>精弘论坛</mdui-top-app-bar-title>
      </mdui-top-app-bar>
      <mdui-navigation-rail class="desktop-rail" value="post" mini>

        
        <mdui-fab lowered icon="search" slot="top" class="edit-post"></mdui-fab>
        <mdui-fab lowered icon="edit" slot="bottom" class="edit-post" style="margin-bottom: 20px;"></mdui-fab>
        <!-- 暗色模式 -->
        <mdui-button-icon icon="dark_mode--outlined" slot="bottom" class="dark-mode"></mdui-button-icon>
        
        
        <mdui-navigation-rail-item icon="inbox--outlined" active-icon="inbox" value="post" :active="$route.path === '/'" @click="$router.push('/')">
          帖子
        </mdui-navigation-rail-item>

        <div class="mdui-divider" style="margin: 8px 0;"></div>

        <mdui-navigation-rail-item icon="account_circle--outlined" active-icon="account_circle" value="account" :active="$route.path === '/accountMsg'" @click="$router.push('/accountMsg')">
          个人资料
        </mdui-navigation-rail-item>

      </mdui-navigation-rail>

      <mdui-layout-main class="content">
        <router-view ></router-view>
      </mdui-layout-main>

    </mdui-layout>

    <mdui-fab class="mobile-fab" icon="edit"></mdui-fab>


    <mdui-navigation-bar class="mobile-nav" value="post">
      <mdui-navigation-bar-item icon="inbox--outlined" active-icon="inbox" value="post">
        帖子
      </mdui-navigation-bar-item>

      <mdui-navigation-bar-item icon="account_circle--outlined" active-icon="account_circle" value="account">
        个人资料
      </mdui-navigation-bar-item>
    </mdui-navigation-bar>

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
  width: 100vw;
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
    display: block;
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
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
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