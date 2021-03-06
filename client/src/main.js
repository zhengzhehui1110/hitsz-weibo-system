import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
// import axios from 'axios'
import MuseUI from 'muse-ui';
import Message from 'muse-ui-message';
import Helpers from 'muse-ui/lib/Helpers';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import Toast from 'muse-ui-toast';
import './global/global.css' // 全局样式文件
// import {axiosConfig, url} from './http/config' // axios全局配置
import {_axios, url} from './http/config' // axios全局配置
import {localUserInfo} from '@/global/localUserInfo'
import './components/index' // 全局组件自动注册
// import theme from 'muse-ui/lib/theme';

// theme.use('dark');
// theme.add('teal', {
//   primary: '#009688',
//   secondary: '#ff4081',
//   success: '#4caf50',
//   warning: '#ffeb3b',
// }, 'light');

// theme.use('teal');

// MuseUI.theme.add('carbon', carbon).addCreateTheme(createTheme).use('carbon');

Vue.use(MuseUI);
Vue.use(Message);
Vue.use(Toast);
Vue.use(Helpers);
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.axios = _axios // 引入axios并挂载到vue原型链
Vue.prototype.$url = url // 所有http请求的路由
Vue.prototype.$global = {}
Vue.prototype.$user = localUserInfo // 浏览器缓存进行用户信息存储 

Date.prototype.format = function (fmt) { // 日期格式化
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
              .length)));
      }
  }
  return fmt;
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
