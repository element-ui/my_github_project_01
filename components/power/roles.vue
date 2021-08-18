<template>
<!--角色列表-->
<div>
  <!--面包屑-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!--  卡片-->
  <el-card>
    <!--添加按钮用户-->
    <el-button type="primary">添加用户</el-button>

    <!--表格区域-->
    <el-table :data="rolesList" border stripe>
      <!--展开列-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1 === 0 ? 'bdtop' : '','bdcenter']">
            <!--渲染一级权限-->
            <el-col :span="5">
            <el-tag closable @close="removeTag(scope.row,item1.id)">{{item1.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
            </el-col>
            <!--渲染二级和三级权限-->
            <el-col :span="19">

              <!--通过for循环来渲染二级权限-->
               <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 === 0 ? '' : 'bdtop','bdcenter']">

                 <el-col :span="7">
                   <el-tag type="success" closable @close="removeTag(scope.row,item2.id)">{{item2.authName}}</el-tag>
                   <i class="el-icon-caret-right"></i>
                 </el-col>

                 <el-col :span="12">
                       <el-tag type="warning"
                               closable v-for="(item3,i3) in item2.children"
                               :key="item3.id" :class="[i3 === 0 ? '' : 'bdtop']"
                               @close="removeTag(scope.row,item3.id)">{{item3.authName}}</el-tag>
                 </el-col>

               </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!--索引列-->
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="level" label="操作" width="300px">
        <!-- 给等级渲染标签-->
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" size="small">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        <el-button type="warning" icon="el-icon-setting" size="small" @click="setRloeSetting(scope.row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

<!--  分配权限的对话框-->
  <el-dialog title="分配权限" :visible.sync="addRloesVisible" width="50%" @close="addRolesClosed">
<!--    树形控件-->
<!--    show-checkbox 可选择的复选框-->
<!--    node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的-->
<!--    default-expand-all	是否默认展开所有节点	boolean-->
<!--    default-expanded-keys	默认展开的节点的 key 的数组	array-->
    <el-tree :data="settingList"
             :props="treePropos"
             show-checkbox
             node-key="id"
             :default-expand-all="true"
             :default-checked-keys="defaultKey"
             ref="treeRef"></el-tree>
    <span slot="footer" class="dialog-footer">
    <el-button @click="addRloesVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSetting">确 定</el-button>
  </span>
  </el-dialog>

</div>
</template>

<script>
export default {
data(){
  return{
    rolesList:[],
    //分配权限对话框的隐藏与展示
    addRloesVisible:false,
    //权限的所有数据
    settingList:[],
    //树形控件的属性绑定对象
    treePropos:{
      label:'authName',
      children:'children'
    },

    //默认选择的节点ID值数组
    defaultKey:[],
    //当前即将分配权限的角色id
    roleID:''
  }
},
  created () {
  this.getRolesList()
  },
  methods:{
  async getRolesList(){
    const { data:res } =await this.$http.get('roles')
    if (res.meta.status !== 200){
      return this.$message.error('获取数据失败!')
    }
    this.rolesList = res.data
    console.log(res)
  },

    //根据ID删除对应的用户信息
    async removeTag(roles,rightID){
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error =>error)
      //如果用户确认删除，则返回值为字符串 confirm
      //如果用户取消了删除，则返回值为字符串 cancel
      //判断确认与取消
      if (confirmResult !== "confirm"){
        return this.$message.info('已取消删除！')
      }
      //确认删除
      const { data:res } =await this.$http.delete(`roles/${this.roleID}/rights/${rightID}`)
      if (res.meta.status !== 200){
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功!')
      roles.children = res.data
  },

    //展示分配权限的对话框
    async setRloeSetting(role){
    this.roleID = role.id
      //获取所有权限的数据
      const { data:res } =await this.$http.get('rights/tree ')
        if (res.meta.status !== 200){
          return this.$message.error('获取权限数据失败！')
       }

       //把获取到的权限数据保存到 data 中
       this.settingList = res.data
      console.log(this.settingList)
      //点击时获取节点的ID值
      this.getDefaultKeys(role,this.defaultKey)
      //显示对话框
      this.addRloesVisible = true
    },

    //通过递归的形式，获取角色下所有三级权限的ID，并保存到defaultKey 数组中
    getDefaultKeys(node,arr){
    //如果当前 node 节点不包括 children 属性，则是三级节点
      if (!node.children){
        return arr.push(node.id)
      }
      //递归调用
      node.children.forEach(item => this.getDefaultKeys(item, arr))
    },

    //监听分配权限对话框的关闭事件
    addRolesClosed(){
    this.defaultKey = []
    },

    //角色授权
    async addSetting(){
    const arrKeys = [
      //getCheckedKeys	若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
      ...this.$refs.treeRef.getCheckedKeys(),
      //getHalfCheckedKeys	若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
      ...this.$refs.treeRef.getHalfCheckedKeys()
    ]
      // console.log(arrKeys)
      //将数组以逗号隔开
      const idStr = arrKeys.join(',')
      const { data:res } =await this.$http.post(`roles/${this.roleID}/rights`,{rids:idStr})
       if (res.meta.status !== 200){
        return this.$message.error('分配权限失败！')
       }
       this.$message.success('分配权限成功！')
       this.getRolesList()
       this.addRloesVisible = false

    }
  }
}
</script>

<style scoped lang="less">
.el-card{
  margin-top: 15px;
}
.el-table{
  margin-top: 15px;
}
.el-tag{
  margin: 15px;
}
//给上边框
.bdtop{
  border-top: 1px solid #eee;
}
//给下边框
.bdbottom{
  border-bottom: 1px solid #eee;
}
.bdcenter{
  display: flex;
  align-items: center;
}
</style>
