<template>
  <canvas
    id="clock"
    :style="{
      'width': width,
      'height': height
    }"
  >

  </canvas>
</template>

<script>
import { Clock } from "@/utils/digitClock.js"

export default {
  name: "clock",
  props: {
    width: {
      type: Number,
      default: ' '
    },
    height: {
      type: Number,
      default: ' '
    }
  },
  mounted() {
    this.clock();
  },
  methods: {
    clock() {
      new Clock({
        el: "#clock",
        w: this.width,
        h: this.height,
        offsetX: 0,
        offsetY: 10,
        scale: 25,
        color: `#000`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#clock {
  width: 210px;
}
</style>
