import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import FloatThead from 'vue-floatthead'
import Scrollspy from 'vue2-scrollspy'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {
  duration: 10
})
Vue.use(FloatThead)
Vue.use(Scrollspy)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
