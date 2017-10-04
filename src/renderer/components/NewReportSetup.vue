<template>
  <div class="p-3">
    <div class="setup-header">
      <h1 class="alt-h1">New Report Setup</h1>
    </div>
    <div class="new-report-container">
      <div class="setup-form">
        <div class="card p-3 bg-faded">
          <form>
            <dl class="form-group">
              <dt><label>Site</label></dt>
              <dd>
                <select class="form-select" v-model="site">
                  <option v-for="site in sites" :value="site">{{ site.id }} - {{ site.name }}
                  </option>
                </select>
                <span class="input-group-button">
                <router-link class="btn" to="/config/sites?new=true">+ New Site</router-link>
              </span>
              </dd>
            </dl>

            <div>
              <dl class="form-group mr-2">
                <dt><label>Start Bank</label></dt>
                <dd><input v-model.lazy="startBank"></dd>
              </dl>
              <dl class="form-group">
                <dt><label>End Bank</label></dt>
                <dd><input v-model.lazy="endBank"></dd>
              </dl>
            </div>

            <dl class="form-group">
              <dt><label>Number of Stations</label></dt>
              <dd>
                <select class="form-select" v-model="selectedConfig" @click="getFlowData()">
                  <option v-for="config in stationConfigs" :value="config">
                    {{ config.stations - 1 }} stations at {{ config.spacing }}
                  </option>
                </select>
              </dd>
            </dl>
          </form>
          <div class="station-tape-ft" v-if="flowData.length > 0 && selectedConfig && endBankSpacing < selectedConfig.spacing">
            <p class="alt-lead disclaimer">* End bank is
              <b>{{ endBankSpacing }}</b> ft from the last station</p>
          </div>
          <div class="form-actions">
            <button class="btn btn-primary btn-large"
                    :disabled="selectedConfig === null || this.site === null"
                    @click="setupReport">Start report
            </button>
          </div>
        </div>
      </div>
      <div class="station-tape-ft card p-3 bg-faded" v-if="flowData.length > 0 && selectedConfig">
        <p>Station tapeFt Preview</p>
        <ol start="0">
          <li v-for="config in flowData">
            {{ config.tapeFt }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import util from '../util'

  export default {
    data: () => ({
      sites: [],
      flowData: []
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
          if (this.endBank && bank > 0) {
            this.autoSelectDefaultConfig()
          }
        }
      },
      endBank: {
        get () {
          return this.$store.getters.endBank
        },
        set (bank) {
          this.$store.commit('UPDATE_END_BANK', bank)
          if (this.startBank && bank > 0 && this.stationConfigs.length > 0) {
            this.autoSelectDefaultConfig()
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
      endBankSpacing: {
        get () {
          return this.flowData.length <= 0 ? null : Math.round((this.flowData[this.flowData.length - 1].tapeFt - this.flowData[this.flowData.length - 2].tapeFt) * 100) / 100
        }
      },
      stationConfigs: {
        get () {
          if (!this.startBank || !this.endBank) {
            return []
          }
          const settings = this.$store.getters.setupSettings
          const computedConfigs = []
          for (let i of util.range(settings.min, settings.max)) {
            const option = {
              stations: i,
              spacing: Math.round(((this.endBank - this.startBank) / i) * 20) / 20,
              tapeFt: [this.startBank]
            }
            if (this.startBank + (option.stations * option.spacing) <= this.endBank + (option.spacing - 0.05)) {
              if (option.spacing >= 0.25) {
                for (let i = 1; i < option.stations; i++) {
                  option.tapeFt[i] = Math.round((option.tapeFt[i - 1] + option.spacing) * 100) / 100
                }
                if (this.endBank - option.tapeFt[option.tapeFt.length - 1] <= option.spacing) {
                  computedConfigs.push(option)
                }
              }
            }
          }
          return computedConfigs
        }
      }
    },
    methods: {
      getFlowData () {
        if (!this.startBank || !this.endBank || !this.selectedConfig) {
          return []
        }
        const flowData = [
          {
            'station': 0,
            'clock': moment().format('hh:mm a'),
            'tapeFt': this.selectedConfig.tapeFt[0],
            'maxDepth': 0,
            'spins': 0,
            'timeSec': 50,
            'readingComments': 'Start bank'
          }
        ]
        for (let i of util.range(0, this.selectedConfig.stations - 1)) {
          flowData.push({
            'station': flowData.length,
            'clock': '',
            'tapeFt': this.selectedConfig.tapeFt[i + 1],
            'maxDepth': '',
            'spins': '',
            'timeSec': '',
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
        this.flowData = flowData
        return flowData
      },
      setupReport () {
        const flowData = this.getFlowData()
        this.$store.commit('UPDATE_FLOW_DATA', flowData)
        this.$store.commit('UPDATE_REPORT_ID', `${moment().format('MM-YYYY')}_${this.site.name}_${moment().format('DD_ss')}`)
        this.$router.push('/report')
      },
      autoSelectDefaultConfig () {
        for (let x of util.processFromMiddleOut([...Array(30).keys()])) {
          let defaultIndex = this.stationConfigs.findIndex(s => s.stations === x)
          if (defaultIndex >= 0) {
            this.selectedConfig = this.stationConfigs[defaultIndex]
            this.getFlowData()
            break
          }
        }
      }
    }
  }
</script>

<style>
  .new-report-container {
    display: flex;
  }
  .setup-form {
    flex: 3;
  }
  .station-tape-ft {
    flex: 1;
    font: 200 16px Helvetica, Verdana, sans-serif;
    max-width: 200px;
  }

  ol {
    margin-left: 16px;
  }

  li {
    text-align: right;
    border-bottom: 1px solid #ccc;
  }

  li:last-child {
    list-style-type: circle;
  }

  .disclaimer {
    font-size: medium;
  }
</style>
