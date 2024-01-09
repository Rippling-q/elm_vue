<template>
  <div class="h-full flex-grow">
    <header class="w-full fixed top-0 z-10 h-16 bg-blue-500 text-gray-50 text-xl flex justify-center items-center">我的订单</header>
    <!--  未支付订单-->
    <div class="m-2 mb-16 mt-20">
      <h3 class="text-gray-500 text-xl">未支付订单信息：</h3>
      <!--    订单列表-->
      <ul class="mt-5">
        <li v-for="item in myOrders" class="mt-2" >
          <div class="w-full h-full" v-if="item.orderState === 0">
            <div class="flex justify-between">
              <!--          左边部分-->
              <p class="text-xl text-gray-500" @click="showDetail(item)">
                {{item.businessName}}
                <button class="text-xl" >
                  <font-awesome-icon icon="angle-down"></font-awesome-icon>
                </button>
              </p>
              <!--          右边部分-->
              <div class="flex">
                <p>&#165;{{item.orderTotal}}</p>
                <button class="ml-2 bg-yellow-500 text-white rounded cursor-pointer" @click="goPay(item.orderId)">去支付</button>
              </div>
            </div>
            <!--        每个列表里面的子元素列表-->
            <ul v-show="item.showDetailed" id="detail1" class="ml-2 mt-2 text-xs h-auto overflow-hidden">
              <li v-for="item2 in item.orderDetailetsDTO" class="mt-2 flex justify-between">
                <p>{{item2.foodName}} x {{item2.quantity}}</p>
                <p>&#165;{{item2.lineItemPrice}}</p>
              </li>
              <li class="mt-2 flex justify-between">
                <p>配送费</p>
                <p>&#165;{{item.deliveryPrice}}</p>
              </li>
            </ul>
          </div>
          <!--        元素水平两端对齐-->
        </li>
      </ul>
    </div>
    <!--已支付订单-->
    <div class="m-2 mb-16">
      <h3 class="text-gray-500 text-xl">已支付订单信息：</h3>
      <!--    订单列表-->
      <ul class="mt-5">
        <li v-for="item in myOrders" class="mt-2">
          <div v-if="item.orderState === 1">
            <!--        元素水平两端对齐-->
            <div class="flex justify-between">
              <!--          左边部分-->
              <p class="text-xl text-gray-500" @click="showDetail(item)">
                {{item.businessName}}
                <button class="text-xl" >
                  <font-awesome-icon icon="angle-down"></font-awesome-icon>
                </button>
              </p>
              <div class="flex">
                <p>&#165;{{item.orderTotal}}</p>
              </div>
            </div>
            <!--        每个列表里面的子元素列表-->
            <ul v-if="item.showDetailed" class="ml-2 mt-2 text-xs h-auto overflow-hidden">
              <li v-for="item2 in item.orderDetailetsDTO" class="mt-2 flex justify-between">
                <p>{{item2.foodName}} x {{item2.quantity}}</p>
                <p>&#165;{{item2.lineItemPrice}}</p>
              </li>
              <li class="mt-2 flex justify-between">
                <p>配送费</p>
                <p>&#165;{{item.deliveryPrice}}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <Footer></Footer>
  </div>

<!--  <button @click="printSome">打印</button>-->
  <div v-for="(item,index) in hasPaidList ">{{item.userName}}</div>
</template>

<script setup lang="ts">
import Footer from "../components/Footer.vue";

import {getMyOrdersList} from "../api/api.js";
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "../router/index.js";

const userId = ref()
const myOrders = ref()
const hasPaidList = ref([])
const noPaidList = ref([])

function showDetail(item){
  item.showDetailed = !item.showDetailed
}

function goPay(orderId){
  console.log("支付"+orderId+"订单")
  router.push({path:'/payment',query:{orderId:orderId}})
}

function getMyOrders(){
  getMyOrdersList(userId.value).then(res=>{
    if (res.data.code === 200){
      const result = res.data.data
      console.log(result)
      // 未支付
      // hasPaidList.value = res.data.data.filter(order => order.orderState ===1);
      // noPaidList.value = res.data.data.filter(order => order.orderState ===0);
      for (let order of result){
        order.showDetailed = false
      }
      myOrders.value = result
      // console.log(hasPaidList)
    }else {
      ElMessage.error("加载失败请重试")
    }
  })
}

function printSome(){
  console.log()
}

function goIndex(){
  router.push('/index')
}

onMounted(async ()=>{
  userId.value = window.sessionStorage.getItem('userId')
  await getMyOrders()
})
</script>

<style scoped>

</style>