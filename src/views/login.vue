<template>
  <div class="h-100% flex flex-col">
    <header class="w-full z-10 h-16 bg-blue-500 text-gray-50 text-2xl flex justify-center items-center">用户登录</header>
    <!-- 表单部分 -->
    <ul class="m-4 h-25% flex flex-wrap items-center">
      <li class="flex w-full mt-2 h-40% text-6.5vw">
        <div class="w-2/5 flex font-bold items-center">
          手机号码 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="loginInfo.telephone" type="text" placeholder="手机号码" class="h-full w-full outline-0">
        </div>
      </li>
      <li class="flex w-full mt-2 h-40% text-6.5vw">
        <div class="w-2/5 flex font-bold items-center">
          密码 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="loginInfo.password" type="password" placeholder="密码" class="h-full w-full outline-0">
        </div>
      </li>
    </ul>
    <div class="m-4">
      <button class="bg-green-500 text-xl text-white rounded w-full h-12 font-bold " @click="loginSubmit">登录
      </button>
    </div>
    <div class="m-4">
      <button class="bg-green-500 text-xl text-white rounded w-full h-12 font-bold " @click="toRegister">注册
      </button>
    </div>
    <!--    底栏部分-->
  </div>
</template>

<script setup>
import {inject, ref} from "vue";
import router from "../router/index.js";
import {login} from "../api/api.js";
import {ElMessage} from "element-plus";

let $http = inject("$axios")
let $qs = inject("$qs")

const userData = ref()

const loginInfo = ref({
  telephone:'',
  password:'',
})

async function loginSubmit(){
  try {
    await login(loginInfo.value).then(res=>{
      console.log(res.data)
      if (res.data.code === 200){
        userData.value = res.data.data
        window.sessionStorage.setItem('userId',userData.value.userId)
        window.sessionStorage.setItem('token',userData.value.token)
        window.sessionStorage.setItem('refreshToken',userData.value.refreshToken)
        // console.log(userData.value.token)
        ElMessage.success("欢迎登录"+userData.value.userName)
        router.push('/index')
      }
      else ElMessage.error("用户名或密码错误，请重试")
    })
  }
  catch (error){
    ElMessage.error("服务器异常，请重试"+error)
  }

}
function toRegister(){
  router.push('/register')
}

</script>

<style scoped>

</style>