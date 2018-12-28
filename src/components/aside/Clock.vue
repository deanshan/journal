<template>
  <canvas id="clock" :style="{ 'width': width, 'height': height}"></canvas>
</template>

<script>
import { Clock } from "@/utils/digitClock.js"

export default {
  name: "clock",
  props: {
    width: {
      type: String,
      default: ' '
    },
    height: {
      type: String,
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
        w: 275,
        h: 60,
        offsetX: 0,
        offsetY: 10,
        scale: 25,
        color: `#000`
      })
    }
  }
}
</script>
