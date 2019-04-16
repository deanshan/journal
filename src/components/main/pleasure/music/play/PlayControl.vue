<template>
    <div class="controls">
      <!-- 进度条时长 -->
      <div class="pro-time">
         <!-- 播放时长 -->
        <div class="time">{{ curTime }}</div>
        <!-- 进度条 -->
        <!-- <Progress/> -->
        <div
          class="progress"
          ref="progress"
          @click="changeProgress"
        >
          <div class="pro-len" :style="{ width: proWidth }"></div>
          <span
            class="pro-thumb"
            :style="{ left: proLeft }"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
          ></span>
        </div>
        <!-- 总时长 -->
        <div class="time">{{ durTime }}</div>
        <!-- 声音控件 -->
        <div
          class="volume-icon"
          :class="[volume === 0 ? 'muted' : 'volume']"
          @click="ShowRange"
        >
          <input
            type="range"
            ref="range"
            v-show="isShow"
            @change="changeVolume"
          />
        </div>
      </div>
      <!-- 音乐控件 -->
      <div class="music-ctl">
        <!-- 播放模式 -->
        <div  @click="changeMode">
            <i class="iconfont play-mode" v-show="playMode === 'order'">&#xe61a;</i>
            <i class="iconfont play-mode" v-show="playMode === 'single'">&#xe62f;</i>
            <i class="iconfont play-mode" v-show="playMode === 'circle'">&#xe701;</i>
            <i class="iconfont play-mode" v-show="playMode === 'random'">&#xe624;</i>
        </div>
        <!-- 上一首 -->
        <div class="play-prev" @click="prevNextMusic('prev')">
            <i class="iconfont">&#xe621;</i>
        </div>
        <!-- 播放暂停 -->
        <div :class="[ paused ? 'play-pause' : 'play-start']" @click="playPause">
            <i class="iconfont" v-show="paused">&#xe617;</i>
            <i class="iconfont" v-show="!paused">&#xe681;</i>
        </div>
        <!-- 下一首 -->
        <div class="play-next" @click="prevNextMusic('next')">
            <i class="iconfont">&#xe622;</i>
        </div>
        <!-- 歌单切换 -->
        <router-link
          :to="{ name :this.$route.name === 'list' ? 'play' : 'list' }"
          class="music-list"
          tag="div"
        >
            <i class="iconfont">&#xe65f;</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import '@/sass/play-control.scss'
import { formatTime } from '@/utils/formatTime'
import { eventBus } from '@/utils/eventBus'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PlayControl',
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState('player', {
      paused: state => state.paused,
      volume: state => state.volume,
      duration: state => state.duration,
      currentTime: state => state.currentTime,
      playMode: state => state.playMode
    }),
    ...mapState('list', {
      currentMusic: state => state.currentMusic
    }),
    ...mapGetters('player', ['getCurrentIndex']),
    durTime () {
      return formatTime(this.duration)
    },
    curTime () {
      return formatTime(this.currentTime)
    },
    proWidth () {
      return Number(this.currentTime / this.duration) * 100 + '%'
    },
    proLeft () {
      return Number(this.currentTime / this.duration) * 100 - 2 + '%'
    }
  },
  methods: {
    ...mapMutations('player', [
      'PLAY_PAUSE',
      'CHANGE_VOLUME',
      'GET_DURATION',
      'GET_CURRENTTIME',
      'CHANGE_PROGRESS',
      'SET_PLAY_MODE',
      'PREV_NEXT'
    ]),
    ...mapMutations('list', [
      'CHANGE_MUSIC'
    ]),
    ...mapActions('list', ['getLyric']),
    ShowRange () {
      this.isShow = !this.isShow
    },
    playPause () {
      this.paused ? this.PLAY_PAUSE({paused: false}) : this.PLAY_PAUSE({paused: true})
    },
    changeVolume () {
      let volume = this.$refs.range.value / 100
      this.CHANGE_VOLUME({volume})
    },
    changeProgress (event) {
      let e = event || window.event
      this.CHANGE_PROGRESS({progress: e.offsetX / this.$refs.progress.offsetWidth * this.duration})
      eventBus.$emit('changeCurrentTime', this.currentTime)
    },
    touchmove (e) {
      this.CHANGE_VOLUME({volume: 0})
      let moveX = e.touches[0].clientX - this.$refs.progress.offsetLeft
      if (Math.abs(moveX) <= this.$refs.progress.offsetWidth) {
        this.CHANGE_PROGRESS({progress: moveX / this.$refs.progress.offsetWidth * this.duration})
        eventBus.$emit('changeCurrentTime', this.currentTime)
      }
    },
    touchstart () {
      this.startVolume = this.volume
    },
    touchend () {
      this.CHANGE_VOLUME({volume: this.startVolume})
    },
    // 上下切换音乐
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
}
</script>

<style lang="scss" scoped>
.iconfont {
    color: #fff;
}
.play-mode {
    font-size: 20px;
    color: #fff;
}
</style>
