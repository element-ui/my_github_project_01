module.exports = {
    devServer: {
      // open: true,
      // port: 8888,
      // proxy: {
      //   '/api': {
      //     target: 'http://tools.fulilin.cn/api/tkl.php',// 跨域请求的地址
      //     changeOrigin: true, // 为true的情况下，开启跨域
      //     pathRewrite: {
      //       'api': '' // 路径重写:localhost:8080/api/login => www.baidu.com/login
      //     }
      //   }
      // }
      port:8888,
      open:true,
      // proxy:{
      //   api:{
      //     target:'http://tools.fulilin.cn/api',
      //     changeOrigin:true,
      //     secure:false,
      //     pathRewrite:{
      //       '^api':''
      //     }
      //   }
      // },
      // https:false
    }
  }

