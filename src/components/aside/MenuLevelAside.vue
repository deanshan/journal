<template>
    <el-submenu
        :level="level"
        :menulists="menulists"
        :index="menulists.index"
    >
        <template slot="title">
            <i class="fa caret-direction fa-caret-right"></i>
            <span>{{ menulists.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group v-if="level === 2">
            <el-menu-item
                v-for="(list,key) in menulists.lists"
                :key="key"
                :index="list.index"
            >
                <i :class="list.iconClass"></i>
                <span class="text-style">{{ list.name }}</span>
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
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.text-style {
    font-size: 12px;
    color: #fff;
}
i {
    color: #fff;
    margin-right: 1px;
    line-height: 25px;
    width: 25px;
    vertical-align: middle;
    font-size: 18px;
}
span {
    font-size: 12px;
}
</style>
