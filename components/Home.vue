<template>
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <div>
          <!--logo-->
          <a href="https://www.hzevc.edu.cn/">
            <img src="../src/assets/logo-header.png" alt="">
          </a>
        </div>
        <el-button type="info" @click="loginout">退出登录</el-button>
      </el-header>

      <!--页面主体区域-->
      <el-container>
      <!--侧边栏-->
        <el-aside :width="iscollapse ? '64px' : '200px'">
      <!--侧边菜单栏-->
          <!--折叠菜单栏-->
          <div class="toggle-button" @click="toggleCollapse">---</div>
          <el-menu background-color="#333744"
                   text-color="#fff"
                   active-text-color="#409EFF"
                   :unique-opened="true"
                   :collapse="iscollapse"
                   :collapse-transition="false"
                   :router="true"
                   :default-active="activePath">

            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>

                <!--二级菜单-->
                <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" :key="subitem.id"
                @click="saveNavState('/' + subitem.path)">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subitem.authName}}</span>
                </el-menu-item>
              </el-submenu>
          </el-menu>
        </el-aside>

      <!--右侧内容主体-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      //左侧菜单数据
      menulist: [],
      //图标的自定义
      iconsObj: {
        "125": "iconfont icon-users",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },

      //是否折叠
      iscollapse: false,
      //被激活的链接地址
      activePath:''
    }
  },
  //生命周期
  created () {
    this.getMenulist()
    //取出activePath的地址值
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {

    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // Message提示信息
      this.$message.success('退出成功！')
    },

    //获取所有的菜单
    async getMenulist () {
      const { data: res } = await this.$http.get("menus")
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },

    toggleCollapse () {
      this.iscollapse = !this.iscollapse
    },

    //保存链接的激活状态,将路由地址值保存在sessionStorage
    saveNavState(activePath){
      window.sessionStorage.setItem("activePath",activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    height: 55px;
    width: 250px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.iconfont{
  margin-right: 10px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: white;
  text-align: center;
  letter-spacing: 0.2em;
  //添加鼠标选择状态
  cursor:pointer;
}
.el-main{
  background-color: white;
}

</style>
