<template>
    <el-aside :width="!isCollapse ? '240px' : '0px'">
        <el-row>
            <el-col :span="24">
                <div
                    class="collapse"
                    :style="{'left': !isCollapse ? '220px' : '-10px', }"
                    @click="isCollapse = !isCollapse"
                >
                    <img :src="[!isCollapse ? images.open : images.close]">
                </div>
                <el-menu
                    :collapse="isCollapse"
                    :collapse-transition="true"
                    :unique-opened="true"
                    background-color="#252A43"
                    text-color="#fff"
                    :default-active="$route.path"
                    router
                >

                    <MenuLevelAside
                        :level="2"
                        :menulists="this.menulist.cartogram"
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level="2"
                        :menulists="this.menulist.knowledge"
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level="2"
                        :menulists="this.menulist.pleasure"
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level="2"
                        :menulists="this.menulist.monitorCenter"
                    ></MenuLevelAside>

                </el-menu>
            </el-col>
        </el-row>
    </el-aside>

</template>

<script>

import MenuLevelAside from '@/components/aside/MenuLevelAside.vue'

export default {
    name: "operationAside",
    data() {
        return {
            isCollapse: false,
            images:{
                open: require("@/assets/images/collapse.png"),
                close: require("@/assets/images/unfold.png")
            },
            menulist: {
                cartogram: {
                    title: "统计图",
                    index: "/cartogram",
                    iconClass: "icon-tongjitu",
                    lists: [
                        {
                            "index": "/cartogram/star",
                            "name": "星空图",
                            "iconClass": "icon-tongjitu",
                            "unicode": "&#xe618;"
                        },
                        {
                            "index": "/cartogram/matrix",
                            "name": "矩阵图",
                            "iconClass": "icon-tongjitu"
                        }
                    ]
                },
                knowledge: {
                    title: "知识库",
                    index: "/knowledge",
                    iconClass: "icon-zhishiku",
                    lists: [
                        {
                            "index": "/knowledge/html",
                            "name": "HTML",
                            "iconClass": "icon-zhishiku"
                        },
                        {
                            "index": "/knowledge/css",
                            "name": "CSS",
                            "iconClass": "icon-zhishiku"
                        },
                        {
                            "index": "/knowledge/javaScript",
                            "name": "JavaScript",
                            "iconClass": "icon-zhishiku"
                        },
                        {
                            "index": "/knowledge/es6",
                            "name": "ES6",
                            "iconClass": "icon-zhishiku"
                        },
                        {
                            "index": "/knowledge/vue",
                            "name": "VUE",
                            "iconClass": "icon-zhishiku"
                        },
                        {
                            "index": "/knowledge/fetch",
                            "name": "Fetch",
                            "iconClass": "icon-zhishiku"
                        },
                    ]
                },
                pleasure: {
                    title: "娱乐",
                    index: "/pleasure",
                    iconClass: "icon-yule",
                    lists: [
                        {
                            "index": "/pleasure/music",
                            "name": "音乐",
                            "iconClass": "icon-yiliao"
                        }
                    ]
                },
                monitorCenter: {
                    title: "地理位置",
                    index: "/monitorCenter",
                    iconClass: "icon-diliweizhi",
                    lists: [
                        {
                            "index": "/monitorCenter/resourceMonitor",
                            "name": "地理位置",
                            "iconClass": "icon-diliweizhi"
                        },
                        {
                            "index": "/monitorCenter/monitorTemplate",
                            "name": "地理位置",
                            "iconClass": "icon-diliweizhi"
                        },
                        {
                            "index": "/monitorCenter/resourceAlarm",
                            "name": "地理位置",
                            "iconClass": "icon-diliweizhi"
                        },
                        {
                            "index": "/monitorCenter/noticeGroup",
                            "name": "地理位置",
                            "iconClass": "icon-diliweizhi"
                        }
                    ]
                }
            }
        }
    },
    components: {
        MenuLevelAside
    },
    computed: {
    },
    methods: {
        // changeCollapse() {
        //     this.isCollapse = !this.isCollapse
        // }
    }
}
</script>

<style lang="scss" scoped>
.collapse {
    position: fixed;
    line-height: 30px;
    top: 48%;
    z-index: 100;
    width: 20px;
    transition: all .2s linear;
    cursor: pointer;
}
</style>