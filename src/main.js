import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局图标
import "./assets/fonts/iconfont.css"
import '../js/jquery-3.6.0.min'

Vue.config.productionTip = false

// 导入axios
import axios from 'axios'
// 把axios放到prototype里，可以通过this来获取$http
Vue.prototype.$http = axios
//axios请求拦截
//就是为了每一次请求接口，都有一个token值令牌，才能拿到对应的数据
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem("token")
  //必须返回config
  return config
})
// 配置URL的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
