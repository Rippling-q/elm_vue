<template>
  <div class="w-full">
    <div class="wrapper w-full ">
      <!--header部分-->
      <header class="!w-full">
        <div class="flex items-center text-gray-50 text-2xl p-2 bg-blue-600" >
          <div class="icon-location-box mr-3">
            <div class="icon-location"></div>
          </div>
          沈阳市规划大厦
          <font-awesome-icon class="ml-2" icon="caret-down" size="lg"/>
        </div>
        <!--    搜索部分-->
        <div class="w-full">
          <div class="w-full !z-10 p-2 bg-blue-600" :style="{ 'position': searchPosition, 'left': '0', 'top': '0' }"
               ref="fixedBox">
            <el-input class="w-full bg-white text-gray-400 h-9.9vw rounded text-center flex justify-center" v-model="searchContent" placeholder="搜索商家名、商品名">
              <template #prefix>
                <font-awesome-icon icon="search"></font-awesome-icon>
              </template>
              <template #append>
                <font-awesome-icon icon="search" @click="searchBusinessInfo"></font-awesome-icon>
              </template>
            </el-input>
          </div>
        </div>
      </header>

      <div class="w-full bg-gray-100 flex justify-around">
        <ul class=" flex flex-wrap bg-white- rounded-2xl">
          <div ref="fixedBoxPlaceholder" :style="{'height':placeholderHeight}" class="w-full"></div>
          <li v-for="(item,index) in dcfl" class="w-1/5 cursor-pointer ">
            <img class="w-10/12 mx-auto" :src="item.Src" @click="goOrderType(index+1)"><p class="flex justify-center pr-1">{{item.word}}</p>
          </li>
        </ul>
      </div>
      <!--  广告-->
      <div class=" h-auto justify-center mx-2">
        <div class="w-full h-auto bg-gray-200 items-center back_img">
          <div class="w-full h-1/2 items-center">
            <h3 class="my-1.5 mx-1 font-bold">品质套餐</h3>
            <p class="my-1.5 mx-1">搭配齐全吃得好</p>
          </div>
          <div class="w-full h-1/2 items-center">
            <p class="mx-1 my-1.5  text-yellow-400 pt-4 cursor-pointer">立即抢购 &gt;</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 超级会员部分 -->
    <div class="m-2 flex items-center rounded bg-yellow-200">
      <div class="flex flex-grow items-center">
        <img src="../assets/Img/super_member.png" class="p-2 w-auto">
        <h3 class="font-bold text-xl">超级会员</h3>
        <p>&#8226; 每月享超值权益</p>
      </div>
      <div class="mr-2 cursor-pointer">
        立即开通 &gt;
      </div>
    </div>
    <!-- 推荐商家部分 -->
    <div class="flex items-center justify-center">
      <div class="w-8 h-0.5  bg-gray-500 mr-2"></div>
      <p class="text-xl">推荐商家</p>
      <div class="w-8 h-0.5  bg-gray-500 ml-2"></div>
    </div>
    <!-- 推荐方式部分 -->
    <ul class="flex m-2 justify-center text-center">
      <li class="w-1/4 mx-auto cursor-pointer">综合排序</li>
      <li class="w-1/4 mx-auto cursor-pointer">距离最近</li>
      <li class="w-1/4 mx-auto cursor-pointer">销量最高</li>
      <li class="w-1/4 mx-auto cursor-pointer">筛选</li>
    </ul>

    <!--    商家店铺部分-->
    <div class=" w-full bg-gray-50 flex justify-around mt-2 rounded-2xl">
      <ul class="ml-2 mr-2 w-full cursor-pointer">
        <li v-for="(item,index) in AllBusinessList" key="item.businessId" @click="enterStore(item.businessId)" class="flex flex-row pb-4 mt-2 border-b-gray-500">
          <img class="w-1/5 h-1/5 m-4 items-center" :src="item.businessImg" >
          <div class="w-4/5">
            <div class="font-bold text-xl flex mb-1">
              <h3 class="flex-grow">{{item.businessName}}</h3>
              <div class="text-white  bg-gray-500">&#8226;</div>
            </div>
            <div class="flex">
              <div class="flex flex-grow">
                <i v-for="index in 5" class="text-yellow-300"><font-awesome-icon  icon="star"></font-awesome-icon></i>
                <p>4.9 月售345单</p>
              </div>
              <div class="bg-blue-500 text-white pl-0.5 pr-0.5 rounded">
                蜂鸟专送
              </div>
            </div>
            <div class="flex text-gray-600">
              <p class="flex flex-grow">&#165;{{item.starPrice}}起送 | &#165;{{item.deliveryPrice}}配送</p>
              <p>4.23km | 30分钟</p>
            </div>
            <div class="border-1 w-autotext-gray-500">
              {{item.businessExplain}}
            </div>
            <div class="text-gray-500 flex justify-between mt-2">
              <div class="flex">
                <div class="mr-2 w-5 rounded text-center bg-green-600 text-white">新</div>
                <p>饿了么新用户首单立减9元</p>
              </div>
              <div>
                <p>2个活动</p>
              </div>
            </div>
            <div class="mt-2 text-gray-600">
              <div class="flex">
                <div class="mr-2 w-5 rounded text-center bg-amber-300 text-white">特</div>
                <p>特价商品5元起</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-button @click="printSome">打印</el-button>
    <div class="mb-16"> </div>
