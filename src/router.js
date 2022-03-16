import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from './components/HelloWorld.vue'
import AdminRoutes from './modules/admin/routes/index.js'
import WorkerRoutes from './modules/worker/routes/index.js'

Vue.use(VueRouter)

let routes = [
    {
        path: '/',
        name: 'index',
        component: Landing
    }
]

export default new VueRouter({
    mode: 'history',
    routes : [
        ...routes,
        ...AdminRoutes,
        ...WorkerRoutes
    ]
})