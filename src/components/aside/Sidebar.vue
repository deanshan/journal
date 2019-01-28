<template>
  <div id="sidebar" :style="{'width': !collapse_status ? '240px' : '64px'}">
    <el-menu
        :collapse="collapse_status"
        :unique-opened=true
        :collapse-transition=true
        active-text-color="#000c3b"
        background="#07417a"
        default-active="/"
        router
    >
        <el-menu-item index="/" >
            <menu-effect iconclass="el-icon-news" title="统计图"></menu-effect>
        </el-menu-item>

        <el-submenu index="2">
            <template slot="title">
                <menu-effect iconclass="el-icon-menu" title="知识库"></menu-effect>
            </template>
            <el-menu-item-group>
                <el-menu-item
                    v-for="(nav, key) in catalog"
                    :key="key"
                    :index="`/knowledge/${nav}`"
                >
                    <menu-effect :title=nav padding_left="40px"></menu-effect>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/music">
            <menu-effect iconclass="el-icon-service" title="音乐"></menu-effect>
        </el-menu-item>

        <el-menu-item index="/map" >
            <menu-effect iconclass="el-icon-location" title="位置信息"></menu-effect>
        </el-menu-item>

        <el-menu-item index="/postal" >
            <menu-effect iconclass="el-icon-mobile-phone" title="实时通讯"></menu-effect>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MenuEffect from '@/components/aside/MenuEffect.vue'

// import catalog from '@/assets/catalog.json'

export default {
  name: "sidebar",
  data() {
    return {
    //   isCollapse: false,
      catalog: ['html', 'css', 'javascript', 'es6', 'vue']
    };
  },
  components: {
      'menu-effect': MenuEffect
  },
  mounted() {
  },
  computed: {
      ...mapState({
          collapse_status: state => state.collapse_status
      }),
  },
  methods: {
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
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    .el-menu {
        flex: auto;
        overflow-y: scroll;
    }
}
</style>


