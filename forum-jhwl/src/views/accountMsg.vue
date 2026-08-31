<script>
import 'mdui/components/button.js';
import 'mdui/components/dialog.js';
function openDialogLog(){
  const dialog = document.querySelector(".log-in");
  dialog.open = true

}
</script>




<template>
  <div class="account-layout" style="text-align: center;">
    <img src="../assets/avatar.jpg" style="width: 70px;height: 70px;" class="circle">

  </div>


  <!--未登录需要显示以下布局-->
  <div style="text-align: center;margin-top: 22px;" class="no-account">
    <mdui-button @click="openDialogLog">登录</mdui-button>
    <mdui-button style="margin-left: 16px;">注册</mdui-button>
  </div>

  <mdui-dialog close-on-overlay-click class="log-in">
    <mdui-top-app-bar slot="header">
      <mdui-button-icon icon="close"></mdui-button-icon>
      <mdui-top-app-bar-title>登录</mdui-top-app-bar-title>
      <mdui-button variant="text">确认</mdui-button>
    </mdui-top-app-bar>
    <div style="height: 100px"></div>
  </mdui-dialog>


</template>
<style scoped>
.grid-layout {
  margin: 20px;
}

.circle {
  margin-top: 16px;
  border-radius: 50%;
}
</style>