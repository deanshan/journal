<template>
  <div id="home">
    <j-header></j-header>
    <section class="main">
      <j-sidebar></j-sidebar>
      <section>main1111111111111111</section>
    </section>
  </div>
</template>

<script>

import JHeader from "@/components/header/JHeader.vue"
import Sidebar from "@/components/aside/Sidebar.vue"

export default {
  name: "home",
  data() {
    return {
    }
  },
  components: {
    'j-header': JHeader,
    'j-sidebar': Sidebar
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
#home {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  section.main {
    background: #fff;
    flex: auto;
    display: flex;
  }
}
</style>

