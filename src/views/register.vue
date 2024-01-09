<template>
  <div class="h-100% flex flex-col">
    <header class="w-full z-10 h-16 bg-blue-500 text-gray-50 text-2xl flex justify-center items-center">用户注册</header>
    <!-- 表单部分 -->
    <ul class="m-4 h-45%">
      <li class="flex mt-2 h-1/5 text-5.5vw">
        <div class="w-2/5 flex font-bold items-center">
          手机号码 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="registerInfo.phone" type="text" placeholder="手机号码" class="h-full w-full outline-0">
        </div>
      </li>
      <li class="flex mt-2 h-1/5 text-5.5vw">
        <div class="w-2/5 flex font-bold items-center">
          密码 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="registerInfo.password" type="password" placeholder="密码" class="h-full w-full outline-0">
        </div>
      </li>
      <li class="flex mt-2 h-1/5 text-5.5vw">
        <div class="w-2/5 flex font-bold items-center">
          确认密码 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="registerInfo.confirm" type="password" placeholder="确认密码" class="h-full w-full outline-0">
        </div>
      </li>
      <li class="flex mt-2 h-1/5 text-5.5vw">
        <div class="w-2/5 flex font-bold items-center">
          用户名 :
        </div>
        <div class="ml-2 w-3/4">
          <input v-model="registerInfo.userName" type="text" placeholder="用户名" class="h-full w-full outline-0">
        </div>
      </li>

      <li class="flex mt-2 h-1/5">
        <div class="w-2/5 flex font-bold text-5.5vw items-center">
          性别 ：
        </div>
        <div class="ml-5 w-3/4 flex items-center">
          <el-radio-group v-model="registerInfo.sex" class="ml-2 ">
            <el-radio label="男" size="large">男</el-radio>
            <el-radio label="女" size="large">女</el-radio>
          </el-radio-group>
        </div>
      </li>
    </ul>
    <div class="m-4">
      <button class="bg-green-500 text-xl text-white rounded w-full h-12 font-bold " @click="registerSubmit">注册
      </button>
    </div>
    <div class="m-4">
      <button class="bg-green-500 text-xl text-white rounded w-full h-12 font-bold " @click="goLogin">去登录
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref} from "vue";
import router from "../router/index.js";
import {register} from "../api/api.js";


const test = ref([])
const registerInfo = ref({
  phone:'',
  password:'',
  confirm:'',
  userName:'',
  sex:'',
})
function goLogin(){
  router.push('/login')
}
async function registerSubmit(){
  console.log(registerInfo.value)
  const headers = ref({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  await register(registerInfo.value.phone,registerInfo.value.password,registerInfo.value.userName,registerInfo.value.sex === '男' ? 1 : 0,headers)
      .then(res=>{
        if (res.data.code === 200){
          ElMessage.success("注册成功")
          router.push('/login')
        }
      })
}
</script>

<style scoped>

</style>