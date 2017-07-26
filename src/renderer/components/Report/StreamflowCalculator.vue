<template>
  <div class="p-1" id="flowTable">
    <h1 class="alt-h1 m-3">New Streamflow Calculation</h1>
    <div class="table-wrapper">
      <float-thead-table class="table table-sm table-striped table-bordered">
        <thead class="thead-inverse">
          <tr>
            <th v-for="field of fields">{{ field }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of items">
            <th scope="row">{{ item.station }}</th>
            <td>
              <input class="stream-input" type="text" :id="`Clock-${item.station}`" :value="item.clock" @input="updateClock(item.station)">
              <button class="btn btn-small" v-on:click="autofillClock(item.station)">Auto</button></td>
            <td>
              <input class="stream-input" type="number" :id="`TapeFt-${item.station}`" :value="item.tapeFt" @input="updateTapeFt(item.station)"></td>
            <td>
              <input class="stream-input" type="number" :id="`MaxDepth-${item.station}`" :value="item.maxDepth" @input="updateMaxDepth(item.station)"></td>
            <td>
              <input class="stream-input" type="number" :id="`Spins-${item.station}`" :value="item.spins" @input="updateSpins(item.station)"></td>
            <td>
              <input class="stream-input" type="number" :id="`TimeSec-${item.station}`" :value="item.timeSec" @input="updateTimeSec(item.station)"></td>
            <td>
              <textarea :id="`ReadingComments-${item.station}`" :value="item.readingComments" @input="updateReadingComments(item.station)"></textarea></td>
          </tr>
        </tbody>
      </float-thead-table>
    </div>
    <br>
    <div class="flex flex-row-reverse">
      <button v-if="results.length > 0" class="btn btn-primary btn-large mr-3" @click="save">Save</button>
      <button class="btn btn-large mr-3" v-on:click="getResults">Calculate Discharge</button>
    </div>
    <br>
    <div class="table-wrapper">
      <float-thead-table class="table navbar-toggleable-md table-sm table-striped table-bordered">
        <thead class="thead-inverse">
        <tr>
          <th v-for="field of resultFields">{{ field }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item of results">
          <th scope="row">{{ item.station }}</th>
          <td>{{ Math.round(parseFloat(item.ftPerSec) * 100) / 100 }}</td>
          <td>{{ Math.round(parseFloat(item.stationFt) * 100) / 100 }}</td>
          <td>{{ Math.round(parseFloat(item.widthFt) * 100) / 100 }}</td>
          <td>{{ Math.round(parseFloat(item.q) * 100) / 100 }}</td>
          <td>{{ Math.round(parseFloat(item.qCol) * 100) / 100 }}</td>
          <td>{{ Math.round(item.percentFlow) }}%</td>
        </tr>
        </tbody>
      </float-thead-table>
    </div>
    <h2>Total discharge: {{ totalDischarge }}</h2>
  </div>
</template>

<script>
  import moment from 'moment'
  import debounce from 'lodash.debounce'
  const { app, dialog } = require('electron').remote

  export default {
    data: () => ({
      currentPage: 1,
      perPage: 5,
      filter: null,
      results: [],
      fields: [
        'St',
        'Clock',
        'Tape, ft',
        'Max Depth',
        'Spins',
        'Time, Sec',
        'Reading Comments'
      ],
      resultFields: [
        'St',
        'ft/sec',
        'station, ft',
        'width, ft',
        'q',
        'Qcol',
        'Percent of flow'
      ],
      totalDischarge: ''
    }),
    computed: {
      meterVars: function () {
        return this.$store.getters.meterVars
      },
      items: function () {
        return this.$store.getters.flowData
      }
    },
    methods: {
      updateClock (station) {
        this.$store.commit('updateClock', {
          station: station,
          val: document.getElementById(`Clock-${station}`).value
        })
      },
      updateTapeFt (station) {
        this.$store.commit('updateTapeFt', {
          station: station,
          val: document.getElementById(`TapeFt-${station}`).value
        })
      },
      updateMaxDepth (station) {
        this.$store.commit('updateMaxDepth', {
          station: station,
          val: document.getElementById(`MaxDepth-${station}`).value
        })
      },
      updateSpins (station) {
        this.$store.commit('updateSpins', {
          station: station,
          val: document.getElementById(`Spins-${station}`).value
        })
      },
      updateTimeSec (station) {
        this.$store.commit('updateTimeSec', {
          station: station,
          val: document.getElementById(`TimeSec-${station}`).value
        })
      },
      updateReadingComments (station) {
        this.$store.commit('updateReadingComments', {
          station: station,
          val: document.getElementById(`ReadingComments-${station}`).value
        })
      },
      autofillClock (station) {
        this.items[station].clock = moment().format('hh:mm a')
      },
      getFtPerSec (spins, timeSec) {
        if (!spins || !timeSec) {
          return 0
        }
        return this.meterVars.const1 * (spins / timeSec) + this.meterVars.const2
      },
      getStationFt (currentTape, firstTape) {
        return Math.round((currentTape - firstTape) * 100) / 100
      },
      getWidthFt (currentStationFt, previousStationFt, nextStationFt) {
        return Math.round(
            (((currentStationFt - previousStationFt) / 2) + ((nextStationFt - currentStationFt) / 2)) * 100
          ) / 100
      },
      getQ (ftPerSec, maxDepth) {
        return ftPerSec * maxDepth
      },
      getQCol (q, widthFt) {
        return q * widthFt
      },
      getPercentFlow (qCol, totalDischarge) {
        if (totalDischarge === 0) {
          return 0
        }
        return (qCol / totalDischarge) * 100
      },
      getTotalDischarge () {
        const qCols = []
        for (const item of this.results) {
          if ('qCol' in item) {
            qCols.push(item.qCol)
          }
        }
        return qCols.reduce((total, amount) => total + amount)
      },
      getResults: function () {
        const asyncLoop = function (o) {
          let i = -1
          const length = o.length

          const loop = function () {
            i++
            if (i === length) {
              o.callback()
              return
            }
            o.functionToLoop(loop, i)
          }
          loop()
        }
        const items = this.items
        const vm = this
        asyncLoop({
          length: this.items.length,
          functionToLoop: function (loop, i) {
            setTimeout(function () {
              const item = items[i]
              const ftPerSec = vm.getFtPerSec(item.spins, item.timeSec)
              const firstTape = vm.items[0].tapeFt
              const stationFt = (i === 0) ? 0 : vm.getStationFt(item.tapeFt, firstTape)
              const result = {
                station: item.station,
                ftPerSec: ftPerSec,
                stationFt: stationFt
              }
              vm.results[i] = result
              loop()
            }, 1)
          },
          callback: function () {
            asyncLoop({
              length: vm.items.length,
              functionToLoop: function (loop, i) {
                setTimeout(function () {
                  const result = vm.results[i]
                  const item = vm.items[i]
                  const previousStation = result.station !== 0 ? vm.results[result.station - 1] : null
                  const nextStation = result.station !== vm.items.length ? vm.results[result.station + 1] : null
                  const previousStationFt = previousStation ? previousStation.stationFt : 0
                  const nextStationFt = nextStation ? nextStation.stationFt : 0
                  const widthFt = nextStation
                    ? vm.getWidthFt(result.stationFt, previousStationFt, nextStationFt)
                    : Math.round((((result.stationFt - previousStationFt) / 2)) * 100) / 100
                  const q = vm.getQ(result.ftPerSec, item.maxDepth)
                  const qCol = vm.getQCol(q, widthFt)
                  vm.results[i].widthFt = widthFt
                  vm.results[i].q = q
                  vm.results[i].qCol = qCol
                  loop()
                }, 1)
              },
              callback: function () {
                const totalDischarge = vm.getTotalDischarge()
                vm.totalDischarge = totalDischarge
                for (let item of vm.results) {
                  item.percentFlow = vm.getPercentFlow(item.qCol, totalDischarge)
                }
                vm.$store.commit('UPDATE_RESULTS', vm.results)
              }
            })
          }
        })
      },
      quickSave: debounce(
        function () {
          this.$store.dispatch('quickSaveToTmpFile')
        },
        500
      ),
      location: function (id) {
        this.storedPosition = id
      },
      save: function () {
        this.$store.commit('UPDATE_RESULTS', this.results)
        const vm = this
        dialog.showSaveDialog({
          defaultPath: `${app.getPath('documents')}`,
          filters: [
            {name: 'csv', extensions: ['csv']}
          ]
        }, function (fileName) {
          if (fileName === undefined) return
          vm.$store.dispatch('saveAs', fileName)
        })
      },
      watch: {
        items: {
          handler (val) {
            this.quickSave()
          },
          deep: true
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../style/mixins/table";

  .thead-inverse {
    background-color: #24292e;
    color: white;
  }
  .stream-input {
    max-width: 70px !important;
  }
</style>
