<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>在线支付</p>
    </header>

    <!-- 订单信息部分 -->
    <h3>订单信息：</h3>
    <div class="order-info" @click="showDetail">
      <p>
        {{order.businessName}}
        <i class="fa fa-caret-down" @click="showDetail"></i>
      </p>
      <p>&#165;{{order.orderTotal}}</p>
    </div>

    <!-- 订单明细部分 -->
    <ul class="order-detailet" v-show="isShowDetailet">
      <li v-for="item in order.orderDetailetsDTO">
        <p>{{item.foodName}} x {{item.quantity}}</p>
        <p>&#165;{{item.foodPrice*item.quantity}}</p>
      </li>
      <li>
        <p>配送费</p>
        <p>&#165;{{order.deliveryPrice}}</p>
      </li>
    </ul>

    <!-- 支付方式部分 -->
    <ul class="payment-type">
      <li>
        <img src="../assets/Img/alipay.png">
        <div class=" w-1/5 flex justify-end pr-2">
          <input type="radio" v-model="payWay" value="alipay" class="form-radio text-blue-500 w-5 h-5">
        </div>
      </li>
      <li>
        <img src="../assets/Img/wechat.png">
        <div class="w-1/5 flex justify-end pr-2">
          <input type="radio" v-model="payWay"  value="wechat" class="form-radio text-blue-500 w-5 h-5">
        </div>
      </li>
    </ul>
    <div class="payment-button">
      <button @click="payOrder">确认支付</button>
    </div>
<!--    <button @click="printsome">打印</button>-->

    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import {onMounted, onUnmounted, ref} from 'vue'
import router from "../router/index.js";
import {getOrderByOrderId, payMyOrder} from "../api/api.js";
import {ElMessage, ElMessageBox} from "element-plus";

const business = ref({})
const order = ref({})
const isShowDetailet = ref(false)
const orderId = ref()
const payWay = ref()

onMounted(()=>{
  orderId.value = router.currentRoute.value.query.orderId
  fetchOrder()
  //一旦路由到在线支付组件，就不能回到订单确认组件。
  //先将当前url添加到history对象中
  history.pushState(null,null,document.URL);
  //监听history对象的变化
  window.onpopstate = () => {
    router.push({path: '/index'});
  }
})

onUnmounted(()=>{
  window.onpopstate = null;
})

function fetchOrder(){
  getOrderByOrderId(orderId.value).then(res=>{
    if (res.data.code === 200){
      console.log(res.data.data)
      order.value = res.data.data
    }else ElMessage.error("获取信息失败，请重试")
  })
}

function showDetail(){
  isShowDetailet.value = !isShowDetailet.value
}

function payOrder() {
  payMyOrder(order.value).then(res=>{
    if (res.data.code === 200){
      ElMessageBox.confirm('确认支付？',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(async ()=>{
        ElMessage.success("支付成功")
        router.push('/index')
      }).catch(()=>{
        ElMessage.warning('已取消')
      })
    }else {
      ElMessage.warning("该订单已支付")
      router.push('/index')
    }
  })
}

function printsome(){
  console.log(payWay.value)
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

.wrapper h3 {
  margin-top: 12vw;
  box-sizing: border-box;
  padding: 4vw 4vw 0;

  font-size: 4vw;
  font-weight: 300;
  color: #999;
}

.wrapper .order-info {
  box-sizing: border-box;
  padding: 4vw;
  font-size: 4vw;
  color: #666;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper .order-info p:last-child {
  color: orangered;
}

.wrapper .order-detailet {
  width: 100%;
}

.wrapper .order-detailet li {
  width: 100%;
  box-sizing: border-box;
  padding: 1vw 4vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper .order-detailet li p {
  font-size: 3vw;
  color: #666;
}

.wrapper .payment-type {
  width: 100%;
}

.wrapper .payment-type li {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper .payment-type li img {
  width: 33vw;
  height: 8.9vw;
}

.wrapper .payment-type li .fa-check-circle {
  font-size: 5vw;
  color: #38CA73;
}

.wrapper .payment-button {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;
}

.wrapper .payment-button button {
  width: 100%;
  height: 10vw;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: #38CA73;
  color: #fff;
}
</style>
