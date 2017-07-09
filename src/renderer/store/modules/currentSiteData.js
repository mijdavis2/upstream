const state = {
  site: null,
  startBank: null,
  endBank: null,
  stationConfig: null,
  reportId: null
}

const getters = {
  site (state) {
    return state.site
  },
  startBank (state) {
    return state.startBank
  },
  endBank (state) {
    return state.endBank
  },
  stationConfig (state) {
    return state.stationConfig
  },
  reportId (state) {
    return state.reportId
  }
}

const mutations = {
  UPDATE_SITE (state, site) {
    state.site = site
  },
  UPDATE_START_BANK (state, site) {
    state.startBank = Math.round(parseInt(site) * 100) / 100
  },
  UPDATE_END_BANK (state, site) {
    state.endBank = Math.round(parseInt(site) * 100) / 100
  },
  UPDATE_STATION_CONFIG (state, site) {
    state.stationConfig = site
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
