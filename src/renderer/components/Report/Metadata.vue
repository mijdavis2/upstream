<template>
  <div class="p-1">
    <div id="m0" class="card p-3 bg-faded">
      <h1>{{ siteData.siteName }} - {{ siteData.siteId }}</h1>
      <form>
        <div v-scroll-spy="currentPosition">
          <h3 id="m1"class="mt-3">Site Visit Summary</h3><hr>
          <a id="m2" class="btn btn-small mt-1" v-on:click="autofillDate">Autofill Datetime</a>
          <div id="m3" class="section flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(siteData.siteVisitSummary)"
                v-if="item !== 'Meter type'" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd v-if="['Spin test at start', 'Spin test at end'].includes(item)">
                <input type="checkbox" :id="`checkbox-${item}`"
                       class="form-checkbox mr-3" v-model="siteData.siteVisitSummary[item]">
                <label class="lead alt-text-small" :for="`checkbox-${item}`">(check for <em>YES</em>)</label>
              </dd>
              <dd v-else-if="['Staff Plate Reading'].includes(item)">
                <div class="input-btn-group">
                  <input class="form-control" type="text" v-model="siteData.siteVisitSummary[item]">
                  <a id="m2" class="btn btn-small mt-1" v-on:click="autofillStaffPlateTime">Autofill Time</a>
                </div>
              </dd>
              <dd v-else>
                <input class="form-control" type="text" v-model="siteData.siteVisitSummary[item]">
              </dd>
            </dl>
            <dl class="form-group">
              <dt><label>Meter type</label></dt>
              <dd>
                <select class="form-select form-control"
                        v-model="siteData.siteVisitSummary['Meter type']">
                  <option v-for="meter in meterTypes" :value="meter">{{ meter.name }}</option>
                </select>
              </dd>
            </dl>
          </div>

          <h3 id="m4" class="mt-3">Channel Summary</h3><hr>
          <div id="m5" class="section flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(siteData.channelSummary)"
                v-if="item !== 'Comments on rating'" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd v-if="!['Gauge operating', 'Data downloaded'].includes(item)">
                <input class="form-control" type="text" v-model="siteData.channelSummary[item]">
              </dd>
              <dd v-else>
                <input type="checkbox" :id="`checkbox-${item}`"
                       class="form-checkbox mr-3" v-model="siteData.channelSummary[item]">
                <label class="lead alt-text-small" :for="`checkbox-${item}`">(check for <em>YES</em>)</label>
              </dd>
            </dl>
            <dl class="form-group" style="width: 100%;">
              <dt><label>Comments on rating</label></dt>
              <dd><textarea class="form-control" style="width: 100%;" type="text"
                            v-model="siteData.channelSummary['Comments on rating']"></textarea></dd>
            </dl>
          </div>

          <h3 id="m6" class="mt-3">Comments</h3><hr>
          <div id="m7" class="section flex flex-between flex-wrap">
            <dl v-for="item of Object.keys(siteData.comments)" class="form-group" style="width: 45%;">
              <dt><label>{{ item }}</label></dt>
              <dd><textarea class="form-control" type="text" v-model="siteData.comments[item]"></textarea></dd>
            </dl>
          </div>
        </div>
      </form>
    </div>
    <div v-on:scroll="location('#null')"></div>
    <a v-if="currentPosition < 7" href="#" v-scroll-to="'#flowTable'" v-on:click="storedPosition = currentPosition">
      <button class="fab"><img height="30" src="~@/assets/scroll.svg"></button></a>
    <a v-else v-scroll-to="`#m${storedPosition}`" href="#">
      <button class="fab"><img height="30" src="~@/assets/scroll.svg"></button>
    </a>
  </div>
</template>

<script>
  import moment from 'moment'
  import debounce from 'lodash.debounce'

  export default {
    data: () => ({
      scrollImg: 'static/scroll.svg',
      currentPosition: 0,
      storedPosition: 0,
      siteData: {
        siteName: '',
        siteId: '',
        siteVisitSummary: {
          'Date': '',
          'Field crew taking measurements': '',
          'Start time': '',
          'Field crew taking notes': '',
          'Measurement #': '',
          'Staff Plate Reading': '',
          'Atmospheric Cond': '',
          'Spin test at start': false,
          'Meter number': '',
          'Spin test at end': false,
          'Meter type': {
            name: 'Pygmy Meter',
            const1: 0.9604,
            const2: 0.0312
          }
        },
        comments: { 'Site comments': '', 'Site repairs needed': '' },
        channelSummary: {
          'Cross section location': '',
          'Start edge': '',
          'Cross section substrate': '',
          'Right bank conditions': '',
          'Grade control': '',
          'Left bank conditions': '',
          'Flow consistency': '',
          'Gauge operating': false,
          'Rated': '',
          'Data downloaded': false,
          'Comments on rating': ''
        }
      },
      meterTypes: [
        {
          name: 'Pygmy Meter',
          const1: 0.9604,
          const2: 0.0312
        },
        {
          name: 'AA Meter',
          const1: 2.2048,
          const2: 0.0178
        }
      ]
    }),
    created () {
      if (!this.$store.getters.site) {
        this.$router.push('/')
      }
      this.siteData.siteName = this.$store.getters.site.name
      this.siteData.siteId = this.$store.getters.site.id
      if (!this.siteData.siteVisitSummary.Date) {
        this.autofillDate()
      }
    },
    methods: {
      autofillDate: function () {
        this.siteData.siteVisitSummary['Date'] = moment().format('MM/DD/YYYY')
        this.siteData.siteVisitSummary['Start time'] = moment().format('hh:mm a')
      },
      autofillStaffPlateTime: function () {
        const currentReading = this.siteData.siteVisitSummary['Staff Plate Reading']
        this.siteData.siteVisitSummary['Staff Plate Reading'] = `${currentReading} @ ${moment().format('hh:mm a')}`
      },
      quickSave: debounce(
        function () {
          this.$store.commit('UPDATE_SITE_DATA', this.siteData)
          this.$store.dispatch('quickSaveToTmpFile')
        },
        500
      ),
      location: function (id) {
        this.storedPosition = id
      }
    },
    watch: {
      siteData: {
        handler (val) {
          this.quickSave()
        },
        deep: true
      }
    }
  }
</script>

<style scoped lang="stylus">
  @require '../../style/variables'

  .fab
    position fixed
    bottom 34px
    right 34px
    border-radius 50%
    width 60px
    height 60px
    background-color theme-primary
    color: black
    z-index 9999
    img
      margin-bottom -5px

  .form-checkbox
    margin-left 12px
    transform scale(2.5)

  textarea
    max-height 120px
</style>
