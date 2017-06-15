<template>
  <div>
    <br><br>
    <h1>New Streamflow Calculation</h1>
    <float-thead-table class="table navbar-toggleable-md table-sm table-striped table-bordered">
      <thead class="thead-inverse">
        <tr>
          <th v-for="field of fields">{{ field.label }}</th>
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
    <p>{{ results }}</p>
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
      results: '',
      fields: [
        {
          name: 'station',
          label: 'Station'
        },
        {
          name: 'clock',
          label: 'Clock'
        },
        {
          name: 'tapeFt',
          label: 'Tape, ft'
        },
        {
          name: 'maxDepth',
          label: 'Max Depth'
        },
        {
          name: 'spins',
          label: 'Spins'
        },
        {
          name: 'timeSec',
          label: 'Time, Sec'
        },
        {
          name: 'readingComments',
          label: 'Reading Comments'
        }
      ]
    }),
    created () {
      this.items = mockData
    },
    methods: {
      getFtPerSec (spins, timeSec) {
        if (!spins || !timeSec) {
          return 0
        }
        return VAL_1 * (spins / timeSec) + VAL_2
      },
      getStationFt (currentTape, previousTape = 0) {
        return currentTape - previousTape
      },
      getWidthFt (currentStationFt, previousStationFt, nextStationFt) {
        return (currentStationFt - previousStationFt) + (nextStationFt - currentStationFt) / 2
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
        return qCol / totalDischarge
      },
      totalDischarge () {
        return 0
      },
      getResults: function () {
        const results = {}
        for (const item of this.items) {
          const previousStation = item.station !== 0 ? this.items[item.station - 1] : null
          const nextStation = item.station !== this.items.length - 1 ? this.items[item.station + 1] : null
          const ftPerSec = this.getFtPerSec(item.spins, item.timeSec)
          this.items[item.station].ftPerSec = ftPerSec
          const previousTape = previousStation ? previousStation.tapeFt : 0
          const stationFt = this.getStationFt(item.tapeFt, previousTape)
          const previousStationFt = previousStation ? previousStation.stationFt : 0
          const nextStationFt = nextStation ? nextStation.stationFt : 0
          const widthFt = this.getWidthFt(stationFt, previousStationFt, nextStationFt)
          const q = this.getQ(ftPerSec, item.maxDepth)
          const qCol = this.getQCol(q, widthFt)
          const percentFlow = this.getPercentFlow(qCol, this.totalDischarge)
          results[item.station] = {
            ftPerSec: ftPerSec,
            stationFt: stationFt,
            widthFt: widthFt,
            q: q,
            qCol: qCol,
            percentFlow: percentFlow
          }
        }
        this.results = results
      }
    }
  }
</script>

<style scoped>
  .stream-input {
    max-width: 100px !important;
  }
</style>
