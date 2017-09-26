import CsvGen from './csvGen'
const { app } = require('electron').remote
const fs = require('fs')

const configBasePath = `${app.getPath('userData')}`
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
  },
  processFromMiddleOut: function (array) {
    const newArray = []
    let i = Math.ceil(array.length / 2)
    let j = i + 1

    while (i >= 0) {
      newArray.push(array[j++])
      if (i < array.length) newArray.push(array[i--])
    }
    return newArray
  },
  range: function* (begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
      yield i
    }
  }
}
