<template>
  <div class="fixed top-0 w-full z-10 h-16 bg-blue-500 text-gray-50 text-xl flex justify-center items-center">商家列表</div>
  <div class="mt-14">
    <!-- 商家logo部分 -->
    <div class="flex justify-center rounded-lg">
      <img :src="BusinessInfo.businessImg" class="w-[190px] h-[190px] mt-3 mb-4">
    </div>
    <!-- 商家信息部分 -->
    <div class="text-gray-400">
      <h1 class="text-center font-bold text-xl text-black">{{BusinessInfo.businessName}}</h1>
      <p class="text-center mt-1">&#165;{{BusinessInfo.starPrice}}起送 &#165;{{BusinessInfo.deliveryPrice}}配送</p>
      <p class="text-center">{{BusinessInfo.businessExplain}}</p>
    </div>
    <button @click="printsome">打印</button>
    <!-- 食品列表部分 -->
    <ul class="ml-2 mr-2 w-full mt-5">
      <li v-for="(item,index) in FoodInfo" class="flex pb-4 mt-2 border-b-gray-200 border-b-2">
        <div class="mr-4 relative">
          <img :src="item.foodImg" class="z-0 w-[100px] h-[100px] rounded-xs">
        </div>
        <div class="w-4/5">
          <div class="font-bold text-xl flex mb-1 my-1">
            <h3 class="flex-grow">{{item.foodName}}</h3>
          </div>
          <div class="flex text-gray-600 my-1">
            <p class=" flex flex-grow text-gray-500">{{item.remarks}}</p>
            <div @click="minus(index)" v-show="item.quantity>0" class="cursor-pointer text-white bg-gray-400 font-bold rounded-full w-5 h-5 justify-center flex items-center text-xl">
              -
            </div>
            <p v-show="item.quantity>0" class="mx-2"><span>{{item.quantity}}</span></p>
            <div @click="add(index)" class="cursor-pointer text-white bg-sky-500 font-bold rounded-full w-5 h-5 justify-center flex items-center text-xl mr-2">
              +
            </div>
          </div>
          <div class="border-1 w-auto text-gray-500">
            &#165;{{item.foodPrice}}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="mb-16"> </div>
  <!--    底栏部分-->
  <div class="fixed bottom-0 h-16 w-full flex justify-between">
    <div class="bg-gray-500 w-2/3 flex">
      <div class="relative rounded-full w-20 h-20 flex items-center justify-center border-gray-700 border-[10px] bg-sky-500 ml-4 top-[-15px] text-white font-bold text-4xl">
        <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
        <div v-show="getTotalQuantity !== 0" class="absolute top-[-10px] right-[-10px] bg-red-400 rounded-full w-5 h-5 text-center text-white text-xl flex items-center justify-center">
          <p>{{getTotalQuantity}}</p>
        </div>
      </div>
      <div class="ml-2 mt-2">
        <p class="text-white">&#165;{{getTotalPrice}}</p>
        <p class="text-gray-200">另需配送费{{BusinessInfo.deliveryPrice}}元</p>
      </div>
    </div>
    <div v-if="getTotalPrice<BusinessInfo.starPrice" class="cursor-pointer w-1/3 flex items-center justify-center text-white font-bold text-xl" style="background-color: #535356;" >未达起送费</div>
    <div v-else class="cursor-pointer bg-green-500 w-1/3 flex items-center justify-center text-white font-bold text-xl" @click="Tosettle">去结算</div>
  </div>
  <!--    底栏部分-->
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import router from "../router/index.js";
import {
  deleteOrderById,
  getBusinessInfoById,
  getCartByUserIdAndBusinessId,
  getFoodByBusinessId,
  getOrdersByUserIdAndBusinessId,
  removeCart,
  saveCart,
  updateCart
} from "../api/api.js";
import {ElMessage, ElMessageBox} from "element-plus";

const userId = ref()
const BusinessInfo = ref({})
const FoodInfo = ref([])
const BusinessId = ref()
const MyCartInfo = ref([])


function fetchBusinessInfo(){
  getBusinessInfoById(BusinessId.value).then(res=>{
    if (res.data.code === 200){
      // console.log(res.data.data)
      BusinessInfo.value = res.data.data
    }
    else ElMessage.error("获取商家信息失败，请重试")
  })
}

function fetchMyOrder(){
  getOrdersByUserIdAndBusinessId(userId.value,BusinessId.value).then(res=>{
    if (res.data.code === 200){
      if (res.data.data !== null){
        let orderId = res.data.data[0].orderId
        ElMessageBox.confirm("你还有未处理的订单",
            {
              confirmButtonText:'去处理',
              cancelButtonText:'取消订单',
              type:'warning'
            }
        ).then(()=>{
          router.push({path:'/payment',query:{orderId:orderId}})
        }).catch(()=>{
          ElMessageBox.confirm("确定取消该订单？",
              {
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
              }
          ).then(()=>{
            deleteOrderById(orderId).then(res=>{
              if (res.data.code === 200){
                ElMessage.success("已取消该订单")
              }
            })
          }).catch(()=>{
            router.push('/index')
          })
        })
      }
    }
  })
}

