import { createRouter, createWebHistory } from 'vue-router';

import index from '../views/index.vue';
import register from '../views/register.vue'
import login from '../views/login.vue'
import userInfo from "../views/userInfo.vue"
import businessList from "../views/businessList.vue";
import businessInfo from "../views/businessInfo.vue";
import order from "../views/order.vue"
import orderList from "../views/orderList.vue";
import payment from '../views/payment.vue';
import userAddress from "../views/userAddress.vue";
import addUserAddress from "../views/addUserAddress.vue";
import editUserAddress from "../views/editUserAddress.vue"

import test from "../components/test.vue"
import test2 from "../components/test2.vue"

const routes = [
    {path: '/', redirect: '/login' },
    {path:'/index',component:index},
    {path:'/register',component:register},
    {path:'/login',component:login},
    {path:'/userInfo',component:userInfo},
    {path:'/businessList',component:businessList},
    {path:'/businessInfo',component:businessInfo},
    {path:'/order',component:order},
    {path:'/orderList',component:orderList},
    {path:'/payment',component:payment},
    {path:'/userAddress',component:userAddress},
    {path:'/editUserAddress',component:editUserAddress},
    {path:'/addUserAddress',component:addUserAddress},

    {path:'/test',component:test},
    {path:'/test2',component:test2},
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next)=>{
//     if (to.path === './login' || to.path === './register') return next();
//     const userId = window.sessionStorage.getItem('userId');
//     if (userId === null) return next('./login');
// })

export default router;