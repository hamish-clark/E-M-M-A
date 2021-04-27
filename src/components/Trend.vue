<template>
    <div id="col_container">
        <div id="col__header">


          <h1 @click="incriment_month"> {{ MONTHS[month-1] }}, {{ year.toString(10).slice(2, 4) }} </h1>

          <table>

            <tr>
              <th> Revenue </th>
              <th> Pax KM </th>
              <th> CO2 </th>
            </tr>

            <tr>
              <td> $150.50 </td>
              <td> 30,000 Km </td>
              <td> 47,300 T </td>
            </tr>

          </table>

          <input type="text">

          <Listbox v-model="selectedPerson" as="div" class="listouter">
            <ListboxButton as="button" class="listbutton">
              {{ selectedPerson.name }}
              <svg class ="icon" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </ListboxButton>

            <ListboxOptions as="ul" class="listbox">
              <ListboxOption 
                v-slot="{ active }"
                as="template"
                v-for="person in people"
                :key="person"
                

                :value="person"
                :disabled="person.unavailable"
              >

                <li :class="{'listitem' : !active, 'listitem listitem_active' : active}">

                    <!-- <CheckIcon v-show="selected" /> -->
                    {{ person.name }}

                </li>

              </ListboxOption>
            </ListboxOptions>
          </Listbox>

        </div>
        
        <svg 
          :width=chart_options.width
          :height=chart_options.height
          viewBox="0 0 600 300"
          >

          <g :transform='`translate(${margin.left}, ${height+margin.bottom})`'>

            <VueAxis
              :orient="'Bottom'"
              :scale="'scaleTime'"
              :domain="[new Date('2016-12-31'), new Date('2021-03-01')]"
              :range="[0, width]"
              :height="width"
              :width="width"
              :tickSize="-height"
              >
            </VueAxis>
          </g>

          <!-- <path :d="route_line_path()" :transform ="`translate(${margin.left}, ${height+margin.bottom})`"></path> -->

          
          <circle 
            v-for="data in datum.filter(d=>d._id.month==month && d._id.year==year)" 
            :key=data._id
            :cx=x_scale(data.pax_km)
            :cy=y_scale(data.CO2)
            :r=s_scale(data.distance)
            stroke="#333333cc"
            stroke-width=1
            fill="rgba(30, 100, 205, 0.5)"
          >
          </circle>
          

        </svg>  
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { VueAxis } from './Timeline.vue'
import * as d3 from 'd3';

import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";


Listbox

@Options({


  watch : {
    datum : function(){
      console.log("datum changed");
    }
  },

  components: {
    VueAxis,
    Listbox, 
    ListboxButton, 
    ListboxOptions, 
    ListboxOption
  }
})
export default class Trend extends Vue {

  MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  chart_options = {
    width : 600,
    height : 300
  }

  margin = {
    left : 30,
    right: 30,
    top: 30,
    bottom: 30
  }

  width = this.chart_options.width - this.margin.left - this.margin.right
  height = this.chart_options.height - this.margin.top - this.margin.bottom

  start_date = new Date("2016-12-31");
  end_date = new Date("2022-01-01");

  axisTime = {
    scale: "scaleTime",
    domain: [this.start_date, this.end_date],
    range: [0, this.width],
    orient: "Bottom",
  };

  month = 1
  year = 2017

  people = [
    { id: 1, name: "Weekdays", unavailable: false },
    { id: 2, name: "Saturday", unavailable: false },
    { id: 3, name: "Sunday", unavailable: false },
    { id: 4, name: "Weekends", unavailable: false },
    { id: 5, name: "Weekly", unavailable: false },
  ];

  selectedPerson = this.people[0];



  datum = []
  x_scale = d3.scaleLinear([0, 700000], [this.margin.left, this.width])
  y_scale = d3.scaleLinear([0, 60000], [this.margin.bottom, this.height])
  s_scale = d3.scaleLinear([0, 20000], [3, 5])
  
  incriment_month(){
    this.month += 1
    if (this.month > 12){
      this.month -= 12
      this.year += 1
    }

    if (this.year > 2020){
      this.year = 2017
    }

  }

  mounted(){
    fetch('http://localhost:56125/month_routes')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(json.length);
        json = json.slice(0, 1000)
        this.datum = json
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.icon{
  width: 1rem;
  height: 1rem;
}

.icon path {
  stroke: #333;
  stroke-width: 2;
}

#col_container{
  flex-flow: row nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

#col__header{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}

.svg{
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  background: #eaeaea;
  // border-radius: 1em;
}

circle{
  transition-duration: 2s;
}

path{
  // fill: red;
  // stroke: black;
  stroke-width: 1;
}


.listouter{
  width: 100%;
  position: relative;
  width: max-content
}

.listbutton{
  width: 16ch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  font-size: 1em;
  padding: 0.3em 0.8em;
  border-radius: 3px;
  margin: 3px;
  border: 1px solid #c7c7c7;
  height: 30px;
  background: #ececec;
}

.listbox{
  border: 1px solid rgba(0,0,0,0.4);
  padding: 0.2em 0.3em;
  border-radius: 0.3em;
  width: 100%;
  position: absolute;
  top: 1.6em;
  left: 0;
  padding: 0;
  margin: 0;
  background: white;
}

.listitem:not(:first-of-type) {
  border-top: 1px solid gray;
}

.listitem {
  box-sizing: border-box;
  // transition-duration: 0.05s;
  padding: 0.2em 0.3em;

  font: 400 13.33px Arial;
  width: 100%;
  list-style-type: none;
  text-decoration: none;
}

.listitem_active {
  background: rgb(230, 230, 161);
}

  
</style>
