<template>
    <div id="header">
        <div class="title">
            <a class="link link-journal" href="javascript:void(0)" data-letters="Journal">Journal</a>
            <div class="switch" @click.stop="collapseStatus">
                <i class="iconfont">&#xe62b;</i>
            </div>
        </div>
        <div class="r-header">
            <div class="search" @click.stop="searchStatus" :style="{'width': !search_status ? '25px' : '200px'}">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="searchData"
                >
                </el-input>
            </div>
            <div class="personal-info">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <span class="title">
                            <i class="iconfont portrait">&#xe667;</i>
                            <span class="username">castiel</span>
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- <nav>
            <a
                href="#"
                class="link link-flip"
                v-for="(item, key) in nav"
                :key="key"
            >
              <span v-for="(str, k) in item.split('')" :key="k">{{ str }}</span>
          </a>
        </nav> -->
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
    name: "jheader",
    data() {
        return {
            searchData: '',
            nav: ['home', 'video', 'protfolio', 'skills', 'map', 'contact']
        }
    },
    computed: {
        ...mapState({
            collapse_status: state => state.collapse_status,
            search_status: state => state.search_status,
        })
    },
    methods: {
        ...mapMutations(["COLLAPSE_STATUS", "SEARCH_STATUS"]),
        collapseStatus() {
            this.COLLAPSE_STATUS({ collapse_status: !this.collapse_status })
        },
        searchStatus() {
            this.SEARCH_STATUS({ search_status: true })
        }
    }
};
</script>

<style lang="scss" scoped>
#header {
    background: rgb(240, 188, 180);;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .title {
        background: #8b5c7e;
        width: 240px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        position: relative;
        .switch {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 100%;
            transform: translate3d(-50%, -50%, 0);
            background: #8b5c7e;
            border-radius: 50%;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            i {
                font-size: 16px;
                color: #fff;
            }
        }
    }
    .r-header{
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 30px;
        .search {
            height: 25px;
            border-radius: 100px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all .3s linear;
        }
        .personal-info {
            width: 100px;
            height: 25px;
            background: #fa9fa4;
            margin-right: 30px;
            border-radius: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .portrait {
                font-size: 16px;
                color: #000;
            }
        }
    }
    // nav {
    //     a + a {
    //         margin-left: 20px;
    //     }
    // }
}
</style>

