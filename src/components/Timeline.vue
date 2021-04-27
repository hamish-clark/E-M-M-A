<template>

  <div id="timeline__outer">

    <div id="timeline__header">

      <div id="minimise_button"><text> ▲ </text></div>

      <text>
        GTFS Version <b> {{ new Date().toISOString().slice(0, 10) }} </b>
      </text>

    </div>

    <div id="timeline__content">
      <div id="timeline__svg__outer">

        <svg
          id="timeline__svg"
          :width="width"
          :height="height"
          :viewBox="viewBox()"
          preserveAspectRatio="xMidYMid slice"
        >

        <!-- AXIS -->
        <g :transform="`translate(${0}, ${0})`">
          <vue-axis
            :orient="axisTime.orient"
            :scale="axisTime.scale"
            :range="axisTime.range"
            :domain="axisTime.domain"
            :height="height"
            :width="width"
          ></vue-axis>
        </g>

          <!-- DATA -->
          <g v-for="event in events" :key="event.date">

            <circle
              stroke="#333"
              :strokeWeight="1"
              fill="tomato"
              cy="-15"
              r="4"
              :cx="time_scale(event.date)"
            ></circle>

            <text
              fill="blue"
              font-size="12"
              dy="-30"
              text-anchor="middle"
              :x="time_scale(event.date)"
            >

              {{ event.date.toISOString().slice(0, 10) }}

            </text>
            
            <text
              font-size="12"
              dy="-42"
              text-anchor="middle"
              :x="time_scale(event.date)"
            >
              {{ event.info }}
            </text>

          </g>

        </svg>

      </div>

    </div>

  </div>
  
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import * as d3 from "d3";

const versionid = (date: Date) => {
  return date
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("");
};

let v_id = versionid(new Date());

// fetch(`http://localhost:56125/gtfs/versions`)
//   .then(res => res.json())
//   .then(payload => {

//     for (let id of payload){
//       fetch(`http://localhost:56125/gtfs/${id}`)
//         .then((res) => res.json())
//         .then((json) => console.log(json));
//     }

//   })

/**
 * Axis Component
 */
@Options({
  name: "vue-axis",
  props: {
    orient: String,
    scale: String,
    range: Array,
    domain: Array,
    height: Number,
    width: Number,
    tickSize : Number
  },

  template: `<g> </g>`,

})
export class VueAxis extends Vue {
  name = "VueAxis";
  width = 0;
  height = 0;
  orient = "Bottom";
  scale = "scaleLinear";
  domain = [0, 100];
  range = [0, 100];
  tickSize = -25

  orientMap: Map<string, any> = new Map([
    ["Left", d3.axisLeft],
    ["Bottom", d3.axisBottom],
    ["Top", d3.axisTop],
    ["Right", d3.axisRight],
  ]);

  _transform() {
    var x = this.orient === "Right" ? this.width : 0;
    var y = this.orient === "Bottom" ? this.height : 0;
    return "translate(" + x + "," + y + ")";
  }

  _orient() {
    return "axis" + this.orient;
  }

  _scale() {
    return d3
      .scaleTime()
      .range(this.range)
      .domain(this.domain);
  }

  mounted() {
    let axis: any | undefined = this.orientMap.get(this.orient);
    console.log(axis);
    
    if (axis != undefined) {
      d3.select(this.$el)
        .call(
          axis(this._scale())
            .ticks(d3.timeMonth.every(3))
            .tickSize(this.tickSize)
        )
        .call((g : any) => g.select(".domain").remove())
        .call((g : any)  =>
          g
            .selectAll(".tick line")
            // .selectAll(".tick:not(:first-of-type) line")
            .attr("stroke-opacity", 0.5)
            .attr("stroke-dasharray", "2,2")
        )
        .call((g : any) =>
          g
            .selectAll(".tick text")
            .attr("x", 0)
            .attr("dx", 0)
        );

      // d3.select(this.$el).call(d3.brush());
    }
  }
}


/**
 * Timeline Component
 */
@Options({
  components: {
    VueAxis,
  },
})
export default class Timeline extends Vue {
  width = 1200;
  height = 150;
  margin = {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30,
  };

  hmargin = this.margin.left + this.margin.right;
  vmargin = this.margin.top + this.margin.bottom;

  start_date = new Date("2016-12-31");
  end_date = new Date("2022-01-01");

  time_scale = d3.scaleTime(
    [this.start_date, this.end_date],
    [this.margin.left, this.width - this.hmargin]
  );

  axisTime = {
    scale: "scaleTime",
    domain: [this.start_date, this.end_date],
    range: [0, this.width],
    orient: "Bottom",
  };

  events = [
    {date : new Date("2019-01-01"), info : 'New Year'},
    {date : new Date("2018-07-15"), info : 'PTOM start'},
    {date : new Date("2019-10-01"), info : 'PTBIS Switchover'},
    {date : new Date(), info : "Today"}
  ];

  viewBox() {
    return `${0} ${-this.height / 2} ${this.width} ${this.height}`;
  }

  mounted() {
    console.log("mount");
    
  }

}

</script>

<style lang="css" scoped>

#timeline__outer {
  box-sizing: border-box;
  z-index: 0;

  grid-area: timeline;
  /*     
    position: fixed;
    bottom: 0; */

  width: 100%;
  height: 150px;

  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2);
  /* border-top: 1px solid rgba(0, 0, 0, 0.083); */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.07);

  transition-duration: 0.2s;

  display: grid;

  grid-template-rows: auto 1fr;
}

#timeline__outer:hover {
  background: rgba(255, 255, 255, 0.5);
}

#timeline__header {
  box-sizing: border-box;
  color: white;
  background: rgb(44 62 80);
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding: 0.2em 0.2em;
  gap: 10px;
  align-items: center;
}

#timeline__content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#timeline__svg__outer {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 100%;
}

#timeline__svg {
  overflow: hidden;
  display: inline-block;
}

#minimise_button {
  background: #9fcfff;
  color: #333;
  border-radius: 0.1em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1em;
  width: 1em;
  height: 1em;
}

#minimise_button text {
  margin: 0;
  line-height: 1em;
  padding: 0;
}

</style>
