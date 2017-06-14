<template>
  <div>
    <b-table striped hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template slot="station" scope="item">{{ item.value }}</template>
      <template slot="clock" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="tapeFt" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="maxDepth" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="spins" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="timePerSec" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="readingComments" scope="item">
        <textarea v-model="item.value"></textarea></template>
    </b-table>
  </div>
</template>

<script>
  const VAL_1 = 0.9604
  const VAL_2 = 0.0312

  export default {
    data: () => ({
      currentPage: 1,
      perPage: 5,
      filter: null,
      items: [],
      fields: {
        station: {
          label: 'Station'
        },
        clock: {
          label: 'Clock'
        },
        tapeFt: {
          label: 'Tape, ft'
        },
        maxDepth: {
          label: 'Max Depth'
        },
        spins: {
          label: 'Spins'
        },
        timePerSec: {
          label: 'Time, Sec'
        },
        readingComments: {
          label: 'Reading Comments'
        }
      }
    }),
    created () {
      if (this.items.length === 0) {
        this.items.push({
          station: 0,
          clock: 0,
          tapeFt: 0,
          maxDepth: 0,
          spins: 0,
          timePerSec: 0,
          readingComments: 'start bank'
        })
        this.items.push({
          station: 0,
          clock: 0,
          tapeFt: 0,
          maxDepth: 0,
          spins: 0,
          timePerSec: 0,
          readingComments: 'end bank'
        })
      }
    },
    methods: {
      getFtPerSec (spins, timePerSec) {
        if (!spins || !timePerSec) {
          return 0
        }
        return VAL_1 * (spins / timePerSec) + VAL_2
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
      }
    }
  }
</script>

<style scoped>
  .stream-input {
    max-width: 100px !important;
  }
</style>
