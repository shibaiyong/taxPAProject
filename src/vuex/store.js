import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions"
Vue.use(Vuex)
//状态管理的变量名固定为state
const state = {
    PerInfoAnswer:'',
    bread:[],
    navbarList:[],
    userid:'',
    isLogin:0
}

const mutations = {
    storeAnswer(state,data){
        state.PerInfoAnswer = data
    },
    setBread(state,data){
        state.bread = data
    },
    setLogin(state,data){
        state.isLogin = data
    }
}

const store = new Vuex.Store({
    state,
	mutations,
	actions
})

export default store