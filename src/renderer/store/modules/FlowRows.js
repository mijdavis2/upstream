const state = {
  items: []
}

const getters = {
  items (state) {
    return state.items
  }
}

const mutations = {
  UPDATE_ROWS (state, payload) {
    state.items = payload
  }
}

export default {
  state,
  getters,
  mutations
}
