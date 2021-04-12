<template>
    <div id="col_container">
        <svg>

        </svg>
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Trend extends Vue {

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
