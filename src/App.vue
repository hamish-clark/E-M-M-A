<template>

  <div id="outer" v-cloak @drop.prevent @dragover.prevent>
    <div id="nav" class="card">
      <div class="button"> _ </div>
      <h2> E M M A </h2>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/about">Public</router-link>
      <router-link to="/about">Analyse</router-link> 

      <div id="event__container">

      </div>

      <div id="time__container" 
        :style='{
          "font-family": "Courier",
          "display" : "flex",
          "flex" : 1,
          "flex-flow" : "row-reverse nowrap",
          "margin" : 0,
          "gap" : "1em"
        }
        '>

        <h3 class="timeText"> {{ date_string }} </h3>
        <h3 class="timeText"> {{ time_string }} </h3>

      </div>

    </div>

    <div id="side" class="card">

    </div>

    <div id="content">
      <router-view/>
    </div>

    <Timeline></Timeline>


  </div>

</template>

<script lang="ts">

const BASE_URL = 'http://localhost:8080'

import Timline from './components/Timeline.vue'

import { defineComponent } from 'vue'

function toLocalISOString(d : Date) : string {
  var off = d.getTimezoneOffset();
	return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - off, d.getSeconds(), d.getMilliseconds()).toISOString();
}

export default defineComponent({
  name : 'E M M A',

  data : function() {
    return {
      updateTimestamp : new Date()
    }
  },

  mounted : function() {
    setInterval(()=> {
      this.updateTimestamp = new Date()
      
    }, 1000)

  },

  computed : {
    time_string() : string {
      return toLocalISOString(this.updateTimestamp).slice(11, 19)

    },

    date_string() : string {
      return toLocalISOString(this.updateTimestamp).slice(0, 10)
    },

  },

  components : {
    Timeline : Timline
  },

})

// fetch(`${BASE_URL}/fleet`).then(async res => {
//   console.log(res);
// })

</script>

<style lang="scss">

:root {
  --primary-bg: #eee;
  --primary-fg: #f2f2f2;

  --primary: #333;
  --secondary: #777;
  --tertiary: #ccc;
}

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;

  background: var(--primary-bg);
  background: linear-gradient(329deg, #adadad, transparent);

}

#outer{
  height: 100%;
  display: grid;

  grid-template:
    "nav nav nav" min-content
    "side content content"
    "side content content"
    "timeline timeline timeline" min-content / 250px 1fr 1fr;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.button {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 900;
  width: 2em;
  height: 2em;
  background: #eae9e9;
  border-radius: 3px;
  text-align: center;
  line-height: 2em;
  color: black;

  transition: 
    background ease 0.2s,
    transform ease 0.2s;

}

.button:hover{
  background: red;
  transform: rotate(90deg);
}

.button text{
  pointer-events: none;
}

.shade{
  box-shadow: 
    0px 0px 5px 3px rgba(0, 0, 0, 0.05),
    0px 0px 1px 1px rgba(0, 0, 0, 0.1);
}

.card {
  background: var(--primary-fg);
  backdrop-filter: blur(20px) saturate(0.5);
  box-shadow: 
    0px 0px 5px 3px rgba(0, 0, 0, 0.05),
    0px 0px 1px 1px rgba(0, 0, 0, 0.1);
}


#content {

  grid-area: content;
  overflow-x: hidden;
  overflow-y: scroll;

}

#side {
  max-width: 250px;
  grid-area: side;
  z-index: 1;

  h1, h2, h3, p, li{
    font-weight: normal;
    text-align: left;
    font-size: 1em;
    margin: 0;
    padding: 0.1em;
  }

  ul{
    margin: 0;
  }

  h1{
    background: var(--primary);
    color: white;
  }

  h2{
    background: var(--secondary);
    color: rgb(169, 169, 169);

  }

  h3{
    background: var(--tertiary);
  }

  p{
    margin-left: 1em;
  }

}

.timeText{
  position: relative;
  color: #c3dfff;
  background: #2c3e50;
  border-radius: 0.1em;
  padding: 0.3em 0.4em;
  line-height: 1em;
}


#nav {
  grid-area: nav;
  z-index: 2;
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 1em;

  padding: 1.5em;


  h2{
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    margin-right: 1em;
  }

  a {
    
    line-height: 100%;
    text-decoration: none;
    background: #eeeeee;
    padding: 0.5em 1em;
    border-radius: 3px;
    color: black;
    border-bottom: 1px solid white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.076);

    &.router-link-exact-active {
      color: white;
      background: red;
    }
  }

  // a::before{
  //   margin-right: 1em;
  //   content : "";
  // }
  


}



</style>
