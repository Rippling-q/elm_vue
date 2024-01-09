import Axios from "axios";
import router from "../router/index.js";
import {ElMessage} from "element-plus";

const axiosInstance = Axios.create({withCredentials:false});

// axiosInstance.defaults.transformRequest = [function (data){ //将发送的post参数封装成FROM-DATA，使后端接收
//     let ret = ''
//     for (let it in data){
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }];


axiosInstance.interceptors.request.use(config=>{
    // config.headers['token'] = JSON.parse(window.sessionStorage.getItem('token')[1] || '')
    config.headers['token'] = window.sessionStorage.getItem('token') || ''
    config.headers['refreshToken'] = window.sessionStorage.getItem('refreshToken') || ''
    return config
})


axiosInstance.interceptors.response.use(res=>{
    let state = res.data.code
    if (state === 401){
        router.push('/login').then(() => ElMessage.warning("请登录"))
    }
    const { token, refreshToken } = res.data;
    if (token && refreshToken) {
        window.sessionStorage.setItem("token", token);
        window.sessionStorage.setItem("refreshToken", refreshToken);
        let lostRequest = res.config
        return axiosInstance(lostRequest)
    }
    return res;
},error => {
    return Promise.reject(error)
})


export default axiosInstance;
