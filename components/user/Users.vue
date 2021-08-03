<template>
  <div>
  <!--  面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

  <!--  卡片试图区域-->
    <el-card>
<!--      搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="10">
          <div>
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格区域-->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!--添加switch按钮-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="changeSwitch(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175px">
          <!--作用域插槽-->
          <template>
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!--提示文字-->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <!--分配角色按钮-->
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  //存储数据
data(){
  return{
    //获取用户列表的参数对象
    queryInfo:{
      //查询参数
      query:"",
      //当前的页数
      pagenum:1,
      //当前每页显示多少条数据
      pagesize:2
    },
    userlist:[],
    total:0
  }

},
  //生命周期
  created () {
  this.getUserList()
  },
  //定义方法
  methods:{
    async getUserList(){
      const {data:res} =  await this.$http.get("users",{
      params:this.queryInfo
    })
      if (res.meta.status !==200){
        return this.$message.error("获取用户列表失败！")
      }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    //监听 页码 的修改事件
    handleSizeChange(newSize){
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //监听 页码值 的改变事件
    handleCurrentChange(newPage){
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //修改switch的状态
    async changeSwitch(changeInfo){
      // console.log(changeInfo)
      const {data:res} = await this.$http.put(`users/${changeInfo.id}/state/${changeInfo.mg_state}`)
      if (res.meta.status !==200){
        changeInfo.mg_state = !changeInfo.mg_state
        return this.$message.error("更新用户状态失败！")
      }
      this.$message.success("更新用户状态成功！")
    },
  }
}
</script>

<style scoped lang="less">
.el-breadcrumb{
  margin-bottom: 15px;
  font-size: 12px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
}
.el-table{
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination{
  margin-top: 15px;
}

</style>
