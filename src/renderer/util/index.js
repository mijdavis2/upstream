import CsvGen from './csvGen'
const { app } = require('electron').remote
const fs = require('fs')

const configBasePath = `${app.getPath('userData')}/upstream`
fs.existsSync(configBasePath) || fs.mkdirSync(configBasePath)

export default {
  saveTmp: function (recordId, reportData) {
    const tmpPath = `${configBasePath}/${recordId}.json`
    fs.writeFileSync(tmpPath, JSON.stringify(reportData))
  },
  saveAs: function (fileName, reportData) {
    fs.writeFileSync(fileName, JSON.stringify(reportData))
  },
  saveAsCsv: function (filename, siteData, flowData, results) {
    const csv = new CsvGen(siteData, flowData, results)
    const report = csv.genReport()
    fs.writeFileSync(filename, report)
  }
}
