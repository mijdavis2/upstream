<template>
  <div>
    <div class="pl-1 pt-3 report-header">
      <h1 class="m-2 alt-h1">Report {{ $store.getters.reportId }}</h1>
    </div>
    <div class="report-metadata">
      <report-metadata></report-metadata>
    </div>
    <div class="report-table">
      <streamflow-data></streamflow-data>
    </div>
  </div>
</template>

<script>
  import ReportMetadata from './Report/Metadata'
  import StreamflowData from './Report/StreamflowCalculator'

  export default {
    components: { ReportMetadata, StreamflowData }
  }
</script>
