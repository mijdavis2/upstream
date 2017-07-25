const { app } = require('electron').remote

const configBase = `${app.getPath('userData')}/upstream`

export default {
  configBasePath: configBase,
  siteConfigPath: `${configBase}/sites.json`,
  contactConfigPath: `${configBase}/contacts`
}
