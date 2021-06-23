import Vue from 'vue'
// {}里面的内容就是按需导入的写法
//导入弹窗提示组件
import {Message, Button, Form, FormItem, Input} from 'element-ui'
//Message跟其他的不一样，他要暴露在全局中 $（属性名）任意取

Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

