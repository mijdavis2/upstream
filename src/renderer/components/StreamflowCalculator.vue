<template>
  <div>
    <div class="justify-content-centermy-1 row">
      <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
        <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>
    </div>
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
      <template slot="timeSec" scope="item">
        <input class="stream-input" type="number" v-model="item.value"></template>
      <template slot="readingComments" scope="item">
        <textarea v-model="item.value"></textarea></template>
    </b-table>

    <div class="justify-content-center row my-1">
      <b-pagination size="md" :total-rows="this.items.length" :per-page="perPage" v-model="currentPage"></b-pagination>
    </div>
  </div>
</template>

<script>
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
        timeSec: {
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
          timeSec: 0,
          readingComments: ''
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
