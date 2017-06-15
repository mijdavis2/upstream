<template>
  <div id="app">
    <ul class="mj-navbar">
      <div class="container-fluid">
      <li class="mj-nav-item">
        <router-link class="mj-nav-link brand" :to="'/'"><b>UpStream</b></router-link>
      </li>
      <li class="mj-nav-item">
        <router-link class="mj-nav-link" :to="'/start'">New Site</router-link>
      </li>
      </div>
    </ul>
    <div class="container-fluid pt-4 pl-5 pr-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'upstream'
  }
</script>

<style>
  body { font-family: 'Source Sans Pro', sans-serif; font-size: 20px; }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

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

  button {
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

  button.alt {
    color: #347556;
    background-color: whitesmoke;
  }

  #app {
    background:
        radial-gradient(
            ellipse at top left,
            rgba(255, 255, 255, 1) 40%,
            rgba(86, 142, 229, 0.9) 100%
        );
    padding-bottom: 160px;
  }
  .mj-navbar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }
  .mj-nav-item {
    float: left;
  }
  .mj-nav-link {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .mj-nav-link:hover {
    background-color: #111;
    color: white;
    text-decoration: none;
  }
  .router-link-exact-active {
    background-color: #505050;
    color: white !important;
    text-decoration: none !important;
  }
  .brand {
    background-color: rgb(51, 51, 51);
  }
</style>
