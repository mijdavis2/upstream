import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