async function fetchFoodInfo() {
   let res =await getFoodByBusinessId(BusinessId.value)
    if (res.data.code === 200){
      FoodInfo.value = res.data.data
      console.log(FoodInfo.value)
    }
    else ElMessage.error("获取信息失败，请重试")
    FoodInfo.value.forEach(foodItem=>{
      foodItem["quantity"] = 0
    })
}

async function fetchMyCart(){
  let res = await getCartByUserIdAndBusinessId(userId.value,BusinessId.value)
    if (res.data.code === 200){
      console.log(res.data.data)
      MyCartInfo.value = res.data.data
      FoodInfo.value.sort();
    }else {ElMessage.error("获取购物车信息失败，请重试")}
    FoodInfo.value.forEach(foodItem=>{
      MyCartInfo.value.forEach(cartDetailItem=>{
        if (foodItem.foodId === cartDetailItem.foodId){
          foodItem["quantity"] = cartDetailItem.quantity
        }
      })
    })
}


onMounted(async ()=>{
  userId.value = window.sessionStorage.getItem('userId')
  BusinessId.value = router.currentRoute.value.query.businessId
  fetchBusinessInfo()
  fetchMyOrder()
  await fetchFoodInfo()
  await fetchMyCart()
})

function add(index){
  // console.log("加"+FoodInfo.value[index].foodId)
  if (userId.value === null){
    router.push('/login')
  }
  //新增
  if (FoodInfo.value[index].quantity === 0){
    saveCart({
      foodId:FoodInfo.value[index].foodId,
      businessId:BusinessInfo.value.businessId,
      userId:userId.value,
      quantity:1
    }).then(res=>{
      console.log(res.data)
      if (res.data.code === 200){
        FoodInfo.value[index].quantity = 1;
        FoodInfo.value.sort();
      }else ElMessage.error("出错了，请重试")
    }).catch(error=>{
      ElMessage.error("服务器请求失败，错误信息： "+error)
    })
  }
  //更新
  else {
    updateCart({
      foodId:FoodInfo.value[index].foodId,
      businessId:BusinessInfo.value.businessId,
      userId:userId.value,
      quantity:FoodInfo.value[index].quantity+1
    }).then(res=>{
      if (res.data.code === 200){
        // console.log(res.data.data)
        FoodInfo.value[index].quantity +=1
        FoodInfo.value.sort();
      }
    })
  }
}

function minus(index){
  // console.log("减"+FoodInfo.value[index].foodId)
  console.log(userId.value)
  if (userId.value === null){
    router.push('/login')
  }
  if (FoodInfo.value[index].quantity === 1){
    // 删除购物车
    removeCart({
      userId: userId.value,
      businessId: BusinessInfo.value.businessId,
      foodId: FoodInfo.value[index].foodId,
    }).then(res=>{
      if (res.data.code === 200){
        console.log(res.data)
        FoodInfo.value[index].quantity = 0;
      }else ElMessage.error("服务器异常，请重试")
    })
  }else {
    updateCart({
      foodId:FoodInfo.value[index].foodId,
      businessId:BusinessInfo.value.businessId,
      userId:userId.value,
      quantity:FoodInfo.value[index].quantity-1
    }).then(res=>{
      if (res.data.code === 200){
        FoodInfo.value[index].quantity -= 1
      }
    })
  }
}

const getTotalPrice = computed(()=>{
  let totalPrice = 0;
  FoodInfo.value.forEach(foodItem=>{
    totalPrice += foodItem.foodPrice*foodItem.quantity
  })
  return totalPrice;
})

const getTotalQuantity = computed(()=>{
  let totalQuantity = 0;
  FoodInfo.value.forEach(foodItem=>{
    totalQuantity += foodItem.quantity
  })
  return totalQuantity;
})

const getSettle = computed(()=>{
  return getTotalPrice+BusinessInfo.value.deliveryPrice
})

function Tosettle(){
  router.push({path:'/order',query:{businessId:BusinessId.value}})
}


function printsome() {
  console.log(FoodInfo.value)
  console.log(MyCartInfo.value)
  // axios.delete("http://localhost:8000/api/CartController/removeCart", {data:{
  //   userId: 2,
  //   businessId: 1,
  //   foodId: 15,
  //   quantity: 1
  // }}).then(res=>{
  //   console.log(res.data)
  // })
}


</script>

<style scoped>

</style>