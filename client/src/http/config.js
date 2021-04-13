// 有关http请求的配置

import axios from 'axios'
import Vue from 'vue'
import Toast from 'muse-ui-toast';
Vue.use(Toast);
const vm = new Vue()

const axiosConfig = { // axios全局配置
    baseURL: 'http://localhost:3000/',
    timeout: 2000,
}

// 封装拦截器
var my_axios = axios.create(axiosConfig)
my_axios.interceptors.response.use(
    function (res) {
        console.log('收到请求', res.data);
        if(!res.data || res.data.code!=='e0000') {
            vm.$toast.error((res.data && res.data.errMsg) || (res.data && res.data.code) || '数据出错了')
            return Promise.reject(res)
        }
        return res
    },
    function (err) {
        this.$toast.error('网络出错了')
        return Promise.reject(err)
    }
)
export var _axios = my_axios;

export const url = { // 后端请求url路由名称集合
    user: {
        signUp: 'users/signup',
        logIn: 'users/login',
        editInfo: '',
        exit: 'users/exit'
    },
    artical: {
        post: 'artical/post',
        getArticalsByUser: 'artical/getArticalsByUser',
    }
}
