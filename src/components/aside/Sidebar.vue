<template>
  <div id="sidebar" :style="{'width': !isCollapse ? '270px' : '64px'}">
    <div class="switch" ref="switch" @click="switching">
        <i :class="[ !isCollapse ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right' ]"></i>
    </div>

    <el-menu
        :collapse="isCollapse"
        :unique-opened=true
        :collapse-transition=true
        active-text-color="#3cdddd"
        :default-active="this.$router.path"
        router
    >
    <!-- <el-menu
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :unique-opened=true
        :collapse-transition=true
        active-text-color="#3cdddd"
    > -->
        <el-submenu index="1" >
            <template slot="title">
                <menu-effect
                    iconclass="el-icon-news"
                    title="统计图"
                ></menu-effect>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/">/cartogram</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <menu-effect
                    iconclass="el-icon-menu"
                    title="知识库"
                ></menu-effect>
            </template>
            <el-submenu index="2-1">
                <span slot="title">选项4</span>
                <el-menu-item index="2-1-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <menu-effect
                    iconclass="el-icon-service"
                    title="音乐"
                ></menu-effect>
            </template>
            <el-submenu index="3-1">
                <span slot="title">选项4</span>
                <el-menu-item index="3-1-1">选项1</el-menu-item>
                <el-menu-item index="3-1-2">选项1</el-menu-item>
                <el-menu-item index="3-1-3">选项1</el-menu-item>
                <el-menu-item index="3-1-4">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <menu-effect
                    iconclass="el-icon-location"
                    title="位置信息"
                ></menu-effect>
            </template>
            <el-submenu index="4-1">
                <span slot="title">选项4</span>
                <el-menu-item index="4-1-1">选项1</el-menu-item>
                <el-menu-item index="4-1-2">选项1</el-menu-item>
                <el-menu-item index="4-1-3">选项1</el-menu-item>
                <el-menu-item index="4-1-4">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <menu-effect
                    iconclass="el-icon-mobile-phone"
                    title="实时通讯"
                ></menu-effect>
            </template>
            <el-submenu index="5-1">
                <span slot="title">选项4</span>
                <el-menu-item index="5-1-1">选项1</el-menu-item>
                <el-menu-item index="5-1-2">选项1</el-menu-item>
                <el-menu-item index="5-1-3">选项1</el-menu-item>
                <el-menu-item index="5-1-4">选项1</el-menu-item>
                <el-menu-item index="5-1-1">选项1</el-menu-item>
                <el-menu-item index="5-1-2">选项1</el-menu-item>
                <el-menu-item index="5-1-3">选项1</el-menu-item>
                <el-menu-item index="5-1-4">选项1</el-menu-item>
                <el-menu-item index="5-1-1">选项1</el-menu-item>
                <el-menu-item index="5-1-2">选项1</el-menu-item>
                <el-menu-item index="5-1-3">选项1</el-menu-item>
                <el-menu-item index="5-1-4">选项12</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>

    <div class="clock">
        <j-clock :style="{ 'width': '240px', 'height': '37px'}"></j-clock>
    </div>

  </div>
</template>

<script>

import MenuEffect from '@/components/aside/MenuEffect.vue'
import Clock from '@/components/aside/Clock.vue'

export default {
  name: "sidebar",
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
      'menu-effect': MenuEffect,
      'j-clock': Clock
  },
  mounted() {
    this.$refs.switch.style.setProperty("--start", "2%");
    this.$refs.switch.style.setProperty("--end", "8%");
  },
  methods: {
    switching() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    // handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    // },
    // handleSelect(key, keyPath) {
    //     console.log(111);
    // }
  }
};
</script>

<style lang="scss" scoped>
#sidebar {
    padding-top: 24px;
    border-right: solid 1px #e6e6e6;
    width: 240px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.2s linear;
    .switch {
        position: absolute;
        top: 0;
        z-index: 111;
        animation: move 1s ease-in infinite alternate;
        i {
            font-size: 24px;
            color: #347245;
            cursor: pointer;
        }
    }
    .el-menu {
        flex: auto;
        overflow: scroll;
    }
    .clock {
        width: 260px;
        height: 50px;
        padding: 30px 0;
        // text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
@keyframes move {
  from {
    right: var(--start);
  }
  to {
    right: var(--end);
  }
}
</style>


