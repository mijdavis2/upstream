const state = {
  reportId: null,
  flowData: []
}

const getters = {
  flowData (state) {
    return state.flowData
  },
  reportId (state) {
    return state.reportId
  }
}

const mutations = {
  UPDATE_FLOW_DATA (state, payload) {
    state.flowData = payload
  },
  UPDATE_REPORT_ID (state, site) {
    state.reportId = site
  }
}

export default {
  state,
  getters,
  mutations
}
