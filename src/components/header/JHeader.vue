<template>
    <div id="header">
        <div class="title">
            <a class="link link-journal" href="javascript:void(0)" data-letters="Journal">Journal</a>
            <div class="switch" @click.stop="collapseStatus">
                <i class="iconfont">&#xe62b;</i>
            </div>
        </div>
        <div class="r-header">
            <div class="search" @click.stop="searchStatus" :style="{'width': !search_status ? '25px' : '300px'}">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="searchData"
                >
                </el-input>
            </div>

            <div class="personal-info">
                <div class="user-info" @click.stop="showUserList">
                    <i class="iconfont portrait">&#xe667;</i>
                    <span class="username">castiel</span>
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <ul class="user-list" v-show="user_list_status">
                    <li>porfiles</li>
                    <li>message</li>
                    <li>logout</li>
                </ul>
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
            user_list_status: state => state.user_list_status
        })
    },
    methods: {
        ...mapMutations(["COLLAPSE_STATUS", "SEARCH_STATUS", "USER_LIST_STATUS"]),
        collapseStatus() {
            this.COLLAPSE_STATUS({ collapse_status: !this.collapse_status })
        },
        searchStatus() {
            this.searchData = '',
            this.SEARCH_STATUS({ search_status: true })
        },
        showUserList() {
            this.USER_LIST_STATUS({ user_list_status: !this.user_list_status })
        }
    }
};
</script>

<style lang="scss" scoped>
#header {
    background: rgb(240, 188, 180);
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
            background: #8b5c7e;
            margin-right: 30px;
            border-radius: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            cursor: pointer;
            &:hover,&:focus {
                background: #fa9fa4;
            }
            .user-info {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                i,span {
                    color: #fff;
                }
                .portrait {
                    font-size: 16px;
                }
            }
            .user-list {
                width: 100%;
                height: 60px;
                position: absolute;
                z-index: 99999;
                top: 100%;
                left: 0;
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

