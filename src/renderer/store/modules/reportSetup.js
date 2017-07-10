const state = {
  site: null,
  startBank: null,
  endBank: null,
  stationConfig: null
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
  }
}

const mutations = {
  UPDATE_SITE (state, site) {
    state.site = site
  },
  UPDATE_START_BANK (state, site) {
    state.startBank = Math.round(parseFloat(site) * 100) / 100
  },
  UPDATE_END_BANK (state, site) {
    state.endBank = Math.round(parseFloat(site) * 100) / 100
  },
  UPDATE_STATION_CONFIG (state, site) {
    state.stationConfig = site
  }
}

export default {
  state,
  getters,
  mutations
}
