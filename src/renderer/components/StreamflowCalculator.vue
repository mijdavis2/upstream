<template>
  <div>
    <br><br>
    <h1>New Streamflow Calculation</h1>
    <float-thead-table class="table navbar-toggleable-md table-sm table-striped table-bordered">
      <thead class="thead-inverse">
        <tr>
          <th v-for="field of fields">{{ field }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of items">
          <th scope="row">{{ item.station }}</th>
          <td>
            <input class="stream-input" type="time" v-model="item.clock"></td>
          <td>
            <input class="stream-input" type="number" v-model="item.tapeFt"></td>
          <td>
            <input class="stream-input" type="number" v-model="item.maxDepth"></td>
          <td>
            <input class="stream-input" type="number" v-model="item.spins"></td>
          <td>
            <input class="stream-input" type="number" v-model="item.timeSec"></td>
          <td>
            <textarea v-model="item.readingComments"></textarea></td>
        </tr>
      </tbody>
    </float-thead-table>
    <br>
    <button v-on:click="getResults">Get Results</button>
    <float-thead-table class="table navbar-toggleable-md table-sm table-striped table-bordered">
      <thead class="thead-inverse">
      <tr>
        <th v-for="field of resultFields">{{ field }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of results">
        <th scope="row">{{ item.station }}</th>
        <td>{{ item.ftPerSec }}</td>
        <td>{{ item.stationFt }}</td>
        <td>{{ item.widthFt }}</td>
        <td>{{ item.q }}</td>
        <td>{{ item.qCol }}</td>
        <td>{{ Math.round(item.percentFlow) }}%</td>
      </tr>
      </tbody>
    </float-thead-table>
    <p>Total discharge: {{ totalDischarge }}</p>
  </div>
</template>

<script>
  import mockData from './mockData.json'

  const VAL_1 = 0.9604
  const VAL_2 = 0.0312

  export default {
    data: () => ({
      currentPage: 1,
      perPage: 5,
      filter: null,
      items: [],
      results: [],
      fields: [
        'Station',
        'Clock',
        'Tape, ft',
        'Max Depth',
        'Spins',
        'Time, Sec',
        'Reading Comments'
      ],
      resultFields: [
        'Station',
        'ft/sec',
        'station, ft',
        'width, ft',
        'q',
        'Qcol',
        'Percent of flow'
      ],
      totalDischarge: ''
    }),
    created () {
      this.items = mockData
    },
    methods: {
      getFtPerSec (spins, timeSec) {
        if (!timeSec) {
          return 0
        }
        return VAL_1 * (spins / timeSec) + VAL_2
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
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .stream-input {
    max-width: 100px !important;
  }
</style>
