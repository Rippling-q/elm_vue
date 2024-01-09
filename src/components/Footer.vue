<template>
  <div class="fixed bottom-0 w-full h-16 text-gray-500 bg-gray-50  flex justify-around items-center">
    <div class="text-center cursor-pointer" @click="toIndex">
      <font-awesome-icon icon="home"></font-awesome-icon>
      <div>首页</div>
    </div>
    <div class="text-center cursor-pointer">
      <font-awesome-icon icon="compass"></font-awesome-icon>
      <div>发现</div>
    </div>
    <div class="text-center cursor-pointer" @click="toOrdersList">
      <font-awesome-icon icon="file-text"></font-awesome-icon>
      <div>订单</div>
    </div>
    <div class="text-center cursor-pointer" @click="toUserInfo">
      <font-awesome-icon icon="user"></font-awesome-icon>
      <div>我的</div>
    </div>
  </div>
</template>

<script setup>

import router from "../router/index.js";

function toIndex(){
  router.push('/index')
}

function toOrdersList(){
  router.push('/orderList')
}

function toUserInfo(){
  router.push('/userInfo')
}
</script>

<style scoped>

</style>