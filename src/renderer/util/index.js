const { app } = require('electron').remote
const fs = require('fs')

const configBasePath = `${app.getPath('userData')}/upstream`
fs.existsSync(configBasePath) || fs.mkdirSync(configBasePath)

export default {
  saveTmp: function (recordId, reportData) {
    const tmpPath = `${configBasePath}/${recordId}.json`
    fs.writeFileSync(tmpPath, JSON.stringify(reportData))
  }
}
