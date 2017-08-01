<template>
  <div>
    <div class="flex flex-between m-3">
      <div>
        <h2>Sites</h2>
      </div>
      <div>
        <button class="btn btn-outline" @click="loadFromFile">Load from file</button>
        <button class="btn btn-primary" @click="addNewSite">+ New</button>
      </div>
    </div>
    <nav class="menu m-1">
      <div class="p-3 menu-item flex flex-between" v-if="addingSite">
        <span>
          Name: <input type="text" v-model="newSite.name">
          ID: <input type="text" v-model="newSite.id">
        </span>
        <span><button class="btn btn-outline" @click="saveSites">Save</button></span>
      </div>
      <div class="p-3 menu-item flex flex-between" v-for="site in computedSites">
        <div class="flex flex-between">
          <div class="listed-site-id">{{ site.id }}</div>
          <span> - {{ site.name }}</span>
        </div>
        <span><button class="btn btn-sm btn-danger" @click="removeSite(site)">Remove</button></span>
      </div>
    </nav>
  </div>
</template>

<script>
  const { app, dialog } = require('electron').remote
  const fs = require('fs')
  const Ajv = require('ajv')
  const ajv = new Ajv({allErrors: true})

  export default {
    data: () => ({
      addingSite: false,
      newSite: {
        name: '',
        id: ''
      }
    }),
    created () {
      if (this.$route.query.new) {
        this.addingSite = true
      }
    },
    methods: {
      addNewSite () {
        this.addingSite = true
      },
      saveSites () {
        if (this.sites === undefined) {
          this.sites = []
        }
        this.$store.commit('SET_SITES', this.computedSites.concat([
          {
            name: this.newSite.name,
            id: this.newSite.id.toUpperCase()
          }
        ]))
        this.addingSite = false
      },
      removeSite (site) {
        this.$store.commit('SET_SITES',
          this.computedSites.filter(function (el) {
            return el !== site
          })
        )
      },
      loadFromFile () {
        const vm = this
        dialog.showOpenDialog({
          defaultPath: `${app.getPath('home')}`,
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileNames) {
          if (fileNames === undefined) return
          const schema = {
            properties: {
              name: { type: 'string' },
              id: { type: 'string' }
            }
          }
          const validate = ajv.compile(schema)
          let fileName = fileNames[0]
          fs.readFile(fileName, 'utf-8', (err, data) => {
            console.log(err)
            data = JSON.parse(data)
            console.log(data)
            const result = function () {
              for (let site of data) {
                if (!validate(site) || !Object.keys(site).includes('name') || !Object.keys(site).includes('id')) {
                  dialog.showMessageBox({
                    type: 'error',
                    message: 'Invalid file. Check for valid json. Each site must have a name and id.'
                  })
                  return 'bogus'
                }
              }
            }
            if (result() !== 'bogus') {
              vm.$store.commit('SET_SITES', data)
            }
          })
        })
      }
    },
    computed: {
      computedSites () {
        const sites = this.$store.getters.sites
        // Reset newSite when it is added to sites
        if (sites.indexOf(this.newSite) > -1) {
          this.newSite = {name: '', id: ''}
        }
        return sites
      }
    }
  }
</script>

<style scoped lang="stylus">
  .menu-item
    line-height 34px
  .listed-site-id
    min-width 40px
</style>
