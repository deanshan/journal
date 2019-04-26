<template>
    <div class="recommend h100" ref="recommend">
        <el-tabs v-model="activeMusicType" @tab-click="handleMusicType">
            <el-tab-pane label="新歌" name="newMusic">
                <ul class="title row">
                    <li>序列</li>
                    <li>封面</li>
                    <li>歌名</li>
                    <li>歌词</li>
                    <li>时长</li>
                    <li>歌手</li>
                    <li>icon</li>
                </ul>
                <ul v-for="(item, key) in newMusic" :key="key" class="row">
                    <li>{{ key }}</li>
                    <li>
                        <router-link
                            :to="{name: 'playCover'}"
                            class="cover"
                            :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000)`}"
                        ></router-link>
                    </li>
                    <li>
                        <span @click="playPause(key)">
                            <i class="iconfont" v-show="playIcon">&#xe617;</i>
                            <i class="iconfont" v-show="!playIcon">&#xe681;</i>
                        </span>
                        <span>{{ item.data.songname }}</span>
                    </li>
                    <li>lyric</li>
                    <li>{{ item.data.interval }}</li>
                    <li>{{ item.data.singer[0].name }}</li>
                    <li>icon</li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="热歌" name="hostMusic">
                <ul class="title row">
                    <li>序列</li>
                    <li>封面</li>
                    <li>歌名</li>
                    <li>歌词</li>
                    <li>时长</li>
                    <li>歌手</li>
                    <li>icon</li>
                </ul>
                <ul v-for="(item, key) in hotMusic" :key="key" class="row" ref="hostMusicList">
                    <li>{{ key }}</li>
                    <li>
                        <router-link
                            :to="{name: 'playCover'}"
                            class="cover"
                            :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000)`}"
                        ></router-link>
                    </li>
                    <li @click="playPause(key)">
                        <span>
                            <i class="iconfont" v-show="key === currentMusic">{{ playIcon ? '&#xe617;' : '&#xe681;' }}</i>
                            <i class="iconfont" v-show="key !== currentMusic">&#xe617;</i>
                        </span>
                        <span :style="{'color': key === currentMusic ? 'red' : ''}">{{ item.data.songname }}</span>
                    </li>
                    <li>lyric</li>
                    <li>{{ item.data.interval }}</li>
                    <li>{{ item.data.singer[0].name }}</li>
                    <li>icon</li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="经典" name="sutraMusic">
                <ul class="title row">
                    <li>序列</li>
                    <li>封面</li>
                    <li>歌名</li>
                    <li>歌词</li>
                    <li>时长</li>
                    <li>歌手</li>
                    <li>icon</li>
                </ul>
                <ul v-for="(item, key) in sutraMusic" :key="key" class="row">
                    <li>{{ key }}</li>
                    <li>
                        <router-link
                            :to="{name: 'playCover'}"
                            class="cover"
                            :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000)`}"
                        ></router-link>
                    </li>
                    <li>
                        <span @click="playPause(key)">
                            <i class="iconfont" v-show="playIcon">&#xe617;</i>
                            <i class="iconfont" v-show="!playIcon">&#xe681;</i>
                        </span>
                        <span>{{ item.data.songname }}</span>
                    </li>
                    <li>lyric</li>
                    <li>{{ item.data.interval }}</li>
                    <li>{{ item.data.singer[0].name }}</li>
                    <li>icon</li>
                </ul>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data () {
        return {
            activeMusicType: localStorage.getItem('musicType') || 'newMusic',
            playIcon: false
        }
    },
    components: {
    },
    computed: {
        ...mapState('player', {
            paused: state => state.paused
        }),
        ...mapState('list', {
            currentMusic: state => state.currentMusic,
            newMusic: state => state.musicList.newMusic,
            hotMusic: state => state.musicList.hotMusic,
            sutraMusic: state => state.musicList.sutraMusic,
            // musicType: state => state.musicType,
            lyric: state => state.lyric
        }),
        ...mapGetters('list', ['getCurrentList']),
    },
    methods: {
        ...mapMutations('player', ['PLAY_PAUSE']),
        ...mapMutations('list', ['CHANGE_MUSIC', 'CHANGE_MUSIC_LIST', 'ADD_FAVORITE_MUSIC']),
        ...mapActions('list', ['getLyric', 'getVKey']),
        handleMusicType(musictype) {
            localStorage.setItem('musicType',musictype.name)
            this.CHANGE_MUSIC_LIST({ musicType: musictype.name})
        },
        // listMusic (k) {
        //     window.localStorage.setItem('currentMusic', k)
        //     this.CHANGE_MUSIC()
        //     this.PLAY_PAUSE({paused: false})
        //     this.getLyric()
        //     this.$router.push({ path: '/player' })
        // },
        async playPause (k) {
            if (k === this.currentMusic) {
                this.paused ? this.PLAY_PAUSE({paused: false}) : this.PLAY_PAUSE({paused: true})
                this.playIcon = this.paused
            } else {
                this.PLAY_PAUSE({paused: false})
                this.playIcon = false
            }
            window.localStorage.setItem('currentMusic', k)
            this.CHANGE_MUSIC()
            // await this.getVKey()
            await this.getLyric()
        },
    },
    mounted () {
        this.playIcon = this.paused
        // switch(this.musicTypeIndex) {
        //     case 0:
        //         this.activeMusicType = 'newMusic'
        //         break;
        //     case 1:
        //         this.activeMusicType = 'hotMusic'
        //         break;
        //     case 2:
        //         this.activeMusicType = 'sutraMusic'
        //         break;
        // }
    }
}
</script>

<style lang="scss">
.el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.el-tabs__header {

}
.el-tabs__item {
    font-size: 22px;
    width: 200px;
    text-align: center;
}
</style>

<style lang="scss" scoped>
.recommend {
    flex: auto;
    .row {
        display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: 1px solid #52ffff;
        >li {
            height: 80px;
            display: inline-flex;
            justify-content: flex-start;
            align-items: center;
        }
        li:first-child {
            width: 5%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        li:nth-child(2) {
            width: 80px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            a {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
            }
        }
        li:nth-child(3) {
            width: 20%;
            cursor: pointer;
        }
        li:nth-child(4) {
            width: 30%;
        }
        li:nth-child(5) {
            width: 5%;
        }
        li:nth-child(6) {
            width: 15%;
        }
        li:last-child {
            width: 5%;
        }

    }
}
</style>
