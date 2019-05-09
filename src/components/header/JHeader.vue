<template>
    <div id="header">
        <div class="logo">
            <a class="link link-journal" href="javascript:void(0)" data-letters="Journal">Journal</a>
        </div>
        <div class="header-content">
            <div class="music-controls">
                <div
                    class="cover"
                    @click="playPause"
                    :class="[!paused ? 'rotate-animation-running' : 'rotate-animation-paused']"
                    :style="{'background-image': `url(${getCover})`}"
                ></div>
                <div class="controls">
                    <el-progress :percentage="80"></el-progress>

                    <div class="music-ctl">
                        <div @click="prevNextMusic('prev')">
                            <i class="iconfont">&#xe621;</i>
                        </div>
                        <div @click="playPause">
                            <i class="iconfont">{{ paused ? '&#xe617;' : '&#xe681;' }}</i>
                        </div>
                        <div @click="prevNextMusic('next')">
                            <i class="iconfont">&#xe622;</i>
                        </div>
                        <div @click="changeMode">
                            <i class="iconfont play-mode" v-show="playMode === 'order'">&#xe61a;</i>
                            <i class="iconfont play-mode" v-show="playMode === 'single'">&#xe62f;</i>
                            <i class="iconfont play-mode" v-show="playMode === 'circle'">&#xe701;</i>
                            <i class="iconfont play-mode" v-show="playMode === 'random'">&#xe624;</i>
                        </div>
                    </div>
                </div>
            </div>
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

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: "jheader",
    data() {
        return {
            isVisible: false
        }
    },
    computed: {
        ...mapState('player', {
            paused: state => state.paused,
            playMode: state => state.playMode
        }),
        ...mapGetters('list', ['getCover']),
        ...mapGetters('player', ['getCurrentIndex']),
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        ...mapMutations('player', ['PLAY_PAUSE', 'SET_PLAY_MODE']),
        ...mapMutations('list', ['CHANGE_MUSIC']),
        ...mapActions('list', ['getLyric']),
        playPause() {
            this.PLAY_PAUSE({ paused: !this.paused})
            // this.paused ? this.PLAY_PAUSE({paused: false}) : this.PLAY_PAUSE({paused: true})
        },
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
        },
        prevNextMusic (prevNext) {
            this.getCurrentIndex({type: prevNext})
            this.CHANGE_MUSIC()
            this.getLyric()
        },
        // 切换模式
        changeMode () {
            this.SET_PLAY_MODE()
        }
    }
};
</script>

<style lang="scss">
.el-progress__text {
    margin-left: 25px;
    color: #fff;
}
</style>

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
        justify-content: space-between;
        align-items: center;
        .music-controls {
            width: 300px;
            padding: 5px 10px;
            background: #8b5c7e;
            display: flex;
            .cover {
                flex-shrink: 0;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-size: 100% 100%;
                cursor: pointer;
                margin-right: 30px;
            }
            .controls {
                flex: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .music-ctl {
                    display: flex;
                    justify-content: space-between;
                    >div {
                        cursor: pointer;
                    }
                }
            }

        }
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


