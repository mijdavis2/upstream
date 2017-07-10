<template>
  <div class="p-3">
    <div class="card p-3 bg-faded">
      <h1>Site: {{ siteName }} - {{ siteId }}</h1>
      <form>
        <div v-scroll-spy="metadataScrollPos">
          <h3 class="mt-3">Site Visit Summary</h3><hr>
          <a class="btn btn-small mt-1" v-on:click="autofillDate">Autofill Datetime</a>
          <div id="site-visit-summary" class="section flex flex-between flex-wrap">
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
          <div id="channel-summary" class="section flex flex-between flex-wrap">
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

          <h3 class="mt-3">Comments</h3><hr>
          <div id="comments" class="section flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(comments)" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd><textarea class="form-control" type="text" v-model="comments[item]"></textarea></dd>
            </dl>
          </div>
        </div>
      </form>
    </div>
    <a v-if="metadataScrollPos < 9" href="#flowTable" v-on:click="storedPosition = metadataScrollPos">
      <button class="fab"><img height="30" src="~@/assets/scroll.svg" alt="electron-vue"></button></a>
    <a v-else @click="$scrollTo(storedPosition)" href="#">
      <button class="fab"><img height="30" src="~@/assets/scroll.svg" alt="electron-vue"></button>
    </a>
  </div>
</template>

<script>
  import moment from 'moment'
  import debounce from 'lodash.debounce'

  export default {
    data: () => ({
      metadataScrollPos: 0,
      storedPosition: 0,
      siteName: '',
      siteId: '',
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
          name: 'Pygmy Meter'
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
          name: 'Pygmy Meter'
        },
        {
          name: 'AA Meter'
        }
      ]
    }),
    created () {
      this.siteName = this.$store.getters.site.name
      this.siteId = this.$store.getters.site.id
    },
    methods: {
      autofillDate: function () {
        this.siteVisitSummary['Date'] = moment().format('MM/DD/YYYY')
        this.siteVisitSummary['Start time'] = moment().format('hh:mm a')
      },
      quickSave: debounce(
        function () { return true },
        500
      )
    },
    watch: {
      siteVisitSummary: function () {
        this.quickSave()
      }
    }
  }
</script>

<style scoped lang="stylus">
  @require '../../style/variables'

  .fab
    position fixed
    bottom 40px
    right 40px
    border-radius 50%
    width 60px
    height 60px
    background-color theme-primary
    color: black
    img
      margin-bottom -5px
</style>
