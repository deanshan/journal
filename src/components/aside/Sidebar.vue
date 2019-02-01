<template>
  <div id="sidebar" :style="{'width': !collapse_status ? '240px' : '64px'}">
    <el-menu
        :collapse="collapse_status"
        :unique-opened=true
        :collapse-transition=true
        active-text-color="#000c3b"
        background="#07417a"
        :default-active="this.$route.path"
        router
    >
        <el-menu-item index="/" >
            <menu-effect title="统计图">
                <template slot="icon">
                    <i class="el-icon-news"></i>
                </template>
            </menu-effect>
        </el-menu-item>

        <el-submenu index="/knowledge">
            <template slot="title">
                <menu-effect title="知识库">
                    <template slot="icon">
                        <i class="el-icon-menu"></i>
                    </template>
                </menu-effect>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="(nav, key) in catalog" :key="key" :index="`/knowledge/${nav}`">
                    <menu-effect
                        :title=nav
                        :isEffect="true"
                        :setStyle="{'padding-left': '60px'}"
                    ></menu-effect>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/music">
            <menu-effect title="音乐">
                <template slot="icon">
                    <i class="el-icon-service"></i>
                </template>
            </menu-effect>
        </el-menu-item>

        <el-menu-item index="/maps" >
            <menu-effect title="位置信息">
                <template slot="icon">
                    <i class="el-icon-location"></i>
                </template>
            </menu-effect>
        </el-menu-item>

        <el-menu-item index="/socket" >
            <menu-effect title="实时通讯">
                <template slot="icon">
                    <i class="el-icon-mobile-phone"></i>
                </template>
            </menu-effect>
        </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MenuEffect from '@/components/aside/MenuEffect.vue'

export default {
  name: "sidebar",
  data() {
    return {
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


