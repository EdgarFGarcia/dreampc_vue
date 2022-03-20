export default {
    namespaced: true,
    state: {
      orders: [],
      inventory: [],
      conditions: [],
      category: [],
      sales: []
    },
    mutations: {
      setOrders(state, payload){
        state.orders = [...payload]
      },
      setInventory(state, payload){
        state.inventory = [...payload]
      },
      setConditions(state, payload){
        state.conditions = [...payload]
      },
      setCategory(state, payload){
        state.category = [...payload]
      },
      setSales(state, payload){
        state.sales = [...payload]
      }
    },
    getters: {
      getOrders(state){
        return state.orders
      },
      getInventory(state){
        return state.inventory
      },
      getConditions(state){
        return state.conditions
      },
      getCategory(state){
        return state.category
      },
      getSales(state){
        return state.sales
      }
    },
    actions: {
      setOrders({commit}, payload){
        commit('setOrders', payload)
      },
      setInventory({commit}, payload){
        commit('setInventory', payload)
      },
      setConditions({commit}, payload){
        commit('setConditions', payload)
      },
      setCategory({commit}, payload){
        commit('setCategory', payload)
      },
      setSales({commit}, payload){
        commit('setSales', payload)
      }
    }
}