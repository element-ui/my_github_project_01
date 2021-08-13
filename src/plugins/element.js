import Vue from 'vue'
// {}里面的内容就是按需导入的写法
//导入弹窗提示组件
import {Message,
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  // MenuItemGroup,
  MenuItem,
  inputNumber,
  Row,
  MessageBox,
  // Col,
  // Avatar
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  Tag,
  Tree,
  Select,
  Option
} from 'element-ui'
//Message跟其他的不一样，他要暴露在全局中 $（属性名）任意取

Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
// Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(inputNumber)
Vue.use(Row)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
// Vue.use(Col)
// Vue.use(Avatar)
// Vue.use(MessageBox )

