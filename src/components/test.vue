<template>
<!--  <div class="w-100% h-100%">-->
    <button @click="test">点击测试</button>
    <img src="http://localhost:8000/api/Img/test.png">

    <Footer></Footer>
<!--  </div>-->
</template>

<script setup>
import {getTest} from "../api/api.js";
import {ref,inject} from "vue";
import Footer from "./Footer.vue";

let $http = inject("$axios")
let $qs = inject("$qs")

const test = async ()=>{
   await getTest().then(res=>{
     console.log(res.data)
   })
  // $http.get("http://127.0.0.1:8000/api/hello/sayHello/小明").then(res=>[
  //     console.log(res)
  // ])
}
</script>

<style scoped>

</style>