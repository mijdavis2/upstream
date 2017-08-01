<template>
  <div class="p-3">
    <div class="setup-header">
      <h1 class="alt-h1">New Report Setup</h1>
    </div>
    <div class="setup-form">
      <div class="card p-3 bg-faded">
        <form>
          <dl class="form-group">
            <dt><label>Site</label></dt>
            <dd>
              <select class="form-select" v-model="site">
                <option v-for="site in sites" :value="site">{{ site.name }} - {{ site.id }}</option>
              </select>
              <span class="input-group-button">
                <router-link class="btn" to="/config/sites?new=true">+ New Site</router-link>
              </span>
            </dd>
          </dl>

          <div>
            <dl class="form-group mr-2">
              <dt><label>Start Bank</label></dt>
              <dd><input type="number" step="0.01" v-model="startBank"></dd>
            </dl>
            <dl class="form-group">
              <dt><label>End Bank</label></dt>
              <dd><input type="number" step="0.01" v-model="endBank"></dd>
            </dl>
          </div>

          <dl class="form-group">
            <dt><label>Number of Stations</label></dt>
            <dd>
              <select class="form-select" v-model="selectedConfig">
                <option v-for="config in stationConfigs" :value="config" :selected="config.stations === 16">
                  {{ config.stations - 1 }} stations at {{ config.spacing }}
                </option>
              </select>
            </dd>
          </dl>
        </form>
        <div class="form-actions">
          <button class="btn btn-primary btn-large"
                  :disabled="selectedConfig === null || this.site === null"
                  @click="setupReport">Start report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  function* range (begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
      yield i
    }
  }

  export default {
    data: () => ({
      sites: []
    }),
    created () {
      this.sites = this.$store.getters.sites
    },
    computed: {
      site: {
        get () {
          return this.$store.getters.site
        },
        set (site) {
          this.$store.commit('UPDATE_SITE', site)
        }
      },
      startBank: {
        get () {
          return this.$store.getters.startBank
        },
        set (bank) {
          this.$store.commit('UPDATE_START_BANK', bank)
        }
      },
      endBank: {
        get () {
          return this.$store.getters.endBank
        },
        set (bank) {
          this.$store.commit('UPDATE_END_BANK', bank)
          if (this.startBank && bank > 0) {
            this.$store.commit('UPDATE_STATION_CONFIG', this.stationConfigs[8])
          }
        }
      },
      selectedConfig: {
        get () {
          return this.$store.getters.stationConfig
        },
        set (bank) {
          this.$store.commit('UPDATE_STATION_CONFIG', bank)
        }
      },
      stationConfigs: {
        get () {
          if (!this.startBank || !this.endBank) {
            return []
          }
          const settings = this.$store.getters.setupSettings
          const computedConfigs = []
          for (let i of range(settings.min, settings.max)) {
            const option = {
              stations: i,
              spacing: Math.round(((this.endBank - this.startBank) / i) * 10) / 10
            }
            computedConfigs.push(option)
          }
          return computedConfigs
        }
      }
    },
    methods: {
      setupReport () {
        const flowData = [
          {
            'station': 0,
            'clock': moment().format('hh:mm a'),
            'tapeFt': this.startBank,
            'maxDepth': 0,
            'spins': 0,
            'timeSec': 50,
            'readingComments': 'Start bank'
          }
        ]
        for (let i of range(0, this.selectedConfig.stations - 1)) {
          flowData.push({
            'station': flowData.length,
            'clock': '',
            'tapeFt': Math.round((flowData[i].tapeFt + this.selectedConfig.spacing) * 100) / 100,
            'maxDepth': null,
            'spins': null,
            'timeSec': null,
            'readingComments': ''
          })
        }
        flowData.push({
          'station': this.selectedConfig.stations,
          'clock': '',
          'tapeFt': this.endBank,
          'maxDepth': 0,
          'spins': 0,
          'timeSec': 50,
          'readingComments': 'End bank'
        })
        this.$store.commit('UPDATE_FLOW_DATA', flowData)
        this.$store.commit('UPDATE_REPORT_ID', `${this.site.id}-${moment().valueOf()}`)
        this.$router.push('/report')
      }
    }
  }
</script>
