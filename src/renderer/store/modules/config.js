const state = {
  sites: [],
  setupSettings: { min: 8, max: 25 }
}

const getters = {
  sites (state) {
    return state.sites
  },
  setupSettings (state) {
    return state.setupSettings
  }
}

const mutations = {
  SET_SITES (state, payload) {
    state.sites = payload
  },
  SET_SETUP_SETTINGS (state, payload) {
    state.setupSettings = payload
  }
}

export default {
  state,
  getters,
  mutations
}
