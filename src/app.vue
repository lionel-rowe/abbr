<template>
  <div class='container'>
    <h1 class='h3'>Abbreviation Finder</h1>
    <search-bar :fetchSearchResults="fetchSearchResults"></search-bar>
    <results-display :SAFE_abbrsHtmlPromise="SAFE_abbrsHtmlPromise"></results-display>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import SearchBar from '@/components/search-bar.vue';
  import ResultsDisplay from '@/components/results-display.vue';
  import { SAFE_getAbbrsHtmlAsync } from '@/utils/abbr';

  export default Vue.extend({
    components: {
      SearchBar,
      ResultsDisplay
    },

    methods: {
      fetchSearchResults: function(term: string) {
        this.SAFE_abbrsHtmlPromise = SAFE_getAbbrsHtmlAsync(term);
      }
    },

    data() {
      return {
        SAFE_abbrsHtmlPromise: Promise.resolve([])
      };
    }
  });
</script>

<style lang="scss" scoped>
.h3 {
  margin-top: 100px;
}
</style>