<!--    用大写双标签，保存一致-->
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import usePub from '../util/pub-use.ts'
import {getAllBusinessList,searchBusinessByName} from "../api/api.js";
import router from "../router/index.js";
import Footer  from "../components/Footer.vue";

const Pub = usePub()
const getAssetsFile = Pub.getAssetsFile
const AllBusinessList = ref([])
const searchContent = ref()

const dcfl = ref([{
  Src:getAssetsFile('dcfl01.png'),
  word:"美食"},{
  Src:getAssetsFile('dcfl02.png'),
  word:"早餐"},{
  Src:getAssetsFile('dcfl03.png'),
  word:"跑腿代购"},{
  Src:getAssetsFile('dcfl04.png'),
  word:"汉堡披萨"},{
  Src:getAssetsFile('dcfl05.png'),
  word:"甜品饮品"},{
  Src:getAssetsFile('dcfl06.png'),
  word:"速食简餐"},{
  Src:getAssetsFile('dcfl07.png'),
  word:"地方小吃"},{
  Src:getAssetsFile('dcfl08.png'),
  word:"米粉面馆"},{
  Src:getAssetsFile('dcfl09.png'),
  word:"包子粥铺"},{
  Src:getAssetsFile('dcfl10.png'),
  word:"炸鸡炸串"}
])


const searchPosition = ref('static');
const placeholderHeight = ref(0);
const fixedBox = ref()
const fixedBoxPlaceholder = ref()

onBeforeUnmount(() => {
  window.removeEventListener('scroll', fixedSearchBox);
});
function fixedSearchBox(){
  const scrollDistance = window.scrollY;
  const width = document.documentElement.clientWidth;
  // const placeholder = fixedBoxPlaceholder;

  if (scrollDistance > width * 0.14){
    searchPosition.value = 'fixed';
    placeholderHeight.value = fixedBox.value.offsetHeight + 'px';
  } else {
    searchPosition.value = 'static';
    placeholderHeight.value = '0px';
  }
}

onMounted(()=>{
  getAllList()
  window.addEventListener('scroll', fixedSearchBox);
})

function getAllList(){
  getAllBusinessList().then(res=>{
    AllBusinessList.value = res.data.data
    // console.log(AllBusinessList)
  })
}


function goOrderType(index){
  router.push({path:'/businessList',query:{orderType:index}})
}

function enterStore(businessId){
  console.log(businessId)
  router.push({path:'/businessInfo',query:{businessId:businessId}})

}

function goOrdersList() {
  router.push('/orderList')
}

function printSome(){
  console.log(window.sessionStorage.getItem('token'))
}

function searchBusinessInfo(){
  console.log(searchContent.value)
  if (searchContent.value !== null && searchContent.value !== ""){
    searchBusinessByName(searchContent.value).then(res=>{
      if (res.data.code === 200){
        console.log(res.data.data)
        AllBusinessList.value = res.data.data
      }
      else {ElMessage.error("获取信息错误，请重试")}
    })
  }
  else getAllList()
}

</script>

<style scoped>
.back_img{

  background-image: url(../assets/Img/index_banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding: 2vw 6vw;
  height: auto;
}

.icon-location-box {
  width: 4.9vw;
  height: 4.9vw;
  margin: 0 1vw 0 3vw;
}

.icon-location {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50% 50% 50% 0;
  background: #fff;
  transform: rotate(-45deg);
}
.icon-location:after {
  content: '';
  width: 40%;
  height: 40%;
  margin: 30% 0 0 29%;
  background-color: #0097FF;
  position: absolute;
  border-radius: 50%;
}

</style>

