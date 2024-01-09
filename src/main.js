import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
// import './assets/global.css'
import setupElementPlus from "./plugins/element-plus";
import router from "./router/index.js";
import axiosInstance from './api/index.js'
import {FontAwesomeIcon} from './plugins/font-awesome'
import axios from "axios";
import qs from "qs";


const  app = createApp(App)
app.provide("$axios",axios)
app.provide("$qs",qs)

app.use(router)
setupElementPlus(app)
app.config.globalProperties.$axios = axiosInstance
app.component('font-awesome-icon',FontAwesomeIcon)

app.mount('#app')
