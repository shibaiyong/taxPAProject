import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
Vue.use(Router)
const Login = r => require.ensure([], () => r(require('@/components/page/login/Login')), 'Login')
const Home = r => require.ensure([], () => r(require('@/components/page/home/Home')), 'Home')

const CommercialCustomList = r => require.ensure([], () => r(require('@/components/page/commercialcustom/CommercialCustomList')), 'CommercialCustomList')
const AddCommercialCustom = r => require.ensure([], () => r(require('@/components/page/commercialcustom/AddCommercialCustom')), 'AddCommercialCustom')
const EditCommercialCustom = r => require.ensure([], () => r(require('@/components/page/commercialcustom/EditCommercialCustom')), 'EditCommercialCustom')
const DetailCommercialCustom = r => require.ensure([], () => r(require('@/components/page/commercialcustom/DetailCommercialCustom')), 'DetailCommercialCustom')

const Qualifypart = r => require.ensure([], () => r(require('@/components/page/qualifyparty/Qualifypart')), 'Qualifypart')
const AddQualifypart = r => require.ensure([], () => r(require('@/components/page/qualifyparty/AddQualifypart')), 'AddQualifypart')
const EditQualifypart = r => require.ensure([], () => r(require('@/components/page/qualifyparty/EditQualifypart')), 'EditQualifypart')
const QualifypartDetail = r => require.ensure([], () => r(require('@/components/page/qualifyparty/QualifypartDetail')), 'QualifypartDetail')

const UserList = r => require.ensure([], () => r(require('@/components/page/usermanage/UserList')), 'UserList')
const UserEdit = r => require.ensure([], () => r(require('@/components/page/usermanage/UserEdit')), 'UserEdit')
const UserDetail = r => require.ensure([], () => r(require('@/components/page/usermanage/UserDetail')), 'UserDetail')

const BlackList = r => require.ensure([], () => r(require('@/components/page/riskmanage/BlackList')), 'BlackList')
const MarchantBlack = r => require.ensure([], () => r(require('@/components/page/riskmanage/MarchantBlack')), 'MarchantBlack')
const UserBlack = r => require.ensure([], () => r(require('@/components/page/riskmanage/UserBlack')), 'UserBlack')
const IntercepteOrderList = r => require.ensure([], () => r(require('@/components/page/riskmanage/IntercepteOrderList')), 'IntercepteOrderList')

const SubstituteRequest = r => require.ensure([], () => r(require('@/components/page/substitutepay/SubstituteRequest')), 'SubstituteRequest')

const PaymentBatch = r => require.ensure([], () => r(require('@/components/page/substitutepay/PaymentBatch')), 'PaymentBatch')

const SubstituteCheckedList = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechecked/SubstituteCheckedList')), 'SubstituteCheckedLIst')
const SubstituteCheckDetail = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechecked/SubstituteCheckDetail')), 'SubstituteCheckDetail') 
const BatchCheckDetail = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechecked/BatchCheckDetail')), 'BatchCheckDetail') 

const UnionPayNumList = r => require.ensure([], () => r(require('@/components/page/substitutepay/unionpaynum/UnionPayNumList')), 'UnionPayNumList')
const AddUnionPayNum = r => require.ensure([], () => r(require('@/components/page/substitutepay/unionpaynum/AddUnionPayNum')), 'AddUnionPayNum')
const EditUnionPayNum = r => require.ensure([], () => r(require('@/components/page/substitutepay/unionpaynum/EditUnionPayNum')), 'EditUnionPayNum')

const SubstituteChannelList = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechannel/SubstituteChannelList')), 'SubstituteChannelList')
const AddSubstituteChannel = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechannel/AddSubstituteChannel')), 'AddSubstituteChannel')
const EditSubstituteChannel = r => require.ensure([], () => r(require('@/components/page/substitutepay/substitutechannel/EditSubstituteChannel')), 'EditSubstituteChannel')

const CheckTransaction = r => require.ensure([], () => r(require('@/components/page/checkaccountmanage/CheckTransaction')), 'CheckTransaction')
const CheckPayment = r => require.ensure([], () => r(require('@/components/page/checkaccountmanage/CheckPayment')), 'CheckPayment')

const UserManage = r => require.ensure([], () => r(require('@/components/page/authmanage/UserManage')), 'UserManage')
const RoleMange = r => require.ensure([], () => r(require('@/components/page/authmanage/RoleMange')), 'RoleMange')
const OperateManage = r => require.ensure([], () => r(require('@/components/page/authmanage/OperateManage')), 'OperateManage')
const NoFound = r => require.ensure([], () => r(require('@/components/page/noFound/404.vue')), 'NoFound')
const ErrorPage = r => require.ensure([], () => r(require('@/components/page/noFound/500.vue')), 'ErrorPage')

