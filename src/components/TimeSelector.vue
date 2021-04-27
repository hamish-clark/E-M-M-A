

<template>
    <div>
    <svg :width="width" :height="height" :viewBox="viewBox()">

        <!-- legend -->

        <g v-for="n in [0, 3, 6, 9, 12, 15, 18, 21, 24]" :key="n">
            <text dx=-5 :x="10*n"  y=100>  {{ n }} </text>

            <rect :x="10*n" y=0 width=1 :height="height/2-16" fill="gray"> </rect>            
        
        </g>

        <g transform="translate(0, 100)">

            <g 
                v-for   ="(slot, index) in slots" 
                :key    ="slot"
                :transform="`translate(0, ${-25-index*15})`"
            >  

                <!-- Time Bar -->
                <rect 
                    :x      ="slot[0]*10"
                    :width  ="(slot[1] - slot[0]) * 10"                
                    :height ="10"
                    fill    ="purple"
                    rx      = 5
                ></rect>

                <!-- Time Circle start -->
                <circle 
                    :cx="slot[0]*10 + 5"
                    cy="5"
                    r="3"
                    fill="cyan"
                > </circle>
            
                <!-- Time Circle end -->
                <circle 
                    :cx="slot[1]*10 - 5"
                    cy="5"
                    r="3"
                    fill="orange"
                > </circle>

            </g>

        </g>

        <!-- <text :x="10*3"  y=130> 7am </text>
        <text :x="10*8"  y=130> 8am </text> -->

        <!-- <rect rx=5 x=0 y=0 width=10 :height="height" fill="red"> </rect> -->

        <!-- <circle cx=0 cy=100 r=16> </circle> -->
        
    </svg>

    <div>
        <text> 7am to 9am </text>
        <text> | </text>
        <text> 5pm to 7pm </text>
    </div>

    </div>
    

</template>

<script>

// import * as d3 from 'd3';
import { Vue, Options } from 'vue-class-component'




@Options({
  props: {
    id: String
  },
})
export default class TimeSelector extends Vue{

    width = 300
    height = 200

    slots = [[3, 6], [2, 9], [8, 15], [7, 9], [17, 19]]

    viewBox(){
        return `${0} ${0} ${this.width} ${this.height}`
    }

    timeScale () {
        return 0
    }

    mounted() {
        console.log("Mounted");
        console.log(this.$el);
    }


}

</script>

<style scoped>

</style>
