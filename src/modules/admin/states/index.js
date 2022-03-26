export default {
    namespaced: true,
    state: {
      orders: [],
      inventory: [],
      conditions: [],
      category: [],
      sales: [],
      fororder: []
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
      },
      setForOrder(state, payload){
        state.fororder = [...payload]
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
      getSales: state => value => {
        if(value == null){
          return state.sales
        }else{
          if(value.text == 'SOLD'){
            return state.sales.filter(q => {
              return q.is_sold == 1
            })
          }
          if(value.text == 'CANCELLED'){
            return state.sales.filter(q => {
              return q.is_cancel == 1
            })
          }
          if(value.text == 'IN-PROGRESS'){
            return state.sales.filter(q => {
              return q.is_sold == 0 && q.is_cancel == 0
            })
          }
          if(value.text == 'ALL'){
            return state.sales
          }
        }
        //return state.sales
      },
      getForOrder(state){
        return state.fororder
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
      },
      setForOrder({commit}, payload){
        commit('setForOrder', payload)
      }
    }
}