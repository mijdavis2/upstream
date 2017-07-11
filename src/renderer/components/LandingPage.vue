<template>
  <div class="landing-wrapper p-3 intro-font-size">
    <!--<div class="flex flex-center">-->
      <!--<img id="logo" src=../assets/sea.svg" alt="electron-vue">-->
      <!--<div><h1 class="alt-h1 logo-name">UpStream</h1></div>-->
    <!--</div>-->
    <main class="flex flex-between">
      <div class="flex flex-column flex-sm">
        <h2 class="alt-h2 mb-1">
          <b>Welcome to UpStream!</b>
        </h2>
        <p>
          UpStream is a stream flow calc utility designed for <a href="http://www.tu.org/"><b>Trout Unlimited</b></a>.
        </p><br>
        <img id="tulogo" src="~@/assets/tulogo.png" alt="electron-vue">
        <br>
      </div>

      <div class="flex-sm">
        <div class="doc">
          <h2 class="alt-h2 mb-1"><b>Getting Started</b></h2>
          <p>
            UpStream will generate a table for you to input stream flow data based on a series of options.
          </p>
          <p>
            You will be able to add metadata such as site name, id, comments, etc prior to or after
            filling out the stream flow data.
          </p>
          <p>
            Click <b><i>Start new report</i></b> below to begin!
          </p>
          <br>
          <router-link :to="'/new'"><button class="btn btn-primary btn-large btn-block">Start new report</button></router-link>
        </div>
      </div>
    </main>
    <br>
    <hr>
    <main class="flex flex-between">
      <div class="flex-sm">
        <div class="doc">
          <h2 class="alt-h2 mb-1"><b>Report issues or request features</b></h2>
          <p>
            UpStream is open-sourced on GitHub.
          </p>
          <p>
            Bug-fix requests and feature requests will be handled as quickly as possible.
          </p>
          <p>
            To better troubleshoot issues, include the system information in bug reports.
          </p>
          <div>
            <button class="btn btn-outline" @click="open('https://github.com/mijdavis2/upstream/issues')">Go to UpStream Issues</button>
          </div>
        </div>
        <br>
      </div>

        <div class="flex-sm ml-3">
          <system-information></system-information>
        </div>
    </main>
    <br>
    <div class="source">Icons made by <a href="http://www.flaticon.com/authors/daniel-bruce" title="Daniel Bruce">Daniel Bruce</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    <div class="source">Icons made by <a href="http://www.flaticon.com/authors/baianat" title="Baianat">Baianat</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @require "../style/variables"

  .landing-wrapper
    height 100%
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(86, 142, 229, 0.9) 100%
      )

  .intro-font-size
    font-size 18px

  #logo
    height 80px
    width auto
    margin-right 1em
  #tulogo
    height auto
    width 150px
  .logo-name
    line-height 80px
    color theme-primary !important
    font-weight 800
    font-size 2.5e

  .source
    font-size .7em
    color grey
    a
      text-decoration none
</style>
