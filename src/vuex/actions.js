
const actions = {
    storeAnswer({ commit },data) {
        commit('storeAnswer',data)
    },
    setBread({ commit }, data){
        commit('setBread',data)
    }
}

export default actions