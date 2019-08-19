// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
// import 'mint-ui/lib/style.css'
import '@/assets/css/common.css'
//按需引入 借助 babel-plugin-component
import { Button, DatetimePicker, Cell, Header, Navbar, TabItem, Loadmore, TabContainer, TabContainerItem, Field, Picker, Popup, Actionsheet } from 'mint-ui'
//以下是mint-ui完整引入
//import MintUI from 'mint-ui'
//Vue.use(MintUI)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)
Vue.component(Button.name, Button)
Vue.component(DatetimePicker.name, DatetimePicker)

Vue.component(Cell.name, Cell)
// Vue.use(Lazyload)
Vue.component(Header.name, Header)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Field.name, Field)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
