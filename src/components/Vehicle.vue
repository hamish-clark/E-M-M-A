<template>

    <div class="box">

      <a> V3001 </a>
      <a>  </a>
      <a>  </a>
      <a> ABOUT </a>
      <a> EMISSIONS </a>
      <a> USAGE </a>
      <a> PATRONAGE </a>
      <a> ... </a>

      <div class="overlay" :style="{ borderColor : randomColour() }">  </div>

      <div class="col_content">
        
        <h1> {{ id}} </h1>
        <h2> {{ operator }} </h2>
        <p> {{ engine }} </p>
        <p> {{ tare_weight }}kg </p> 

      </div>


    </div> <!--box-->
    
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    id: String
  },

  components : {
  }
  
})
export default class Vehicle extends Vue {

  rows = [1, 2, 3]
  engine = "EURO3"
  operator = "Tranzurban"
  tare_weight = 8900

  randomColour(){

    let rgb_arr = [1, 1, 1].map(i => Math.random() * 100)

    
    return `rgb(${rgb_arr.join(",")})`
  }

  

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.box{
  width: 500px;
  height: 300px;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: repeat(8, 1fr);

  a{
    font-size: 12px;
    font-weight: 700;
    align-self: center;
    justify-self: center;
  }

}

.header{
  grid-row: 1/1;
  grid-column: 2 / -1;
}

.col_container, .overlay{
  grid-row: 2 / 2;
}

.col_container{
  text-align: right;
  grid-column: 1 / 3;
}

.col_content{
  text-align: left;
  grid-column: 5/8;
  grid-row: 2/2;
  align-self: center;
  margin-left: 1em;

  h1, h2, p{
    margin: 0;
  }

  // h1{ font-weight:  1000; }
  h2{ font-weight:  100; }

}

.overlay{
    align-content: center;
    grid-column: 2/5;
    border-radius: 100%;
    border: 15px solid;
    aspect-ratio: 1/1;
    opacity: 0.5;
    justify-content: center;
    align-self: center;
}


</style>
