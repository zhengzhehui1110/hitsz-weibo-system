import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
// import axios from 'axios'
import MuseUI from 'muse-ui';
import Message from 'muse-ui-message';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import Toast from 'muse-ui-toast';
import './global/global.css' // 全局样式文件
// import {axiosConfig, url} from './http/config' // axios全局配置
import {_axios, url} from './http/config' // axios全局配置
import './components/index' // 全局组件自动注册

Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Toast);
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.axios = _axios // 引入axios并挂载到vue原型链
Vue.prototype.$url = url // 所有http请求的路由

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
