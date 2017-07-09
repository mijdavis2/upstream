<template>
  <h2>Sites</h2>
  <ul>
    <li v-for="site in sites">{{ site.name }} - {{ site.id }} <button @click="removeSite(site)">Remove</button></li>
  </ul>
  <button @click="addNewSite">+ New</button>
  <button @click="saveSites">Save</button>
</template>

<script>
  export default {
    data: () => ({
      sites: [],
      addingSite: false
    }),
    created () {
      this.sites = this.$store.getters.sites
    },
    methods: {
      addNewSite () {
        this.addingSite = true
      },
      saveSites () {
        return ''
      }
    }
  }
</script>