const MerchantAjustAccount =  r => require.ensure([], () => r(require('@/components/page/accountmanage/MerchantAjustAccount.vue')), 'MerchantAjustAccount')
const AccountDailyBill =  r => require.ensure([], () => r(require('@/components/page/accountmanage/AccountDailyBill.vue')), 'AccountDailyBill')
const DetailAccountDailyBill =  r => require.ensure([], () => r(require('@/components/page/accountmanage/DetailAccountDailyBill.vue')), 'DetailAccountDailyBill')
const AccountAmount =  r => require.ensure([], () => r(require('@/components/page/accountmanage/AccountAmount.vue')), 'AccountAmount')
const instance = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/auth/index', redirect: '/login' },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Login',
        requireAuth: false,
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
            bread:['主页','商户管理','商户列表']
          }
        },

        {
          path: '/home/addcommercialcustom',
          name: 'AddCommercialCustom',
          component: AddCommercialCustom,
          meta: {
            title: '商户管理',
            requireAuth: false,
            bread:['主页','商户管理','商户录入']
          }
        },

        {
          path: '/home/editcommercialcustom',
          name: 'EditCommercialCustom',
          component: EditCommercialCustom,
          meta: {
            title: '商户管理',
            requireAuth: false,
            bread:['主页','商户管理','商户修改']
          }
        },

        {
          path: '/home/detailcommercialcustom',
          name: 'DetailCommercialCustom',
          component: DetailCommercialCustom,
          meta: {
            title: '商户管理',
            requireAuth: false,
            bread:['主页','商户管理','商户详情']
          }
        },
        
        {
          path: '/home/qualifypart',
          name: 'Qualifypart',
          component: Qualifypart,
          meta: {
            title: '资质方列表',
            requireAuth: false,
            bread:['主页','资质方管理','资质方列表']
          }
        },
        {
          path: '/home/addqualifypart',
          name: 'AddQualifypart',
          component: AddQualifypart,
          meta: {
            title: '资质方录入',
            requireAuth: false,
            bread:['主页','资质方管理','资质方录入']
          }
        },

        {
          path: '/home/editqualifypart',
          name: 'EditQualifypart',
          component: EditQualifypart,
          meta: {
            title: '资质方编辑',
            requireAuth: false,
            bread:['主页','资质方管理','资质方修改']
          }
        },

        {
          path: '/home/qualifypartdetail',
          name: 'QualifypartDetail',
          component: QualifypartDetail,
          meta: {
            title: '资质方详情',
            requireAuth: false,
            bread:['主页','资质方管理','资质方详情']
          }
        },

        {
          path: '/home/userlist',
          name: 'UserList',
          component: UserList,
          meta: {
            title: '用户管理',
            requireAuth: false,
            bread:['主页','用户管理','用户列表']
          }
        },

        {
          path: '/home/useredit',
          name: 'UserEdit',
          component: UserEdit,
          meta: {
            title: '用户修改',
            requireAuth: false,
            bread:['主页','用户管理','用户修改']
          }
        },

        {
          path: '/home/userdetail',
          name: 'UserDetail',
          component: UserDetail,
          meta: {
            title: '用户详情',
            requireAuth: false,
            bread:['主页','用户管理','用户详情']
          }
        },
        {
          path: '/home/intercepteorderlist',
          name: 'IntercepteOrderList',
          component: IntercepteOrderList,
          meta: {
            title: '拦截订单',
            requireAuth: false,
            bread:['主页','风险管理','拦截订单']
          }
        },
        {
          path: '/home/blacklist',
          name: 'BlackList',
          component: BlackList,
          meta: {
            title: '黑名单',
            requireAuth: false,
            bread:['主页','风险管理','黑名单']
          },
          children:[
            { path: '/home/blacklist', redirect: '/home/blacklist/marchantblack' },
            {
              path: '/home/blacklist/marchantblack',
              name: 'MarchantBlack',
              component: MarchantBlack,
              meta: {
                title: '商户黑名单',
                requireAuth: false,
                bread:['主页','风险管理','商户黑名单']
              }
            },
            {
              path: '/home/blacklist/userblack',
              name: 'UserBlack',
              component: UserBlack,
              meta: {
                title: '用户黑名单',
                requireAuth: false,
                bread:['主页','风险管理','用户黑名单']
              }
            }
          ]
        },
        {
          path: '/home/substituterequest',
          name: 'SubstituteRequest',
          component: SubstituteRequest,
          meta: {
            title: '代付请求',
            requireAuth: false,
            bread:['主页','代付管理','代付请求']
          }
        },
        {
          path: '/home/substitutecheckedlist',
          name: 'SubstituteCheckedList',
          component: SubstituteCheckedList,
          meta: {
            title: '代付请求复核',
            requireAuth: false,
            bread:['主页','代付管理','代付请求复核']
          }
        },
        {
          path: '/home/substitutecheckdetail',
          name: 'SubstituteCheckDetail',
          component: SubstituteCheckDetail,
          meta: {
            title: '代付复核详情',
            requireAuth: false,
            bread:['主页','代付管理','代付复核详情']
          }
        },
        {
          path: '/home/BatchCheckDetail',
          name: 'BatchCheckDetail',
          component: BatchCheckDetail,
          meta: {
            title: '代付批次复核详情',
            requireAuth: false,
            bread:['主页','代付管理','代付批次复核详情']
          }
        },
        {
          path: '/home/paymentbatch',
          name: 'PaymentBatch',
          component: PaymentBatch,
          meta: {
            title: '打款批次',
            requireAuth: false,
            bread:['主页','代付管理','打款批次']
          }
        },
        {
          path: '/home/unionpaynumlist',
          name: 'UnionPayNumList',
          component: UnionPayNumList,
          meta: {
            title: '联行号列表',
            requireAuth: false,
            bread:['主页','代付管理','联行号列表']
          }
        },
        {
          path: '/home/addunionpaynum',
          name: 'AddUnionPayNum',
          component: AddUnionPayNum,
          meta: {
            title: '联行号录入',
            requireAuth: false,
            bread:['主页','代付管理','联行号录入']
          }
        },
        {
          path: '/home/editunionpaynum',
          name: 'EditUnionPayNum',
          component: EditUnionPayNum,
          meta: {
            title: '联行号修改',
            requireAuth: false,
            bread:['主页','代付管理','联行号修改']
          }
        },
        {
          path: '/home/substitutechannellist',
          name: 'SubstituteChannelList',
          component: SubstituteChannelList,
          meta: {
            title: '代付渠道列表',
            requireAuth: false,
            bread:['主页','代付管理','代付渠道列表']
          }
        },
        {
          path: '/home/addsubstitutechannel',
          name: 'AddSubstituteChannel',
          component: AddSubstituteChannel,
          meta: {
            title: '代付渠道录入',
            requireAuth: false,
            bread:['主页','代付管理','代付渠道录入']
          }
        },
        {
          path: '/home/editsubstitutechannel',
          name: 'EditSubstituteChannel',
          component: EditSubstituteChannel,
          meta: {
            title: '代付渠道修改',
            requireAuth: false,
            bread:['主页','代付管理','代付渠道修改']
          }
        },
        
        {
          path: '/home/checktransaction',
          name: 'CheckTransaction',
          component: CheckTransaction,
          meta: {
            title: '交易对账',
            requireAuth: false,
            bread:['主页','对账管理','交易对账']
          }
        },
        {
          path: '/home/checkpayment',
          name: 'CheckPayment',
          component: CheckPayment,
          meta: {
            title: '代付对账',
            requireAuth: false,
            bread:['主页','对账管理','代付对账']
          }
        },
        {
          path: '/home/usermanage',
          name: 'UserManage',
          component: UserManage,
          meta: {
            title: '后台用户管理',
            requireAuth: false,
            bread:['主页','权限管理','后台用户管理']
          }
        },

        {
          path: '/home/rolemanage',
          name: 'RoleMange',
          component: RoleMange,
          meta: {
            title: '角色管理',
            requireAuth: false,
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
            bread:['主页','权限管理','权限列表']
          }
        },
        {
          path: '/home/accountamount',
          name: 'AccountAmount',
          component: AccountAmount,
          meta: {
            title: '账户总额',
            requireAuth: false,
            bread:['主页','账户管理','账户总额']
          }
        },
        {
          path: '/home/merchantajustaccount',
          name: 'MerchantAjustAccount',
          component: MerchantAjustAccount,
          meta: {
            title: '账户管理',
            requireAuth: false,
            bread:['主页','账户管理','商户调账']
          }
        },
        {
          path: '/home/accountdailybill',
          name: 'AccountDailyBill',
          component: AccountDailyBill,
          meta: {
            title: '账户管理',
            requireAuth: false,
            bread:['主页','账户管理','日账单']
          }
        },
        {
          path: '/home/detailaccountdailybill',
          name: 'DetailAccountDailyBill',
          component: DetailAccountDailyBill,
          meta: {
            title: '账户管理',
            requireAuth: false,
            bread:['主页','账户管理','日账单详情']
          }
        }
      ]
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
      meta: {
        title: '500',
        requireAuth: false,
      }
    },
    {
      path: '/*',
      name: 'NoFound',
      component: NoFound,
      meta: {
        title: '404',
        requireAuth: false,
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
  sessionStorage.setItem('path',to.path)
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