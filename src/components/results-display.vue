<template>
  <div>
    <div v-if="currentLoadState == LoadStates.Error">
      ERROR
    </div>
    <div v-else-if="currentLoadState == LoadStates.Loading">
      LOADING
    </div>
    <div v-else-if="currentLoadState == LoadStates.NoResults">
      NO RESULTS
    </div>
    <form v-else-if="currentLoadState == LoadStates.Complete">
      <div v-html="selectedResult"></div>

      <div v-for='result of results' :key='result.key' class="form-check">
        <input
          @change='setSelectedAbbrHtml'
          name="result-list-item"
          :id="`result-list-${id}-${result.key}`"
          class="form-check-input"
          type="radio"
          :checked="result.idx === 0"
          :value="result.SAFE_html">
        <label
          :for="`result-list-${id}-${result.key}`"
          type="text"
          class="form-check-label">
          {{result.SAFE_html}}
        </label>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { LoadStates } from '@/load-states';

  export default Vue.extend({
    props: [ 'SAFE_abbrsHtmlPromise' ],

    methods: {
      setSelectedAbbrHtml: function(e: Event) {
        this.selectedResult = (e.currentTarget as HTMLInputElement).value;
      }
    },

    watch: {
      SAFE_abbrsHtmlPromise: async function(SAFE_newAbbrsHtmlPromise) {
        this.results = [];
        this.currentLoadState = LoadStates.Loading;

        try {
          const SAFE_resultsHtml = await SAFE_newAbbrsHtmlPromise;

          this.results = SAFE_resultsHtml
            .map((html: string, idx: number) => ({ idx, key: idx, SAFE_html: html }));

          if (this.results.length) {
            this.currentLoadState = LoadStates.Complete;

            this.selectedResult = (this.results[0] as any).SAFE_html;
          } else {
            this.currentLoadState = LoadStates.NoResults;
          }
        } catch(err) {
          this.currentLoadState = LoadStates.Error;
        }
      }
    },

    data() {
      return {
        id: (this as any)._uid,
        LoadStates,
        currentLoadState: LoadStates.Complete,
        results: [],
        selectedResult: ''
      };
    }
  });
</script>

<style lang="scss" scoped>
.form-check {
  margin: 10px 0;

  * {
    cursor: pointer;
  }

  &:hover {
    background: #eee;
  }
}
</style>
