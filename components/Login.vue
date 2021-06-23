<template>
  <div class="login_container">
    <div class="login_box">
      <!--登录区域-->
      <div class="avatar_box">
        <img src="../src/assets/logo.jpg" alt="">
      </div>
      <!--表单区域-->
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" label-width="0px" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="admin" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prop="name" placeholder="password" prefix-icon="iconfont icon-3702mima"
                    type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //这是登录表单的数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {
            required: true,
            message: '请输入用户名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        //验证密码是否合法
        password: [
          {
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //获取整个表单的数据，从而重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 获取整个表单的数据
    login: function () {
      //判断账号和密码是否合法
      this.$refs.loginFormRef.validate(async valid => {
        //如果不合法，就返回
        if (!valid) return
        //valid返回的是true，通过axios发请求
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200)
          //Message提示信息
        {
          return this.$message.error('登陆失败!')
        }
        //Message提示信息
        this.$message.success('登陆成功！')
        //将token值保存在sessionStorage
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
//login容器
.login_container {
  //设置背景
  background: #404040;
  height: 100%;
}


//login盒子
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 6px;
  //开启绝对定位
  //使盒子居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  //嵌套使用
  //login头像
  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    //开启绝对定位
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    //嵌套使用
    img {
      //把图片撑满
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

//按钮区域
.btns {
  //flex布局
  display: flex;
  //右对齐
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  //解决给定内边距超出边界的问题
  box-sizing: border-box;
}
</style>
