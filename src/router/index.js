import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Login = r => require.ensure([], () => r(require('@/components/page/login/Login')), 'Login')
const Home = r => require.ensure([], () => r(require('@/components/page/home/Home')), 'Home')
const ProtocolList = r => require.ensure([], () => r(require('@/components/page/productdetail/ProtocolList')), 'ProtocolList')
const ProtocolDetail = r => require.ensure([], () => r(require('@/components/page/productdetail/ProtocolDetail')), 'ProtocolDetail')
const NoFound = r => require.ensure([], () => r(require('@/components/page/noFound/404.vue')), 'NoFound')


const instance = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
        requireAuth: false,
        roles: ['user','admin','superadmin']
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home',
        requireAuth: true,
        roles: ['admin','superadmin']
      }
    },
    {
      path: '/protocollist',
      name: 'ProtocolList',
      component: ProtocolList,
      meta: {
        title: 'ProtocolList',
        requireAuth: true,
        roles: ['admin','superadmin']
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
      path: '*',
      name: 'NoFound',
      component: NoFound,
      meta: {
        title: '404',
        requireAuth: true,
        roles: ['superadmin']
      }
    }
  ]
})


instance.beforeEach((to, from, next) => {
 
  let _title = to.meta.title
  document.title = _title ? _title : '默认标题'
  let auth = localStorage.getItem('requireAuth')
  let token = sessionStorage.getItem('token')
  if (!to.meta.requireAuth) {
    next()
  }else{
    if(!token){
      //未登录，没有权限进入，终止路由跳转
      next({path:'/login'})
    }else if( to.meta.roles.indexOf(auth) > -1 ){
      next()
    }else{
      //停在当前页面
      next(false)
    }
  }
})



export default instance


