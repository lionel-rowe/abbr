<template>
  <form @submit="search">
    <div class="form-group">
      <label class="sr-only" :for="searchBarId">Abbreviation</label>
      <input :value="term" @input="term = $event.target.value.toUpperCase()" type="search" class="form-control" :id="searchBarId" placeholder="Enter an abbreviation">
    </div>

    <button type="submit" class="btn btn-primary">Search</button>
  </form>
</template>

<script lang='ts'>
  import Vue from 'vue';

  export default Vue.extend({
    props: [ 'fetchSearchResults' ],

    methods: {
      search: function(e: Event) {
        e.preventDefault();
        this.$props.fetchSearchResults(this.term);
      },
    },

    data() {
      return {
        searchBarId: `search-bar-${(this as any)._uid}`,
        term: ''
      };
    }
  });
</script>
