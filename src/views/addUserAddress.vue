<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>新增送货地址</p>
    </header>
    <!-- 表单部分 -->
    <ul class="form-box">
      <li>
        <div class="title">
          联系人：
        </div>
        <div class="content">
          <input type="text" v-model="deliveryAddress.contactName" placeholder="联系人
姓名">
        </div>
      </li>
      <li>
        <div class="title">
          性别：
        </div>
        <div class="content" style="font-size: 3vw;">
          <input type="radio" v-model="deliveryAddress.contactSex" value="1"
                 style="width:6vw;height:3.2vw;">男
          <input type="radio" v-model="deliveryAddress.contactSex" value="0"
                 style="width:6vw;height:3.2vw;">女
        </div>
      </li>
      <li>
        <div class="title">
          电话：
        </div>
        <div class="content">
          <input type="tel" v-model="deliveryAddress.contactTel" placeholder="电话">
        </div>
      </li>
      <li>
        <div class="title">
          收货地址：
        </div>
        <div class="content">
          <input type="text" v-model="deliveryAddress.address" placeholder="收货地址">
        </div>
      </li>
    </ul>
    <div class="button-add">
      <button @click="submitNewUserAddress">保存</button>
    </div>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from '../components/Footer.vue';
import {onMounted, ref} from "vue";
import {addUserAddress} from "../api/api.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";

const businessId = ref()
const userId = ref()

const deliveryAddress = ref({
  contactName:'',
  contactSex:'',
  contactTel:'',
  address:''
})

onMounted((()=>{
  userId.value = window.sessionStorage.getItem('userId')
  businessId.value = router.currentRoute.value.query.businessId
}))

function submitNewUserAddress(){
  if(deliveryAddress.value.contactName === ''){
    ElMessage.error("联系人名字不能为空，请重试");
    return;
  }
  if (deliveryAddress.value.contactTel === ''||deliveryAddress.value.contactTel.length !== 11) {
    ElMessage.error("联系人电话格式错误！")
    return;
  }
  if(deliveryAddress.value.address === ''){
    ElMessage.error("收货地址不能为空，请重试");
    return;
  }
  deliveryAddress.value.userId = userId.value;
  addUserAddress(deliveryAddress.value).then(res=>{
    if (res.data.code === 200){
      console.log(res.data.data)
      ElMessage.success("添加成功")
      router.push({path:'/userAddress',query:{businessId:businessId.value}})
    } else ElMessage.error("服务器异常，请重试")
  })
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 4.8vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.wrapper .form-box {
  width: 100%;
  margin-top: 12vw;
}
.wrapper .form-box li {
  box-sizing: border-box;
  padding: 4vw 3vw 0 3vw;
  display: flex;
}
.wrapper .form-box li .title {
  flex: 0 0 18vw;
  font-size: 3vw;
  font-weight: 700;
  color: #666;
}
.wrapper .form-box li .content {
  flex: 1;
  display: flex;
  align-items: center;
}
.wrapper .form-box li .content input {
  border: none;
  outline: none;
  width: 100%;
  height: 4vw;
  font-size: 3vw;
}
.wrapper .button-add {
  box-sizing: border-box;
  padding: 4vw 3vw 0 3vw;
}
.wrapper .button-add button {
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  border: none;
  outline: none;
  border-radius: 4px;
  color: #fff;
  background-color: #38CA73;
}
</style>