<template>
  <form>
    <div class="form-group">
      <label class="sr-only" :for="searchBarId">Abbreviation</label>
      <input :value="term" @input="term = $event.target.value.toUpperCase()" type="search" class="form-control" :id="searchBarId" placeholder="Enter an abbreviation">
    </div>

    <button type="submit" class="btn btn-primary" @click="search">Search</button>
  </form>
</template>

<script lang='ts'>
  import Vue from 'vue';

  export default Vue.extend({
    props: [ 'fetchSearchResults' ],

    methods: {
      search: function(e) {
        e.preventDefault();
        this.$props.fetchSearchResults(this.term);
      },
    },

    data() {
      return {
        searchBarId: `search-bar-${this._uid}`,
        term: ''
      };
    }
  });
</script>
