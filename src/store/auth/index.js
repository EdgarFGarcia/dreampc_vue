export default {
    namespaced: true,
    state: {
      islogged: false,
      userdata: {}
    },
    mutations: {
      setUserData(state, payload){
        state.userdata = payload
      },
      setIsLogged(state, payload){
        state.islogged = payload
      },
    },
    getters: {
      getUserData(state){
        return state.userdata
      },
      getIsLogged(state){
        return state.islogged
      },
    },
    actions: {
      setUserData({commit}, v){
        commit('setUserData', v)
      },
      setIsLogged({commit}, v){
        commit('setIsLogged', v)
      },
    }
}