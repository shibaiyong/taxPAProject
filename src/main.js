// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import '@/assets/css/common.css'
//按需引入 借助 babel-plugin-component
// import { Button, Select, Table, TableColumn,Form, FormItem, Tree, MessageBox,Icon, Row, Col, Menu, Submenu, MenuItem, MenuItemGroup,} from 'element-ui'
import ElementUI from 'myelement-myui'
import Api from '@/assets/utils/api.js'
import 'myelement-myui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{size:'small'})
Vue.use(Api)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
