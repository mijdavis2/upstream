const state = {
  reportId: null,
  siteData: {},
  flowData: []
}

const getters = {
  flowData (state) {
    return state.flowData
  },
  reportId (state) {
    return state.reportId
  },
  siteData (state) {
    return state.siteData
  },
  meterVars (state) {
    if (!state.siteData.siteVisitSummary) {
      return {}
    }
    return {
      const1: state.siteData.siteVisitSummary['Meter type'].const1,
      const2: state.siteData.siteVisitSummary['Meter type'].const2
    }
  }
}

const mutations = {
  UPDATE_FLOW_DATA (state, payload) {
    state.flowData = payload
  },
  UPDATE_REPORT_ID (state, site) {
    state.reportId = site
  },
  UPDATE_SITE_DATA (state, payload) {
    state.siteData = payload
  }
}

export default {
  state,
  getters,
  mutations
}
