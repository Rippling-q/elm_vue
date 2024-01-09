<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>确认订单</p>
    </header>
    <!-- 订单信息部分 -->
    <div class="order-info">
      <h5>订单配送至：</h5>
      <div class="order-info-address" >
        <p>{{selectedAddress.address===undefined?'请选择':selectedAddress.address}}</p>
        <font-awesome-icon icon="angle-right" @click="toUserAddress"></font-awesome-icon>
      </div>
      <p v-if="selectedAddress.contactSex!==undefined">{{selectedAddress.contactName}}--{{selectedAddress.contactSex===1?'先生':'女士'}}</p>
      <p>联系电话；{{getTel}}</p>
    </div>

    <h3>{{business.businessName}}</h3>
    <!-- 订单明细部分 -->
    <ul class="order-detailed">
      <li v-for="item in cartArr">
        <div class="order-detailed-left">
          <img :src="item.foodImg">
          <p>{{item.foodName}} x {{item.quantity}}</p>
        </div>
        <p>&#165;{{item.foodPrice*item.quantity}}</p>
      </li>
    </ul>
    <div class="order-deliveryfee">
      <p>配送费</p>
      <p>&#165;{{business.deliveryPrice}}</p>
    </div>
    <!-- 合计部分 -->
    <div class="total">
      <div class="total-left">
        &#165;{{getTotalPrice}}
      </div>
      <div class="total-right" @click="toPayment">
        去支付
      </div>
    </div>
  </div>
<!--  <button @click="printsome">打印</button>-->
</template>

<script setup>

import {computed, onMounted, ref} from "vue";
import {createOrder, getBusinessInfoById, getCartByUserIdAndBusinessId, getUserAddresses} from "../api/api.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";

const BusinessId = ref()
const user = ref()
const userId = ref()
const business = ref({})
const deliveryaddress = ref([])
const cartArr = ref([])
const selectedAddress = ref({})

onMounted(async ()=>{
  userId.value = window.sessionStorage.getItem('userId')
  BusinessId.value = router.currentRoute.value.query.businessId
  await fetchMyCarts()
  fetchBusinessInfo()
  fetchMyAddress()
})

function fetchBusinessInfo() {
  getBusinessInfoById(router.currentRoute.value.query.businessId).then(res=>{
    if (res.data.code === 200){
      // console.log(res.data.data)
      business.value = res.data.data
    }else {
      ElMessage.error("获取信息失败，请重试")
    }
  })
}

function fetchMyCarts(){
  getCartByUserIdAndBusinessId(userId.value,BusinessId.value).then(res=>{
    if (res.data.code === 200){
      console.log(res.data.data)
      cartArr.value = res.data.data
    }else ElMessage.error("获取信息失败，请重试")
  })
}

function fetchMyAddress(){
  if (window.sessionStorage.getItem('defaultAddress')===null){
    getUserAddresses(userId.value).then(res=>{
      console.log(res.data.data)
      if (res.data.code === 200){
        if (res.data.data.length>0){
          selectedAddress.value = res.data.data[0]
          window.sessionStorage.setItem('defaultAddress',JSON.stringify(selectedAddress.value))
        }
      } else ElMessage.error("获取信息失败，请重试")
    })
  }else selectedAddress.value = JSON.parse(window.sessionStorage.getItem('defaultAddress'))
}

const getTotalPrice = computed(()=>{
  let TotalPrice = 0;
  cartArr.value.forEach(cartItem=>[
    TotalPrice += cartItem.foodPrice*cartItem.quantity
  ])
  return TotalPrice+business.value.deliveryPrice;
})

const getTel = computed(()=>{
  let telephone = String(selectedAddress.value.contactTel)
  if (telephone !== null) telephone = telephone.slice(0,3)+"****"+telephone.substring(7);
  else telephone = "未选择收货地址"
  return telephone;
})

function toUserAddress(){
  router.push({path:'/userAddress',query:{businessId:BusinessId.value}})
  console.log()
}

function toPayment(){
  const OrdersDTO = ref({
    userId:userId.value,
    businessId:BusinessId.value,
    orderTotal:getTotalPrice.value,
    deliveryAddressId:JSON.parse(window.sessionStorage.getItem('defaultAddress')).daId,
  })
  console.log(OrdersDTO.value)
  createOrder(OrdersDTO.value).then(res=>{
    // console.log(res.data)
    if (res.data.code === 200){
      router.push({path:'/payment',query:{orderId:res.data.data.orderId}})
    }
  })

}

function printsome(){
  // console.log(selectedAddress.value.contactTel.slice(0,3)+"****"+selectedAddress.value.contactTel.substring(7))
  // console.log(window.sessionStorage.getItem('defaultAddress'))
  console.log(cartArr.value)
  // console.log(deliveryaddress.value)
}

</script>
<style scoped>

.wrapper {
  width: 100%;
  height: 100%;
}

.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  color: #fff;
  font-size: 4.8vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper .order-info {
  /*注意这里，不设置高，靠内容撑开。因为地址有可能折行*/
  width: 100%;
  margin-top: 12vw;
  background-color: #0097EF;
  box-sizing: border-box;
  padding: 2vw;
  color: #fff;
}
.wrapper .order-info h5 {
  font-size: 3vw;
  font-weight: 300;
}
.wrapper .order-info .order-info-address {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  user-select: none;
  cursor: pointer;
  margin: 1vw 0;
}
.wrapper .order-info .order-info-address p {
  width: 90%;
  font-size: 5vw;
}
.wrapper .order-info .order-info-address i {
  font-size: 6vw;
}
.wrapper .order-info p {
  font-size: 3vw;
}
.wrapper h3 {
  box-sizing: border-box;
  padding: 3vw;
  font-size: 4vw;
  color: #666;
  border-bottom: solid 1px #DDD;
}
/****************** 订单明细部分 ******************/
.wrapper .order-detailed {
  width: 100%;
}
.wrapper .order-detailed li {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .order-detailed li .order-detailed-left {
  display: flex;
  align-items: center;
}
.wrapper .order-detailed li .order-detailed-left img {
  width: 10vw;
  height: 10vw;
}
.wrapper .order-detailed li .order-detailed-left p {
  font-size: 3.5vw;
  margin-left: 3vw;
}
.wrapper .order-detailed li p {
  font-size: 3.5vw;
}
.wrapper .order-deliveryfee {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.5vw;
}
/****************** 订单合计部分 ******************/
.wrapper .total {
  width: 100%;
  height: 14vw;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}
.wrapper .total .total-left {
  flex: 2;
  background-color: #505051;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .total .total-right {
  flex: 1;
  background-color: #38CA73;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
