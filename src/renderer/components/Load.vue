<template>
  <div class="featurette">
    <div class="ml-3 mr-3">
    <h1 class="alt-h1">Load Report</h1>
    <div class="card p-3">
      <p>
        Load a previously saved report or recover a report saved to a temp file.
      </p>
      <p>
        UpStream saves reports to temp files on evey keystroke, so hopefully if it crashed
        or you lost power, you can recover your latest reports.
      </p>
      <button class="btn btn-outline" @click="loadTmp">Recover report</button>
      <button class="btn btn-outline" @click="loadSave">Load saved report</button>
    </div>
    </div>

  </div>
</template>

<script>
  const { app, dialog } = require('electron').remote
  const fs = require('fs')

  export default {
    methods: {
      loadTmp () {
        this.loadFromFile('userData')
      },
      loadSave () {
        this.loadFromFile('documents')
      },
      loadFromFile (location) {
        const vm = this
        dialog.showOpenDialog({
          defaultPath: `${app.getPath(location)}`,
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileNames) {
          if (fileNames === undefined) return
          let fileName = fileNames[0]
          fs.readFile(fileName, 'utf-8', (err, data) => {
            console.log(err)
            data = JSON.parse(data)
            console.log(JSON.stringify(data, null, 2))
            if (!Object.keys(data).includes('reportId') || !Object.keys(data).includes('siteData') || !Object.keys(data).includes('flowData')) {
              dialog.showMessageBox({
                type: 'error',
                message: 'Invalid file. Check for valid json. Each report must have a reportId, siteData, and flowData.'
              })
            } else {
              vm.$store.dispatch('loadReport', data)
              vm.$router.push('/report')
            }
          })
        })
      }
    }
  }
</script>
