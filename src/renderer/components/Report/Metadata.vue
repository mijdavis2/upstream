<template>
  <div class="p-3">
    <div class="card p-3 bg-faded">
      <h1>Site: {{ $store.getters.site.name }} - {{ $store.getters.site.id }}</h1>
      <form>
        <div>
          <h3 class="mt-3">Site Visit Summary</h3><hr>
          <button class="btn btn-small mt-1" v-on:click="autofillDate">Autofill Datetime</button>
          <div class="flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(siteVisitSummary)" v-if="item !== 'Meter type'" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd><input class="form-control" type="text" v-model="siteVisitSummary[item]"></dd>
            </dl>
            <dl class="form-group">
              <dt><label>Meter type</label></dt>
              <dd>
                <select class="form-select"
                        v-model="siteVisitSummary['Meter type']">
                  <option v-for="meter in meterTypes" :value="meter">{{ meter.name }}</option>
                </select>
              </dd>
            </dl>
          </div>
          <h3 class="mt-3">Channel Summary</h3><hr>
          <div class="flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(channelSummary)" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd><input class="form-control" type="text" v-model="channelSummary[item]"></dd>
            </dl>
            <dl class="form-group" style="width: 100%;">
              <dt><label>Comments on rating</label></dt>
              <dd><textarea class="form-control" style="width: 100%;" type="text"
                            v-model="channelSummary['Comments on rating']"></textarea></dd>
            </dl>
          </div>
        </div>

        <h3 class="mt-3">Comments</h3><hr>
        <div class="flex flex-between flex-wrap">
          <dl v-for="item of Object.keys(comments)" class="form-group" style="width: 45%;">
            <dt><label>{{ item }}</label></dt>
            <dd><textarea class="form-control" type="text" v-model="comments[item]"></textarea></dd>
          </dl>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data: () => ({
      siteVisitSummary: {
        'Date': null,
        'Start time': null,
        'Field crew taking measurements': null,
        'Field crew taking notes': null,
        'Meter number': null,
        'Spin test at start': null,
        'Spin test at end': null,
        'Measurement #': null,
        'Atmospheric Cond': null,
        'Staff Plate Reading': null,
        'Meter type': {
          'name': 'Pygmy Meter'
        }
      },
      comments: { 'Site comments': null, 'Site repairs needed': null },
      channelSummary: {
        'Cross section location': null,
        'Cross section substrate': null,
        'Grade control': null,
        'Flow consistency': null,
        'Start edge': null,
        'Right bank conditions': null,
        'Left bank conditions': null,
        'Gauge operating': null,
        'Data downloaded': null,
        'Rated': null
      },
      meterTypes: [
        {
          'name': 'Pygmy Meter'
        },
        {
          'name': 'AA Meter'
        }
      ]
    }),
    methods: {
      autofillDate () {
        this.siteVisitSummary['Date'] = moment().format('MM/DD/YYYY')
        this.siteVisitSummary['Start time'] = moment().format('hh:mm a')
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
