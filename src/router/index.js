import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/components/page/home/Home')), 'Home')
const ProductInfo = r => require.ensure([], () => r(require('@/components/page/productdetail/ProductInfo')), 'ProductInfo')
const ProtocolList = r => require.ensure([], () => r(require('@/components/page/productdetail/ProtocolList')), 'ProtocolList')
const ProtocolDetail = r => require.ensure([], () => r(require('@/components/page/productdetail/ProtocolDetail')), 'ProtocolDetail')
const EnterRealInfo = r => require.ensure([], () => r(require('@/components/page/productdetail/EnterRealInfo')), 'EnterRealInfo')
const EnterPassword = r => require.ensure([], () => r(require('@/components/page/setpassword/enterpassword')), 'EnterPassword')

const instance = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home',
        requireAuth: true,
        roles: ['superadmin']
      }
    },

    {
      path: '/productinfo',
      name: 'ProductInfo',
      component: ProductInfo,
      meta: {
        title: 'ProductInfo',
        requireAuth: true,
        roles: ['superadmin']
      }
    },

    {
      path: '/protocollist',
      name: 'ProtocolList',
      component: ProtocolList,
      meta: {
        title: 'ProtocolList',
        requireAuth: true,
        roles: ['superadmin']
      }
    },
    {
      path: '/protocoldetail',
      name: 'ProtocolDetail',
      component: ProtocolDetail,
      meta: {
        title: 'ProtocolDetail',
        requireAuth: true,
        roles: ['superadmin']
      }
    },
    {
      path: '/enterrealinfo',
      name: 'EnterRealInfo',
      component: EnterRealInfo,
      meta: {
        title: 'EnterRealInfo',
        requireAuth: true,
        roles: ['superadmin']
      }
    },
    
    {
      path: '/enterpassword',
      name: 'EnterPassword',
      component: EnterPassword,
      meta: {
        title: 'EnterPassword',
        requireAuth: true,
        roles: ['superadmin']
      }
    }
    
  ]
})


instance.beforeEach((to, from, next) => {
  let _title = to.meta.title
  document.title = _title ? _title : '默认标题'
  // if (to.meta.requireAuth) {
  //   next()
  // }
  next()
})

export default instance


