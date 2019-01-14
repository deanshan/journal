<template>
  <div id="sidebar" :style="{'width': !isCollapse ? '260px' : '64px'}">
    <div class="switch" @click="switching" :style="{ 'left': !isCollapse ? '85%' : '32%'}">
        <i class="el-icon-menu"></i>
    </div>

    <el-menu
        :collapse="isCollapse"
        :unique-opened=true
        :collapse-transition=true
        active-text-color="#000c3b"
        background="#07417a"
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
            <el-submenu :index="key" v-for="(item,key) in catalog" :key="key">
                <span slot="title">{{ key }}</span>
                <!-- <router-link slot="title" to="/knowledge">{{ key }}</router-link> -->
                <el-menu-item
                    index="/knowledge"
                    v-for="(nav, k) in item"
                    :key="k"
                >
                    <a :href="`#${nav}`">{{ nav }}</a>
                </el-menu-item>
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
  </div>
</template>

<script>

import MenuEffect from '@/components/aside/MenuEffect.vue'

import catalog from '@/assets/catalog.json'

export default {
  name: "sidebar",
  data() {
    return {
      isCollapse: false,
      catalog
    };
  },
  components: {
      'menu-effect': MenuEffect
  },
  mounted() {
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
    padding-top: 32px;
    background: #000c3b;
    box-shadow: inset 0 0 30px #07417a;
    width: 240px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .switch {
        position: absolute;
        top: 1%;
        z-index: 111;
        i {
            font-size: 24px;
            color: #83c7e3;
            cursor: pointer;
        }
    }
    .el-menu {
        flex: auto;
        overflow-y: scroll;
    }
}
</style>


