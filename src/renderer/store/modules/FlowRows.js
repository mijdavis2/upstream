const state = {
  rows: {}
}

const mutations = {
  UPDATE_ROW (state, payload) {
    state.rows[payload.index] = payload.row
  }
}

export default {
  state,
  mutations
}
