<template>
  <div id="app">
    <header class="header">
      <nav class="topnav">
        <router-link class="brand" to="/"><b>UpStream</b></router-link>
        <router-link to="/new">New</router-link>
        <router-link v-if="currentReport" to="/report">Current</router-link>
        <router-link to="/load">Load</router-link>
        <router-link to="/config">Config</router-link>
        <a class="time float-right">{{ dateNow }}</a>
        <a class="float-right" @click="showAlert">quit</a>
      </nav>
    </header>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import env from './env'
  import moment from 'moment'
  const { app, dialog } = require('electron').remote
  const fs = require('fs')

  export default {
    name: 'upstream',
    data: () => ({
      dateNow: ''
    }),
    mounted () {
      let vm = this
      this.time()
      setInterval(vm.time, 5000)
    },
    created () {
      this.checkSiteConfig()
    },
    methods: {
      time () {
        this.dateNow = moment().format('MM/DD/YY h:mm')
      },
      checkSiteConfig () {
        if (fs.existsSync(env.siteConfigPath)) {
          const siteConfig = JSON.parse(fs.readFileSync(env.siteConfigPath, 'utf8'))
          console.log(siteConfig)
          this.$store.commit('SET_SITES', siteConfig)
        } else {
          const siteConfig = [{name: 'Test Site', id: 'TS'}]
          fs.existsSync(env.configBasePath) || fs.mkdirSync(env.configBasePath)
          fs.writeFileSync(env.siteConfigPath, JSON.stringify(siteConfig))
          this.$store.commit('SET_SITES', siteConfig)
        }
      },
      openFile () {
        dialog.showOpenDialog({
          defaultPath: `${app.getPath('userData')}/upstream`,
          filters: [
            {name: 'json', extensions: ['json']}
          ]
        }, function (fileNames) {
          if (fileNames === undefined) return
          let fileName = fileNames[0]
          fs.readFile(fileName, 'utf-8', (err, data) => {
            console.log(err)
            console.log(data)
          })
        })
      },
      showAlert () {
        this.$swal({
          title: `Are you sure?`,
          text: 'Are you sure you want to quit Upstream?',
          type: 'warning',
          buttonsStyling: false,
          showCancelButton: true,
          cancelButtonClass: 'btn',
          confirmButtonClass: 'btn btn-danger mr-4',
          confirmButtonText: 'Quit',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const {app} = require('electron').remote
            app.quit()
          }
        }).catch(() => {})
      }
    },
    computed: {
      currentReport: function () {
        return this.$store.getters.reportId
      }
    }
  }

</script>

<style lang="scss">
  @import "~primer-css/index.scss";
</style>

<style lang="stylus">
  @require style

  html
    height 100%
  body
    height 100%
    font-size 15px
    margin 0
    color theme-dark-bg
    overflow-y scroll
    background-color #f1f1f1
  #app
    height 100%
    margin-top 54px
  a
    color theme-primary
    text-decoration none
  .header
    background-color theme-dark-bg
    position absolute
    z-index 10
    height 54px
    top 0
    left 0
    right 0
    .inner
      width 980px
      margin-right auto
      margin-left auto
    a, .img
      color rgba(255, 255, 255, .8)
      line-height 26px !important
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      &:hover
        color #fff
      &.router-link-active
        color #fff
        font-weight 400
    .user-option
      margin 0
      float right
      cursor pointer
      &:hover
        background-color inherit
        color #fff
  .topnav
    overflow: hidden
  .topnav a
    float: left
    display: block
    color: #afafaf
    text-align: center
    padding: 14px 16px
    text-decoration: none
  .topnav a:hover
    color: #f1f1f1
    text-decoration: none
  .main-container
    height 100%
  .form-select
    background #fff
  .time
    background-color #545454
    &:hover
      text-decoration none
      background-color #545454 !important
      color white !important
</style>
