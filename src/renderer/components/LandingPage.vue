<template>
  <div class="landing-wrapper p-3 intro-font-size">
    <main class="flex flex-between">
      <div class="flex flex-column flex-sm p-2">
        <h2 class="alt-h2 mb-1">
          <b>Welcome to UpStream!</b>
        </h2>
        <p>
          UpStream is a stream flow calc utility designed for <a href="http://www.tu.org/"><b>Trout Unlimited</b></a>.
        </p><br>
        <img id="tulogo" src="~@/assets/tulogo.png" alt="electron-vue">
        <br>
      </div>

      <div class="flex-sm p-2">
        <div class="doc csv-instructions">
          <h2 class="alt-h2 mb-1"><b>Features</b></h2>
          <ul class="ml-3">
            <li>Generate steam flow forms from start bank, end bank, and station count.</li>
            <li><b>v2.5+</b>: maxDepth input now auto-fills time on first input.
              Auto-fill time button still exists for use
              in case depth is input by accident
              or when moving station is required after starting data collection</li>
            <li>Calc discharge and generate csv files.</li>
            <li>Auto-fill dates and times.</li>
            <li>Temp save on every keystroke.</li>
            <li>Store sites and site IDs (via <router-link to="/config">Config</router-link>).</li>
            <li>Email csv report from app (beta).</li>
          </ul>
          <br>
          <router-link :to="'/new'"><button class="btn btn-primary btn-large btn-block">Start new report</button></router-link>
        </div>
      </div>
    </main>
    <br>
    <hr>
    <main class="flex flex-between">
      <div class="flex-sm p-2">
        <div class="doc csv-instructions">
          <h2 class="alt-h2 mb-1"><b>Importing Generated CSV</b></h2>
          <p>
            <b class="text-red">v2.0.0 UPDATE: </b>reports are now <i>semicolon separated</i>.
            Be sure to un-select "Comma" under "Separator Options" when importing reports to excel.
          </p>
          <p>
            When importing csv files created by Upstream use the following settings:
          </p>
          <ul class="ml-3">
            <li>Character set: Unicode (UTF-8)</li>
            <li>From row: 1</li>
            <li>Separator Options:
              <ul>
                <li>Separated by
                  <ul>
                    <li>Semicolon</li>
                  </ul>
                </li>
                <li>Text Delimiter: "</li>
              </ul>
            </li>
          </ul>
        </div>
        <br>
      </div>

      <div class="flex-sm ml-3 p-2">
        <div class="flex flex-between">
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
              <a href="/" @click="open('https://github.com/mijdavis2/upstream/issues')"><b>Go to UpStream Issues</b></a>
            </div>
          </div>
          <system-information></system-information>
        </div>
      </div>
    </main>
    <br>
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
        rgba(86, 142, 229, 0.2) 100%
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

  .csv-instructions
    ul
      margin-left: 10px
      ul
        margin-left: 15px
        ul
          margin-left: 20px
    li
      text-align: left !important
      border-bottom: 0;
</style>
