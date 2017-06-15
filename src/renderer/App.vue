<template>
  <div id="app">
    <ul class="mj-navbar">
      <li class="mj-nav-item">
        <router-link class="mj-nav-link brand" :to="'/'"><b>AQUARIUS</b></router-link>
      </li>
      <li class="mj-nav-item">
        <router-link class="mj-nav-link" :to="'/sfcalc'">New Streamflow</router-link>
      </li>
    </ul>
    <div class="container-fluid">
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
  body {
    font-size: small;
  }
  #app {
    background:
        radial-gradient(
            ellipse at top left,
            rgba(255, 255, 255, 1) 40%,
            rgba(86, 142, 229, 0.9) 100%
        );
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
