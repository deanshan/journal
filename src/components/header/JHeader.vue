<template>
    <div id="header">
        <div class="logo">
            <a class="link link-journal" href="javascript:void(0)" data-letters="Journal">Journal</a>
        </div>
        <div class="header-content">
            <div class="search"></div>
            <div class="settings" :class="[ isVisible ? 'bg' : '']">
                <el-dropdown
                    placement="top"
                    @command="handleCommand"
                    @visible-change="toggle"
                >
                    <span class="drop-menu el-dropdown-link">
                        castiel<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">
                            <span class="iconfont user-icon">&#xe60a;</span>个人中心
                        </el-dropdown-item>
                        <el-dropdown-item command="setting">
                            <span class="iconfont set-icon">&#xe614;</span>设置
                        </el-dropdown-item>
                        <el-dropdown-item command="logout">
                            <span class="iconfont logout-icon">&#xe615;</span>退出
                        </el-dropdown-item>
                        <!-- FIXME:在组件中使用原生指令，需要加.native，使组件变成原生元素，否则事件不生效 -->
                        <!-- <el-dropdown-item @click.native="logout">退出</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
    name: "jheader",
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        logout() {
            this.SET_TOKEN({token: ''})
            sessionStorage.clear()
            this.$router.push({ path: '/login' })
        },
        handleCommand(command) {
            switch(command) {
                case 'logout':
                    this.logout()
            }
        },
        toggle(isVisible) {
            this.isVisible = isVisible
        }
    }
};
</script>

<style lang="scss" scoped>
#header {
    background: rgb(240, 188, 180);
    // background: #ccc;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .logo {
        background: #8b5c7e;
        // background: #ccc;
        width: 240px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        position: relative;
    }
    .header-content{
        height: 100%;
        flex: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .search {
            width: 200px;
        }
        .drop-menu {
            height: 60px;
            padding: 0 10px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            &:hover {
                background: #fff;
                cursor: pointer;
            }
        }
        .bg {
            background: #fff;
        }
    }
}
</style>
<style scoped>
.user-icon, .set-icon, .logout-icon {
    margin-right: 5px;
}
</style>


