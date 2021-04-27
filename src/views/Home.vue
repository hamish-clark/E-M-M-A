
<template>
  <div class="home">

    <div class="page">
      <div style="padding:30px">
        <h1> Emissions </h1>
        <form>
          <input type="date">
        </form>
      </div>
    </div>

    <div class="page">
      <div style="padding:30px">

        <h1> Aggregate </h1>

        <form>
          <input type="date">
          <input type="date">
          <input type="text">
          <input type="radio">
          <input type="radio">
          <input type="radio">
          

        </form>

      </div>
    </div>

    <div class="page">
      <Trend> </Trend>
    </div>

    <DropFile> </DropFile>

    <div class="page">
      <DateRange> </DateRange>
    </div>

    <!-- <div class="page">
      <Scatter> </Scatter>
    </div>
    
    <div class="page">
      <Scatter> </Scatter>
    </div>

    <div class="page">
      <Scatter> </Scatter>
    </div> -->
    
    
    <!-- <div class="page" v-for='row in ["3001", "3002", "3003", "3004"]' :key="row" >
      <Vehicle :id="row"> </Vehicle>
    </div> -->


  </div>
</template>

<style lang="scss">

input{
  font-size: 1em;
  padding: 0.3em 0.8em;
  border-radius: 3px;
  margin: 3px;
  border: 1px solid #c7c7c7;
  height: 30px;
  background: #ececec;
}



.home{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.page{
  background: #f2f2f2;

  width: min-content;
  height: min-content;

  margin: 30px;
  border-radius: 0.3em;
  box-shadow: 0px 0px 12px 1px rgb(0 0 0 / 5%);
  
  transition-duration: .2s;
}

.page:hover{
  background: hsl(0, 0%, 98%);
  padding: 10px;
  margin: 20px;
  // transform: translate(0px, -10px);
  box-shadow: 0px 10px 8px 1px rgb(0 0 0 / 5%);

}


  
</style>

<script lang="ts">

  import { Options, Vue } from 'vue-class-component';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import Vehicle from '@/components/Vehicle.vue'; // @ is an alias to /src
  import DropFile from '@/components/DropFile.vue'; // @ is an alias to /src
  import Scatter from '@/components/Scatter.vue'; // @ is an alias to /src
  import Trend from '@/components/Trend.vue'; 
  import DateRange from '@/components/DateRange.vue'; 

  @Options({
    components: {
      HelloWorld,
      Vehicle,
      DropFile,
      Trend,
      DateRange
    }
  })
  export default class Home extends Vue {}

</script>
