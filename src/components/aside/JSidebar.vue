<template>
    <el-aside :width="!isCollapse ? '240px' : '0px'">
        <el-row>
            <el-col :span="24">
                <div
                    class="collapse"
                    :style="{'left': !isCollapse ? '220px' : '-10px', }"
                    @click="changeCollapse"
                >
                    <img :src="[!isCollapse ? images.open : images.close]">
                </div>
                <el-menu
                    :collapse=isCollapse
                    :collapse-transition=true
                    background-color="#252A43"
                    text-color="#fff"
                    :default-active=defaultMenu
                    router
                    @select="select"
                >

                    <MenuLevelAside
                        :level=2
                        :menulists=this.menulist.cartogram
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level=3
                        :menulists=this.menulist.resourceCenter
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level=3
                        :menulists=this.menulist.itamCenter
                    ></MenuLevelAside>

                    <MenuLevelAside
                        :level=2
                        :menulists=this.menulist.monitorCenter
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
                    lists: [
                        {
                            "index": "/cartogram/dataCenterView",
                            "name": "视图",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/cartogram/resourcePoolView",
                            "name": "视图",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/cartogram/vdcBusinessview",
                            "name": "视图",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/cartogram/star",
                            "name": "星空图",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/cartogram/matrix",
                            "name": "矩阵图",
                            "iconClass": "fa fa-share-alt-square"
                        }
                    ]
                },
                resourceCenter: {
                    title: "知识库",
                    index: "/resourceCenter",
                    submeunlists: {
                        computeServer: {
                            subtitle: "HTML",
                            index: "/computeServer",
                            lists:[
                                {
                                    "index": "/resourceCenter/host",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/hostImage",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/disk",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/diskSnapshot",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/keypair",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/securityGroup",
                                    "name": "HTML",
                                    "iconClass": "fa fa-share-alt-square"
                                }
                            ]
                        },
                        networkServer: {
                            subtitle: "JavaScript",
                            index: "/networkServer",
                            lists:[
                                {
                                    "index": "/resourceCenter/vpc",
                                    "name": "JavaScript",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/floatingIP",
                                    "name": "JavaScript",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/resourceCenter/firewall",
                                    "name": "JavaScript",
                                    "iconClass": "fa fa-share-alt-square"
                                }
                            ]
                        }
                    }
                },
                itamCenter: {
                    title: "音乐",
                    index: "/itamCenter",
                    submeunlists: {
                        itamManagement: {
                            subtitle: "音乐",
                            index: "/itamManagement",
                            lists: [
                                {
                                    "index": "/itamCenter/computeDevice",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/networkDevice",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/storageDevice",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/safety",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/peripheral",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                }
                            ]
                        },
                        resourceManagement: {
                           subtitle: "音乐",
                           index: "/resourceManagement",
                           lists:[
                                {
                                    "index": "/itamCenter/dataCenter",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/computerRoom",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/cabinet",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/label",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                }
                            ]
                        },
                        supplierManagement: {
                           subtitle: "音乐",
                           index: "/supplierManagement",
                           lists: [
                                {
                                    "index": "/itamCenter/vendor",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/personnel",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                },
                                {
                                    "index": "/itamCenter/model",
                                    "name": "音乐",
                                    "iconClass": "fa fa-share-alt-square"
                                }
                            ]
                        }
                    }
                },
                monitorCenter: {
                    title: "地理位置",
                    index: "/monitorCenter",
                    lists: [
                        {
                            "index": "/monitorCenter/resourceMonitor",
                            "name": "地理位置",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/monitorCenter/monitorTemplate",
                            "name": "地理位置",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/monitorCenter/resourceAlarm",
                            "name": "地理位置",
                            "iconClass": "fa fa-share-alt-square"
                        },
                        {
                            "index": "/monitorCenter/noticeGroup",
                            "name": "地理位置",
                            "iconClass": "fa fa-share-alt-square"
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
        defaultMenu() {
            let url = sessionStorage.getItem('url')
            if(!url) {
                sessionStorage.setItem('url', this.menulist.cartogram.lists[0]['index'])
                url = this.menulist.cartogram.lists[0]['index']
            }
            return url
        }
    },
    methods: {
        changeCollapse() {
            this.isCollapse = !this.isCollapse
        },
        select(key,keyPath) {
            sessionStorage.setItem('url', key)
        }
    }
}
</script>

<style lang="scss" scoped>
.collapse {
    position: fixed;
    line-height: 30px;
    top: 48%;
    z-index: 100;
    transition: all .2s ease 0s;
    cursor: pointer;
    width: 20px;
}
</style>