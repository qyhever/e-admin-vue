import Vue from 'vue'
import {
  Icon,
  Button,
  Menu,
  MenuItem,
  Submenu,
  Loading,
  MessageBox,
  Message,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Scrollbar,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  Tooltip,
  Checkbox,
  Select,
  Option,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Upload,
  Radio,
  RadioButton,
  RadioGroup,
  Image,
  Tree
} from 'element-ui'
import '@/assets/styles/element-variables.scss'

Vue.prototype.$ELEMENT = {zIndex: 3000 }
Vue
  .use(Icon)
  .use(Button)
  .use(Menu)
  .use(MenuItem)
  .use(Submenu)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Row)
  .use(Col)
  .use(Dropdown)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Avatar)
  .use(Scrollbar)
  .use(Switch)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Tooltip)
  .use(Checkbox)
  .use(Select)
  .use(Option)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Dialog)
  .use(Upload)
  .use(Radio)
  .use(RadioButton)
  .use(RadioGroup)
  .use(Image)
  .use(Tree)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
