<template>
  <div>
    <h1>New Site</h1>
    <div class="card p-3 bg-faded">
    <form>
      <div class="form-group">
        <label for="exampleSelect1">Site</label>
        <select class="form-control" v-model="metadata.site" id="exampleSelect1">
          <option v-for="site of sites">{{ site.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>

      <div class="form-group">
        <label for="exampleSelect2">Example multiple select</label>
        <select multiple class="form-control" id="exampleSelect2">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleTextarea">Example textarea</label>
        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
      </div>
      <div class="form-group">
        <label for="exampleInputFile">File input</label>
        <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
        <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
      </div>
      <fieldset class="form-group">
        <legend>Radio buttons</legend>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked>
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div class="form-check">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
            Option two can be something else and selecting it will deselect option one
          </label>
        </div>
        <div class="form-check disabled">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
            Option three is disabled
          </label>
        </div>
      </fieldset>
      <div class="form-check">
        <label class="form-check-label">
          <input type="checkbox" class="form-check-input">
          Check me out
        </label>
      </div>
      <div class="d-flex flex-row-reverse">
        <button v-on:click="generateTable" class="m-3">Generate Table</button><br>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      newData: [],
      sites: [],
      metadata: {}
    }),
    created () {
      this.sites = this.$store.getters.sites
      this.newData = [
        {
          'station': 0,
          'clock': '0',
          'tapeFt': 1.1,
          'maxDepth': 0,
          'spins': 0,
          'timeSec': 50,
          'readingComments': 'Start bank \n*THIS IS NEWMOCK DATA'
        },
        {
          'station': 1,
          'clock': '11:02',
          'tapeFt': 2.7,
          'maxDepth': 0.53,
          'spins': 26,
          'timeSec': 50.6
        },
        {
          'station': 2,
          'clock': '11:03',
          'tapeFt': 4.3,
          'maxDepth': 0.56,
          'spins': 31,
          'timeSec': 50.4
        },
        {
          'station': 3,
          'clock': '11:05',
          'tapeFt': 5.9,
          'maxDepth': 0.54,
          'spins': 13,
          'timeSec': 53.3
        },
        {
          'station': 4,
          'clock': '11:07',
          'tapeFt': 7.5,
          'maxDepth': 0.73,
          'spins': 18,
          'timeSec': 51.4
        },
        {
          'station': 5,
          'clock': '11:08',
          'tapeFt': 9.1,
          'maxDepth': 0.75,
          'spins': 23,
          'timeSec': 50
        },
        {
          'station': 6,
          'clock': '11:09',
          'tapeFt': 10.7,
          'maxDepth': 0.72,
          'spins': 17,
          'timeSec': 50.6
        },
        {
          'station': 7,
          'clock': '11:11',
          'tapeFt': 12.3,
          'maxDepth': 0.75,
          'spins': 8,
          'timeSec': 53.4
        },
        {
          'station': 8,
          'clock': '11:12',
          'tapeFt': 13.9,
          'maxDepth': 0.62,
          'spins': 21,
          'timeSec': 51.7
        },
        {
          'station': 9,
          'clock': '11:14',
          'tapeFt': 15.5,
          'maxDepth': 0.71,
          'spins': 17,
          'timeSec': 52.7
        },
        {
          'station': 10,
          'clock': '11:15',
          'tapeFt': 17.1,
          'maxDepth': 0.73,
          'spins': 10,
          'timeSec': 55.1
        },
        {
          'station': 11,
          'clock': '11:17',
          'tapeFt': 18.7,
          'maxDepth': 0.74,
          'spins': 7,
          'timeSec': 50,
          'readingComments': 'End bank \n*THIS IS NEWMOCK DATA'
        }
      ]
    },
    methods: {
      generateTable () {
        this.$store.commit('UPDATE_ROWS', this.newData)
        this.$router.push('/sfcalc')
      }
    }
  }
</script>
