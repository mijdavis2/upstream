<template>
  <div id="wrapper">
    <div class="d-flex flex-row">
      <img id="logo" src="~@/assets/sea.svg" alt="electron-vue">
      <div><h1 class="logo-name">UpStream</h1></div>
    </div>
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to UpStream!
        </span>
        <p>
          UpStream is a stream flow calc utility designed for <a href="http://www.tu.org/"><b>Trout Unlimited</b></a>.
        </p><br>
        <img id="tulogo" src="~@/assets/tulogo.png" alt="electron-vue">
        <br>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            UpStream will generate a table for you to input stream flow data based on a series of options.
          </p>
          <p>
            You will be able to add metadata such as site name, id, comments, etc prior to or after
            filling out the stream flow data.
          </p>
          <p>
            Click <b><i>Start new site</i></b> below to begin!
          </p>
          <br>
          <router-link :to="'/start'"><button>Start new site</button></router-link>
        </div>
      </div>
    </main>
    <br>
    <hr>
    <main>
      <div class="left-side">
          <div class="doc">
            <div class="title alt">Report issues or request features</div>
            UpStream is open-sourced on GitHub.
            Bug-fix requests and feature requests will be handled as quickly as possible.
            To better troubleshoot issues, include the system information in bug reports.<br><br>
            <button class="alt" @click="open('https://github.com/mijdavis2/upstream/issues')">Go to UpStream Issues</button>
          </div>
          <br>
        </div>

        <div class="right-side">
          <system-information></system-information>
        </div>
    </main>
    <br>
    <div class="source">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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

<style>
  #logo {
    height: 80px;
    width: auto;
    margin-right: 1em;
  }

  #tulogo {
    height: auto;
    width: 150px;

  }

  .left-side {
    display: flex;
    flex-direction: column;
    margin-right: 1em;
  }

  .logo-name {
    line-height: 80px;
    color: #347556;
    font-weight: 800;
    font-size: 2.5em;
  }

  .source {
    font-size: .7em;
    color: grey;
  }
  .source a {
    text-decoration: none;
  }
</style>
