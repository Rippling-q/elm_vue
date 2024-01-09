<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>地址管理</p>
    </header>
    <!-- 地址列表部分 -->
    <ul class="addresslist">
      <li v-for="(item,index) in deliveryAddressArr">
        <div class="addresslist-left" @click="setDeliveryAddress(item)">
          <h3>{{item.contactName}}{{item.contactSex===1?'先生':'女士'}} {{item.contactTel}}
          </h3>
          <p class="pt-2">配送地址：{{item.address}}</p>
        </div>
        <div class="addresslist-right">
          <font-awesome-icon icon="edit" @click="editUserAddress(item.daId)"></font-awesome-icon>
          <font-awesome-icon icon="remove" @click="removeUserAddress(index)"></font-awesome-icon>
        </div>
      </li>
    </ul>
    <!-- 新增地址部分 -->
    <div class="addbtn" @click="toAddUserAddress">
      <font-awesome-icon icon="plus-circle" ></font-awesome-icon>
      <p>新增收货地址</p>
    </div>
<!--    <button @click="printsome">打印</button>-->
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import Footer from '../components/Footer.vue';
import {deleteUserAddress, getUserAddresses} from "../api/api.js";
import {computed, onMounted, ref} from "vue";
import {ElMessage,ElMessageBox} from "element-plus";
import router from "../router/index.js";


const businessId = ref()
const userId = ref()
const deliveryAddressArr = ref([])
const testarr = ref([1,2,3,4,5])

onMounted(()=>{
  userId.value = window.sessionStorage.getItem('userId')
  businessId.value = router.currentRoute.value.query.businessId
  // userId.value = 2
  // businessId.value = 1
  fetchDeliveryAddressByUserId()
})



function fetchDeliveryAddressByUserId(){
  getUserAddresses(userId.value).then(res=>{
    if(res.data.code === 200){
      console.log(res.data.data)
      deliveryAddressArr.value = res.data.data
    } else ElMessage.error("获取信息失败，请重试")
  })
}

function setDeliveryAddress(item){
  ElMessageBox.confirm('确定设置该地址为收货地址？',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:"warning"
  }).then(async ()=>{
    window.sessionStorage.setItem('defaultAddress',JSON.stringify(item))
    await router.push({path: '/order', query: {businessId: businessId.value}})
  }).catch(()=>{
    ElMessage.error("已取消")
  })

}

function editUserAddress(daId){
  router.push({path:'./editUserAddress',query:{daId:daId,businessId:businessId.value}})
}

function toAddUserAddress(){
  router.push({path:'/addUserAddress',query:{businessId:businessId.value}});
}

function removeUserAddress(index){
  ElMessageBox.confirm('确定删除该收货地址吗？',{
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    type:'warning'
  }).then(async ()=>{
    deleteUserAddress(deliveryAddressArr.value[index].daId).then(res=>{
      if (res.data.code === 200){
        console.log(res.data.data)
        deliveryAddressArr.value.splice(index,1)
        ElMessage.success("删除成功")
      }
    })
  }).catch(()=>{
    ElMessage.info("已取消")
  })
}


function printsome(){

}

</script>
<style scoped>

.wrapper {
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
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

.wrapper .addresslist {
  width: 100%;
  margin-top: 12vw;
  background-color: #fff;
}
.wrapper .addresslist li {
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px #DDD;
  padding: 3vw;
  display: flex;
}
.wrapper .addresslist li .addresslist-left {
  flex: 5;
  /*左边这块区域是可以点击的*/
  user-select: none;
  cursor: pointer;
}
.wrapper .addresslist li .addresslist-left h3 {
  font-size: 4.6vw;
  font-weight: 300;
  color: #666;
}
.wrapper .addresslist li .addresslist-left p {
  font-size: 4vw;
  color: #666;
}
.wrapper .addresslist li .addresslist-right {
  flex: 1;
  font-size: 5.6vw;
  color: #999;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.wrapper .addbtn {
  width: 100%;
  height: 14vw;
  border-top: solid 1px #DDD;
  border-bottom: solid 1px #DDD;
  background-color: #fff;
  margin-top: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5vw;
  color: #0097FF;
  user-select: none;
  cursor: pointer;
}
.wrapper .addbtn p {
  margin-left: 2vw;
}
</style>