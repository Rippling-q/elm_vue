<template>
  <div v-if="userId===null" class="w-full h-90vh" >
    <div class="w-full h-full flex flex-col items-center justify-center ">
      <div >
        你还没有登录，请先登录
      </div>
      <el-button type="primary" size="large" @click="goLogin" class="mt-3vw">去登录</el-button>
    </div>

    <Footer></Footer>
  </div>
<div v-else class="w-100vw  bg-gray-100">
  <div class="h-15.5vw text-2xl pt-3vw text-center bg-blue font-bold"><p>个人主页</p></div>
<!--  总容器-->
  <div class="w-100%  px-3">
<!--    顶栏-->
    <div class="flex justify-between items-center h-1/4 mt-[5px]">
      <div  class="w-22vw p-3vw h-22vw bg-white rounded-full flex justify-center overflow-hidden">
        <img :src="userInfo.userImg">
      </div>
      <div class="w-50vw flex justify-center flex-col text-2xl">
        <div class="pl-3.5vw">{{userInfo.userName}}</div>
        <p class="pl-3.5vw">{{userInfo.telephone}}</p>
      </div>
      <div class="w-25vw ">
        <el-button class="!text-xl !pr-3vw" text @click="logout">退出登录</el-button>
      </div>
    </div>

<!--    会员-->
    <div class="w-full mt-[20px]">
<!--      上半部分-->
      <div class="flex justify-between p-4.5vw bg-gray-800 text-3.2vw rounded-3vw ">
        <div>
          <div class="flex items-center text-4.5vw p-1vw bg-white my-1vw mr-15vw rounded-2.8vw"><font-awesome-icon class="mr-1vw" icon="lock"/><p class="text-4.5vw font-bold">未成为会员</p></div>
          <p class="mt-2.6vw text-gray-300">下单获赠吃货豆，豆兑万物更优惠</p>
        </div>

        <div>
          <p class="text-5vw  text-gray-200 overflow-hidden">吃货豆 999 ></p>
        </div>
      </div>
<!--      下半部分-->
      <div class=" bg-white rounded-b-3vw">
        <ul class="flex justify-between py-5.5vw">
          <li class="w-30vw text-center">
            <font-awesome-icon icon="id-card" class="text-6.5vw text-red-400"/>
            <p class="font-bold mt-1vw">超级吃货卡</p>
            <p>无门槛大额红包</p>
          </li>
          <li class="w-30vw text-center">
            <font-awesome-icon icon="credit-card" class="text-6.5vw text-red-500"/>
            <p class="font-bold mt-1vw">红包13</p>
            <p>10张今日到期</p>
          </li>
          <li class="w-30vw text-center">
            <font-awesome-icon icon="credit-card" class="text-6.5vw text-red-600"/>
            <p class="font-bold mt-1vw">余额</p>
            <p>余额999999元</p>
          </li>
        </ul>
      </div>

    </div>
<!--    常用工具-->
    <div class="w-full flex flex-col mt-4.5vw bg-white rounded-3vw pb-3.5vw">
      <p class="text-6.5vw pl-3vw">常用工具</p>
      <ul class="w-full flex flex-wrap justify-between space-y-5vw">
        <li class="w-22vw flex flex-col justify-center items-center mt-5vw"><font-awesome-icon class="text-8vw mb-3vw" icon="map-marker-alt"/><p>我的地址</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw" icon="headset"/><p>我的客服</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon icon="heart" class="text-8vw mb-3vw "/><p>店铺关注</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw text-yellow" icon="star"/><p>评价有礼</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw" icon="circle-exclamation"/><p>用户协议</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw" icon="eye-slash"/><p>隐私政策</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw text-yellow" icon="dollar-sign"/><p>我的账单</p></li>
        <li class="w-22vw flex flex-col justify-center items-center"><font-awesome-icon class="text-8vw mb-3vw" icon="message"/><p>消息中心</p></li>
      </ul>
    </div>

<!--    其它-->
    <div class="w-full mt-4.5vw pb-3vw">
      <ul class="w-full flex justify-center flex-wrap space-x-3vw">
        <li class="w-44.5vw bg-white rounded-4.5vw p-3.5vw">
          <div><p class="font-bold text-5vw">邀好友赚现金</p><p class="text-gray-500">最高得15元</p></div>
          <div class="flex justify-center items-center bg-gray-100 my-4.5vw"><img class="w-18.5vw h-18.5vw" src="../assets/vue.svg"></div>
          <div class="flex justify-between"><el-button>去邀请</el-button><el-button>查佣金</el-button></div>
        </li>
        <li class="w-44.5vw bg-white rounded-4.5vw p-3.5vw">
          <div><p class="font-bold text-5vw">品质店铺天天享</p><p class="text-gray-500">最高得15元</p></div>
          <div class="flex justify-center items-center bg-gray-100 my-4.5vw"><img class="w-18.5vw h-18.5vw" src="../assets/vue.svg"></div>
          <div class="flex justify-center"><el-button>戳此查看</el-button></div>
        </li>
      </ul>
    </div>
    <div class="bg-gray-100 mb-16"> </div>
  </div>

  <Footer ></Footer>
</div>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import {onMounted, ref} from "vue";
import {getUserInfo} from "../api/api.js";
import {ElMessage,ElMessageBox} from "element-plus";
import router from "../router/index.js";

const userId = ref()
const userInfo = ref({})

function fetchUserInfo(){
  getUserInfo(userId.value).then(res=>{
    if (res.data.code ===200){
      // console.log(res.data.data)
      userInfo.value = res.data.data
      userInfo.value.telephone = userTelHandle(userInfo.value.telephone)
    }else ElMessage.error("获取用户信息异常，请重试")
  })
}

function userTelHandle(telephone){
  let handledTel = String(telephone)
  return handledTel.slice(0,3)+"****"+handledTel.substring(7)

}

function goLogin(){
  router.push('/login')
}

function logout(){
  ElMessageBox.confirm(`确定退出登录？`,{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
  }).then(()=>{
    window.sessionStorage.clear()
    ElMessage.success("已退出登录")
    router.push('/')
  })
}

function printsome(){
  console.log(userId.value)
}

onMounted(()=>{
  userId.value = window.sessionStorage.getItem('userId')
  fetchUserInfo()
})
</script>

<style scoped>

</style>