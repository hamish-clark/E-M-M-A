<template>
  <div>
    <h1> Trend </h1>
    <button @click="onClick"> Fullscreen </button>
    <svg :width="width" :height="height" :viewBox="viewBox()">
      <path :d="d()"> </path>
    </svg>
  </div>
</template>

<script lang="ts">

import * as d3 from 'd3';
import { Line } from 'd3';
import { Vue } from 'vue-class-component'


export default class Scatter extends Vue {
  // Class properties will be component data
  count = 0

  margin = {
    left : 10,
    right : 10,
    top : 30,
    bottom : 30
  }

  width = 400
  height = 200
  datum = d3.range(10, 50)
  fullscreen = false

  scaleX() { return d3.scaleLinear([0, 100], [0, this.width]) }
  scaleY() { return d3.scaleLinear([0, 1], [this.margin.bottom, this.height-this.margin.bottom-this.margin.top]) }

  onClick(){
    this.fullscreen = !this.fullscreen;

    if (this.fullscreen){
      this.width = 600;
      this.height = 300;
    } else {
      this.width = 400
      this.height = 200;
    }
    
  }


  path() {

    return d3.line<number>()
    .curve(d3.curveMonotoneX)
      .x((d: number) => this.scaleX()(d))
      .y((d:number) => this.scaleY()(Math.random()))

  }

  viewBox() : string {
    return `${0} ${0}, ${this.width} ${this.height}`
  }

  d() {
    return this.path()(this.datum)
  }


  
}
</script>

<style scoped>


  div{
    padding: 15px;
  }

  svg {
    transition-duration: 0.4s;
    border-radius: 5px;
    fill: none;
    stroke: rgba(72, 0, 100, 0.329);
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;

  }

</style>