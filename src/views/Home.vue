<template>
  <div id="home">
    <!-- 左侧导航 -->
    <j-sidebar></j-sidebar>
    <!-- 右侧内容 -->
    <section class="section">
      <!-- 头部 -->
      <j-header></j-header>
      <!-- 主体 -->
      <j-main></j-main>
    </section>
    <!-- <j-header></j-header>
    <section class="section">
      <j-sidebar></j-sidebar>
      <j-main></j-main>
    </section> -->
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
  overflow: hidden;
  display: flex;
  section.section {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>

