<template>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>

      <!--卡片-->
      <el-card>
        <!--添加按钮用户-->
        <el-button type="primary" class="btn" @click="addCateSetting">添加分类</el-button>

        <!--添加表格-->
        <!--
        data	表格各行的数据
        columns label	列标题名称	prop	对应列内容的属性名
        selection-type	是否为多选类型表格
        show-index	是否显示数据索引
        index-text	数据索引名称
        show-row-hover	鼠标悬停时，是否高亮当前行
        border	是否显示纵向边框
        expand-type	是否为展开行类型表格（为 True 时，需要添加名称为 '$expand' 的作用域插槽, 它可以获取到 row, rowIndex)
         -->
        <tree-table :data="cateList"
                    :columns="columns"
                    :selection-type="false"
                    :show-index="true"
                    index-text="#"
                    :show-row-hover="false"
                    :border="true"
                    :expand-type="false">
          <!--是否有效插槽-->
          <template slot="isOk" slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
            <i class="el-icon-error" v-else style="color: red"></i>
          </template>
          <!--排序插槽-->
          <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
            <el-tag v-if="scope.row.cat_level === 1" type="success" size="mini">二级</el-tag>
            <el-tag v-if="scope.row.cat_level === 2" type="warning" size="mini">三级</el-tag>
          </template>
          <!--操作插槽-->
          <template slot="caoZuo">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </tree-table>

        <!--分页-->
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

      <!--添加分类对话框-->
      <el-dialog title="添加分类" :visible.sync="addCatedialogVisible" width="50%" @close="addClose">

          <el-form :model="addCateForm"
                   :rules="addCateRules"
                   ref="addCateRef"
                   label-width="100px">
            <el-form-item label="分类名称：" prop="cat_name">
              <el-input v-model="addCateForm.cat_name"></el-input>
            </el-form-item>

            <el-form-item label="父级分类：">
              <!--options 用来指定数据源-->
              <!--props 用来指定配置对象-->
              <!--clearable	是否支持清空选项-->
                <el-cascader
                  v-model="selectedKeys"
                  :options="getParentList"
                  :props="cascaderProps"
                  expand-trigger="hover"
                  :clearable="true"
                  :change-on-select="true"
                  @change="parentCateChange"></el-cascader>
            </el-form-item>

          </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="addCatedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCatedialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>

    </div>
</template>

<script>
export default {
  data(){
      return{
        //获取商品分类的参数对象
        queryInfo:{
          //查询参数
          query:3,
          //当前的页数
          pagenum:1,
          //当前每页显示多少条数据
          pagesize:5
        },
        //商品的数据
        cateList:[],
        //页码总数
        total:0,
        //为table指定列的定义
        columns:[{
          label:'分类名称',
          prop:'cat_name'
        },
          {
            label:'是否有效',
            //表示，将当前的列定义为模板列
            type:'template',
            //表示当前这一列使用模板名称时isOk
            template:'isOk'
          },
          {
            label:'排序',
            //表示，将当前的列定义为模板列
            type:'template',
            //表示当前这一列使用模板名称时order
            template:'order'
          },
          {
            label:'操作',
            //表示，将当前的列定义为模板列
            type:'template',
            //表示当前这一列使用模板名称时caoZuo
            template:'caoZuo'
          }],
        //控制添加分类对话框的显示与隐藏
        addCatedialogVisible:false,
        //添加分类的表单数据对象
        addCateForm:{
          //将要添加的分类名称
          cat_name:'',
          //父级分类的ID
          cat_pid:0,
          //分类的等级，默认要添加的是1级分类
          cat_level:0
        },
        //添加分类表单的验证规则对象
        addCateRules:{
          cat_name:[
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
             },
          ]
        },
        //获取父级数据列表
        getParentList:[],
        //指定级联选择器的配置对象
        cascaderProps:{
          value:'cat_id',
          label:'cat_name',
          children:'children'
        },
        //选中的父级分类的id数组
        selectedKeys:[]

      }
    },

    //生命周期
    created(){
    this.getCataList()

    },
    //定义方法
    methods:{
    //获取商品分类的所有数据
      async getCataList(){
        const { data:res } =await this.$http.get('categories',{
          params:this.queryInfo})
         if (res.meta.status !== 200){
          return this.$message.error('获取商品数据失败！')
         }
         //吧数据列表，赋值给cateList
          this.cateList = res.data.result
        //为总数条数赋值
        this.total = res.data.total
        console.log(res.data)

      },
      //监听页码的变化
      handleSizeChange(newSize){
        this.queryInfo.pagesize = newSize
        this.getCataList()
      },

      //监听 页码值的变化
      handleCurrentChange(newPage){
        this.queryInfo.pagenum = newPage
        this.getCataList()
      },

      //添加分类对话框
      addCateSetting(){
        //先获取父级分类的数据列表
        this.getParentCateList()
        //再展示出对话框
      this.addCatedialogVisible = true
      },

      //获取父级的分类列表
      async getParentCateList(){
        const { data:res } =await this.$http.get('categories',{params:{type:2}})
         if (res.meta.status !== 200){
          return this.$message.error('获取父级数据列表失败！')
         }
          this.getParentList = res.data
      },
      //选择项发生变化就触发这个函数
      parentCateChange(){
        console.log(selectedKeys)
      },
      //监听对话框的关闭事件
      addClose(){
        this.$refs.addCateRef.resetFields()
      }

    }
}
</script>

<style scoped lang="less">
.el-card{
  margin: 15px 0 15px 0;
}
.btn{
  margin-bottom: 15px;
}
.el-pagination{
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}
</style>
