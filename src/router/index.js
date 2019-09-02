import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
Vue.use(Router)
const Login = r => require.ensure([], () => r(require('@/components/page/login/Login')), 'Login')


const CommercialCustomList = r => require.ensure([], () => r(require('@/components/page/commercialcustom/CommercialCustomList')), 'CommercialCustomList')

const Home = r => require.ensure([], () => r(require('@/components/page/home/Home')), 'Home')
const UserManage = r => require.ensure([], () => r(require('@/components/page/authmanage/UserManage')), 'UserManage')
const RoleMange = r => require.ensure([], () => r(require('@/components/page/authmanage/RoleMange')), 'RoleMange')
const OperateManage = r => require.ensure([], () => r(require('@/components/page/authmanage/OperateManage')), 'OperateManage')
const NoFound = r => require.ensure([], () => r(require('@/components/page/noFound/404.vue')), 'NoFound')


const instance = new Router({
  mode: 'history',
  routes: [
    { path: '/auth/index', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
        requireAuth: false,
        roles: ['user','admin','superadmin'],
        bread:['主页','登录']
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '主页',
        requireAuth: false,
        roles: ['admin','superadmin'],
        bread:['主页','登录']
      },
      children:[

        {
          path: '/home/commercialcustom',
          name: 'CommercialCustomList',
          component: CommercialCustomList,
          meta: {
            title: '商户管理',
            requireAuth: false,
            roles: ['user','admin','superadmin'],
            bread:['主页','商户管理','商户列表']
          }
        },

        {
          path: '/home/usermanage',
          name: 'UserManage',
          component: UserManage,
          meta: {
            title: '用户管理',
            requireAuth: false,
            roles: ['admin','superadmin'],
            bread:['主页','权限管理','用户管理']
          }
        },

        {
          path: '/home/rolemanage',
          name: 'RoleMange',
          component: RoleMange,
          meta: {
            title: '角色管理',
            requireAuth: false,
            roles: ['admin','superadmin'],
            bread:['主页','权限管理','角色管理']
          }
        },
        {
          path: '/home/operatemanage',
          name: 'OperateManage',
          component: OperateManage,
          meta: {
            title: '权限列表',
            requireAuth: false,
            roles: ['admin','superadmin'],
            bread:['主页','权限管理','权限列表']
          }
        },

      ]
    },
    {
      path: '/*',
      name: 'NoFound',
      component: NoFound,
      meta: {
        title: '404',
        requireAuth: false,
        roles: ['superadmin']
      }
    }
  ],
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})


instance.beforeEach((to, from, next) => {
  let _title = to.meta.title
  let bread = to.meta.bread
  document.title = _title ? _title : '默认标题'
  let auth = localStorage.getItem('requireAuth')
  let token = sessionStorage.getItem('token')
  store.dispatch('setBread',bread)
  // if(to.path=="/login"||to.path=="/auth/index"){
  //   next()
  // }else if(!store.state.isLogin){
  //   next({path:'/login'})
  // }else{
  //   next()
  // }
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


