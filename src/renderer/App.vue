<template>
  <div id="app">
    <header class="header">
      <nav class="topnav">
        <router-link class="brand" to="/"><b>UpStream</b></router-link>
        <router-link to="/start">New Report</router-link>
        <router-link to="/config">Configure</router-link>
      </nav>
    </header>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  const { app } = require('electron').remote
  const fs = require('fs')

  export default {
    name: 'upstream',
    created () {
      this.checkSiteConfig()
    },
    methods: {
      checkSiteConfig () {
        const configBasePath = `${app.getPath('userData')}/upstream`
        const siteConfigPath = `${configBasePath}/sites.json`
        if (fs.existsSync(siteConfigPath)) {
          const siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, 'utf8'))
          this.$store.commit('SET_SITES', siteConfig.sites)
        } else {
          const siteConfig = { sites: [{ name: 'Test Site', id: 'TS' }] }
          fs.existsSync(configBasePath) || fs.mkdirSync(configBasePath)
          fs.writeFileSync(siteConfigPath, JSON.stringify(siteConfig))
          this.$store.commit('SET_SITES', siteConfig.sites)
        }
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
    background-color: theme-dark-bg
    overflow: hidden
  .topnav a
    float: left
    display: block
    color: #f2f2f2
    text-align: center
    padding: 14px 16px
    text-decoration: none
  .topnav a:hover
    background-color: #ddd
    color: black
    text-decoration: none
  .main-container
    width 100%
</style>
