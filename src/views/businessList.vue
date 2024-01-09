<template>
  <div class="w-full">
    <header class="fixed top-0 w-full z-10 h-16 bg-blue-500 text-gray-50 text-xl flex justify-center items-center">商家列表</header>
    <!--    商家列表-->
    <div class=" w-full bg-gray-50 flex justify-around mt-2 rounded-2xl pt-16">
      <ul class="ml-2 mr-2 w-full cursor-pointer">
        <li v-for="item in BusinessList" class="flex pb-4 mt-2 border-b-gray-200 border-b-2" @click="enterStore(item.businessId)">
          <div class="mr-4 relative">
            <img :src="item.businessImg" class="z-0 w-[100px] h-[100px] rounded-xs">
          </div>
          <div class="w-4/5">
            <div class="font-bold text-xl flex mb-1 my-3">
              <h3 class="flex-grow">{{item.bussinessName}}</h3>
            </div>
            <div class="flex text-gray-600 my-3">
              <p class="flex flex-grow text-gray-500">&#165;{{item.starPrice}}起送 | &#165;{{item.deliveryPrice}}配送</p>
            </div>
            <div class="border-1 w-auto text-gray-500">
              {{item.businessExplain}}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mb-14"> </div>
    <!--    底栏部分-->
    <Footer></Footer>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getBusinessListByOrderType, getCartByUserIdAndBusinessId} from "../api/api.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";
import Footer from "../components/Footer.vue";


const routers = useRouter()
const BusinessList = ref()
const MyCartInfo = ref([])


onMounted(()=>{
  fetchBusinessListByOrderType()
})


function fetchBusinessListByOrderType(){
  getBusinessListByOrderType(router.currentRoute._value.query.orderType).then(res=>{
    console.log(res.data)
    if (res.data.code === 200){
      BusinessList.value = res.data.data
    }else {
      ElMessage.error("获取数据失败，请重试")
    }
  })
}


function enterStore(businessId) {
  // console.log("进入店铺")
  router.push({path:'/businessInfo',query:{businessId:businessId}})
}

function printQuery(){
  console.log(BusinessList.value)
}
</script>

<style scoped>

</style>