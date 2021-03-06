import env from '@/env'
const fs = require('fs')

const state = {
  sites: [],
  contacts: [],
  setupSettings: { min: 2, max: 27 }
}

const getters = {
  sites (state) {
    return state.sites.sort(function (a, b) { return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0) })
  },
  contacts (state) {
    return state.contacts
  },
  setupSettings (state) {
    return state.setupSettings
  }
}

const mutations = {
  SET_SITES (state, payload) {
    state.sites = payload
    if (payload !== undefined) {
      fs.writeFileSync(env.siteConfigPath, JSON.stringify(payload))
    } else {
      fs.writeFileSync(env.siteConfigPath, JSON.stringify([]))
    }
  },
  SET_CONTACTS (state, payload) {
    state.contacts = payload
    if (payload !== undefined) {
      fs.writeFileSync(env.contactConfigPath, JSON.stringify(payload))
    } else {
      fs.writeFileSync(env.contactConfigPath, JSON.stringify([]))
    }
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
