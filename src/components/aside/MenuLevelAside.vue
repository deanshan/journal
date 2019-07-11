<template>
    <el-submenu
        class="menu"
        :level="level"
        :menulists="menulists"
        :index="menulists.index"
    >
        <template slot="title">

            <MenuEffect :iconClass="menulists.iconClass" :title="menulists.title"></MenuEffect>

        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group v-if="level === 2">
            <el-menu-item
                v-for="(list,key) in menulists.lists"
                :key="key"
                :index="list.index"
            >
                <MenuEffect :iconClass="list.iconClass" :title="list.name" :styleObj="{'padding-left': '50px'}"></MenuEffect>

            </el-menu-item>
        </el-menu-item-group>
        <!-- 三级菜单 -->
        <el-submenu
            v-else-if="level === 3"
            v-for="(submeunlist,key) in menulists.submeunlists"
            :key="key"
            :index="submeunlist.index"
        >
            <template slot="title">
                <i class="fa caret-direction fa-caret-right"></i>
                <span>{{ submeunlist.subtitle }}</span>
            </template>
            <el-menu-item
                v-for="(list,k) in submeunlist.lists"
                :key="k"
                :index="list.index"
            >
                <i :class="list.iconClass"></i>
                <span class="text-style">{{ list.name }}</span>
            </el-menu-item>
        </el-submenu>
    </el-submenu>
</template>

<script>
import MenuEffect from '@/components/common/MenuEffect.vue'

export default {
    name: "listAside",
    data() {
        return {
        }
    },
    props: {
        level: {
            default: 1,
            type: Number
        },
        menulists: {
            default: () => {},
            type: Object
        }
    },
    components: {MenuEffect},
    methods: {
    }
}
</script>

<style lang="scss">
.menu {
    .el-submenu__title {
        height: 50px;
        padding: 0 !important;
    }
    .el-menu-item {
        padding: 0 !important;
    }
}
</style>

<style lang="scss" scoped>

</style>
