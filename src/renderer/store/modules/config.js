const state = {
  sites: []
}

const getters = {
  sites (state) {
    return state.sites
  }
}

const mutations = {
  SET_SITES (state, payload) {
    state.sites = payload
  }
}

export default {
  state,
  getters,
  mutations
}
