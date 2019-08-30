
const actions = {
    storeAnswer({ commit },data) {
        commit('storeAnswer',data)
    },
    setBread({ commit }, data){
        commit('setBread',data)
    },
    setLogin({ commit }, data){
        commit('setLogin',data)
    }
}

export default actions