import Vue from 'vue'
import Vuex from 'vuex'
import createPersistentState from 'vuex-persistedstate'

import AdminState from '../modules/admin/states/index.js'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        admin:      AdminState
    },
    plugins: [createPersistentState()]
})

export default store