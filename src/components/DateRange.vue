<template>

  <div class="outer">

    <div 
      v-for="dot in datum"
      :key="dot.id"
      class="date" 
    >

      <!-- {{ dot.date.getDate() }} -->
      
    </div>  

  </div>
  
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";


/**
 * Timeline Component
 */
@Options({
  components: {

  }
})
export default class Timeline extends Vue {

  datum : any[] = []

  mounted() {

    let start_date = new Date();

    for (let year of [2017, 2018, 2019, 2020, 2021]) {
      for (let month of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
        for (let day of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]) { 
          let date = new Date(year, month, day)
        
          this.datum.push({
            id : `${year},${month}`,
            date : date
          })

        }
      }
    }  
  }
}

</script>

<style lang="css" scoped>

  .outer{
    padding: 20px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(100, 1fr);
  }

  .outer div {
    width: 1em;
    height: 1em;
    background: tomato;
    color: white;
    margin: 0.1em;
    padding: 0.1em;
    box-sizing: border-box;
  }

</style>
