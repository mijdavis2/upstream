import util from '@/util'

export const loadReport = ({commit}, payload) => {
  commit('UPDATE_FLOW_DATA', payload.flowData)
  commit('UPDATE_SITE_DATA', payload.siteData)
  commit('UPDATE_REPORT_ID', payload.reportId)
  commit('UPDATE_SITE', payload.site)
}

export const quickSaveToTmpFile = ({getters}) => {
  util.saveTmp(getters.reportId, {
    reportId: getters.reportId,
    siteData: getters.siteData,
    flowData: getters.flowData,
    site: getters.site
  })
}
