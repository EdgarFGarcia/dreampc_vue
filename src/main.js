import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import axios from './plugins/axios.js'
import router from './router.js'
import store from './store/index.js'
import JsonExcel from "vue-json-excel";

Vue.use(axios)
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false

new Vue({
  router: router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
