import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局图标
import "./assets/fonts/iconfont.css"

Vue.config.productionTip = false

//导入axios
import axios from 'axios'
// 把axios放到prototype里，可以通过this来获取$http
Vue.prototype.$http = axios
//配置URL的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
