
<template>

  <div class="outer">

    <div class="year__outer" :key="y" v-for="y in years"> 
      <h1> {{ y }} </h1>
      <div class="year">
      
        <div class="month__outer" :key="m" v-for="m in months"> 
          <p> {{ MONTHS[m] }} </p>
          <div class="month">


            <div class="date day_label" 
              v-for="day in ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']"
              :key="day"
            >
              {{ day }}

            </div>

            <div  
              class="date"
              v-bind:class="{ disabled: dot <  active_date }"
              v-for="dot in get_month_dates(y, m)"
              :key="dot"
              @click="date_clicked(dot)"
            >

              {{ dot.getDate().toString().padStart(2, '0') }}

            </div>

          </div>
        </div>
      
      
      </div>
    </div>

  </div>
  
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";
import * as d3 from 'd3'



export const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return await response.json(); // parses JSON response into native JavaScript objects
}



let execute_sql_query = async (sql_query_string: string) => {
  console.log(`Query ${sql_query_string.slice(0, 200)}...`)
  return await postData('http://emma-dev.gw.govt.nz:56125/remote_sql', { 'command': sql_query_string }).then(async json => {
    return json.rows;
  })
}



/**
 * Timeline Component
 */
@Options({
  components: {
  }
})
export default class Timeline extends Vue {

 MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  datum : Map<string, Date[]> = new Map();
  date_dict = {};
  years = d3.range(2021, 2022, 1)
  months = d3.range(0, 12, 1)

  active_date = new Date()

  async date_clicked(date : Date){

    this.active_date = date;
    // console.log(date, "clicked");

    // let roews = await execute_sql_query(`
    //   SELECT * TOP (100) FROM [DW].[DW].[FactPassengerTrip]
    // `)
    // console.log(roews);
    
  }

  get_month_dates(year : number, month : number) : Date[] {
    let key = `${year}_${month}`;
    let val = this.datum.get(key) || [];
    
    return val

  }

  beforeCreate() {

    // let start_date = new Date();

    for (let year of this.years) {
      for (let month of this.months) {
          var dateRange : Date[] = d3.timeDays(new Date(year, month, ), new Date(year, month, 32));
          let first_date = dateRange[0];
          let first_day = first_date.getDay();
          
          for (let date of dateRange) {
            let key = `${year}_${month}`
            

            let arr : Date[] | undefined = this.datum.get(key)

            if (arr == undefined){
              this.datum.set(key, [date])
            }else{
              arr.push(date)
            }
            

          }

        }

    }  

    
      
  }

}

</script>

<style lang="css" scoped>

  .outer{
    display: grid;

  }

  .year__outer h1{
    text-align: left;
    font-family: 'Courier New', Courier, monospace;
    margin: 1rem;
    border-radius: 1rem 1rem 0 0;
    padding: 0.6rem 3rem;
    background: #2c3e50;
    color: white;
  }

  .year {
    margin: 0px 2rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }

  .month__outer p{
    font-weight: 500;
  }

  .month { 
    margin: 10px;
    display: grid;    
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);


  }

  .date {
    border-radius: 2px;
    border: 1px solid #c7c7c7;
    margin: 1px;
    font-weight: 700;
    font-family: 'Courier New', Courier, monospace;
    /* width: 1rem; */
    padding: 0.2em;
    background: #ececec;
    box-sizing: border-box;
    transition-duration: 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
  }

  .disabled{
    background: white;
    /* background: linear-gradient(transparent 45%, red 50%, transparent 55%); */
    color: rgb(211, 211, 211);
  }

  .enabled{

  }

  .date:hover { 
    color: white;
    background: rgb(44 62 80);
  }
  
  .day_label{
    color: white;
    background: black;
  }



</style>
