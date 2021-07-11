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
        <el-aside width="200px">
      <!--侧边菜单栏-->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b">
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>导航一</span>
              </template>
                <!--二级菜单-->
                <el-menu-item index="1-4-1">
                  <!-- 图标 -->
                  <i class="el-icon-location"></i>
                  <!-- 文本 -->
                  <span @click="xiCha">喜茶</span>
                </el-menu-item>
              </el-submenu>
          </el-menu>
        </el-aside>

      <!--右侧内容主体-->
        <el-main>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      //左侧菜单数据
      menulist:"",
    }
  },
  //生命周期
  created () {
    this.getMenulist()
  },
  methods: {
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // Message提示信息
      this.$message.success('退出成功！')
    },
    async getMenulist () {
      const { data: res } = await this.$http.get("menus")
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    xiCha(){

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
}

</style>
