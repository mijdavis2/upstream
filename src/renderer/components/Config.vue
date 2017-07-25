<template>
  <div class="featurette">
    <div class="flex flex-between">
      <nav class="menu flex-sm m-3 rounded-2 height-full">
        <span class="menu-heading">Config</span>
        <router-link class="menu-item" to="/config/sites">Sites</router-link>
        <router-link class="menu-item" to="/config/email">Email</router-link>
      </nav>
      <router-view class="flex-lg"></router-view>
    </div>
  </div>
</template>
