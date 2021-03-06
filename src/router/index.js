import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../../components/Login.vue'
// 导入全局样式表
import '../assets/css/global.css'
// 导入Home
import Home from '../../components/Home.vue'
import Welcome from '../../components/Welcome.vue'
import Users from '../../components/user/Users.vue'
import Rights from '../../components/power/rights.vue'
import Roles from '../../components/power/roles.vue'
import Cate from '../../components/goods/Cate'
import Goods from '../../components/goods/Goods'
import Params from '../../components/goods/Params'


Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home,
      redirect:'/Welcome',
      children:[
        { path:'/Welcome', component:Welcome},
        { path:'/users',component:Users},
        { path:'/rights',component:Rights},
        { path:'/roles',component:Roles},
        { path:'/categories',component:Cate},
        { path:'/goods',component:Goods},
        { path:'/params',component:Params},
        ]
    },
    ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next)=>{
  // to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //  next 是一个函数，表示放行
  // next() 放行   next（'路径'）强制跳转

  if(to.path === "/login") return next()
  // 获取token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router

