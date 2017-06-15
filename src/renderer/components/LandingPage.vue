<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to Upstream!
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            Upstream is a quick and dirty streamflow calc utility
          </p>
          <router-link :to="'/sfcalc'"><button>Stream Flow Calculator</button></router-link><br><br>
        </div>
        <div class="doc">
          <div class="title alt">To report issues or ruquest features:</div>
          <button class="alt" @click="open('https://github.com/mijdavis2/upstream/issues')">Github Issues</button>
        </div>
      </div>
    </main>
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
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; font-size: 20px; }

  #wrapper {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .9em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #347556;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #347556;
  }

  .doc button.alt {
    color: #347556;
    background-color: whitesmoke;
  }
</style>
