// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
// import 'mint-ui/lib/style.css'
import '@/assets/css/common.css'
//按需引入 借助 babel-plugin-component
// import { Button, Select, Table, TableColumn,Form, FormItem, Tree, MessageBox,Icon, Row, Col, Menu, Submenu, MenuItem, MenuItemGroup,} from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// Vue.component(Button.name, Button)
// Vue.component(Select.name, Select)
// Vue.component(Table.name, Table)
// Vue.component(TableColumn.name, TableColumn)
// Vue.component(Form.name, Form)
// Vue.component(FormItem.name, FormItem)
// Vue.component(Tree.name, Tree)
// Vue.component(MessageBox.name, MessageBox)
// Vue.component(Icon.name, Icon)
// Vue.component(Row.name, Row)
// Vue.component(Col.name, Col)
// Vue.component(Menu.name, Menu)
// Vue.component(Submenu.name, Submenu)
// Vue.component(MenuItem.name, MenuItem)
// Vue.component(MenuItemGroup.name, MenuItemGroup)
//Vue.prototype.$msgbox = MessageBox

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
