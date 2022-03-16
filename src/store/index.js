import Vue from 'vue'
import Vuex from 'vuex'
import createPersistentState from 'vuex-persistedstate'

import AdminState from '../modules/admin/states/index.js'
import WorkerState from '../modules/worker/state/index.js'
import AuthState from './auth/index.js'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        admin:      AdminState,
        worker:     WorkerState,
        auth:       AuthState
    },
    plugins: [createPersistentState()]
})

export default store