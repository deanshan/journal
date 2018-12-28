<template>
  <div id="home">
    <j-header></j-header>
    <section class="section">
      <j-sidebar></j-sidebar>
      <j-main></j-main>
    </section>
  </div>
</template>

<script>

import JHeader from "@/components/header/JHeader.vue"
import Sidebar from "@/components/aside/Sidebar.vue"
import JMain from "@/components/main/JMain.vue"

export default {
  name: "home",
  data() {
    return {
    }
  },
  components: {
    'j-header': JHeader,
    'j-sidebar': Sidebar,
    'j-main': JMain
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
  section.section {
    flex: auto;
    display: flex;
  }
}
</style>

